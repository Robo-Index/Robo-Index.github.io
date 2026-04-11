'use client'

import { useState, useMemo } from 'react'
import type { Paper } from '@/src/lib/types'
import type { RepoMeta } from '@/src/lib/types'
import type { Locale } from '@/src/lib/i18n'
import ShowcaseCard from './ShowcaseCard'
import TagPill from './TagPill'

type SortBy = 'default' | 'stars' | 'active' | 'recent'

export default function ShowcaseClient({
  papers,
  allTags,
  allYears,
  repoMeta,
  lang,
  copy,
}: {
  papers: Paper[]
  allTags: string[]
  allYears: number[]
  repoMeta: Record<string, RepoMeta>
  lang: Locale
  copy: {
    searchPlaceholder: string
    allYears: string
    sortDefault: string
    sortStars: string
    sortActive: string
    sortRecent: string
    clearAll: string
    paperSingular: string
    paperPlural: string
    foundSuffix: string
    noMatches: string
    clearFilters: string
    details: string
    project: string
    today: string
    daysAgo: string
    monthsAgo: string
    yearsAgo: string
    lastPushed: string
  }
}) {
  const [query, setQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set())
  const [selectedYear, setSelectedYear] = useState<number | ''>('')
  const [sortBy, setSortBy] = useState<SortBy>('default')

  const filtered = useMemo(() => {
    let results = papers.filter(p => {
      if (query) {
        const q = query.toLowerCase()
        const inTitle = p.title.toLowerCase().includes(q) || p.title_zh?.toLowerCase().includes(q)
        const inAbstract = p.abstract?.toLowerCase().includes(q) || p.abstract_zh?.toLowerCase().includes(q)
        const inRepo = p.repo?.toLowerCase().includes(q)
        if (!inTitle && !inAbstract && !inRepo) return false
      }
      if (selectedTags.size > 0) {
        if (!Array.from(selectedTags).every(t => p.tags.includes(t))) return false
      }
      if (selectedYear && p.year !== selectedYear) return false
      return true
    })

    if (sortBy === 'stars') {
      results = [...results].sort((a, b) => {
        const sa = a.repo ? (repoMeta[a.slug]?.stars ?? 0) : 0
        const sb = b.repo ? (repoMeta[b.slug]?.stars ?? 0) : 0
        return sb - sa
      })
    } else if (sortBy === 'active') {
      results = [...results].sort((a, b) => {
        const pa = a.repo ? (repoMeta[a.slug]?.pushed_at ?? '') : ''
        const pb = b.repo ? (repoMeta[b.slug]?.pushed_at ?? '') : ''
        return pb.localeCompare(pa)
      })
    } else if (sortBy === 'recent') {
      results = [...results].sort((a, b) => b.date_added.localeCompare(a.date_added))
    }

    return results
  }, [papers, query, selectedTags, selectedYear, sortBy, repoMeta])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => {
      const next = new Set(prev)
      if (next.has(tag)) next.delete(tag)
      else next.add(tag)
      return next
    })
  }

  const hasFilters = query || selectedTags.size > 0 || selectedYear

  return (
    <div>
      {/* Search + Filters */}
      <div className="bg-surface-1 rounded-2xl border border-border-light p-5">
        <input
          type="text"
          placeholder={copy.searchPlaceholder}
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full px-4 py-3 text-sm bg-surface-0 border border-border rounded-xl focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-100 transition-all duration-200 placeholder:text-text-muted"
        />
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          <select
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value ? Number(e.target.value) : '')}
            className="text-sm px-3 py-2 border border-border rounded-xl bg-surface-0 text-text-secondary focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-100 transition-all duration-200"
          >
            <option value="">{copy.allYears}</option>
            {allYears.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as SortBy)}
            className="text-sm px-3 py-2 border border-border rounded-xl bg-surface-0 text-text-secondary focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-100 transition-all duration-200"
          >
            <option value="default">{copy.sortDefault}</option>
            <option value="stars">{copy.sortStars}</option>
            <option value="active">{copy.sortActive}</option>
            <option value="recent">{copy.sortRecent}</option>
          </select>
          {hasFilters && (
            <button
              onClick={() => {
                setQuery('')
                setSelectedTags(new Set())
                setSelectedYear('')
              }}
            className="text-sm px-3 py-2 text-accent-600 hover:text-accent-700 transition-colors duration-200"
          >
              {copy.clearAll}
            </button>
          )}
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {allTags.map(tag => (
            <TagPill
              key={tag}
              tag={tag}
              active={selectedTags.has(tag)}
              onClick={() => toggleTag(tag)}
            />
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="mt-5 text-sm text-text-muted">
        {filtered.length} {filtered.length === 1 ? copy.paperSingular : copy.paperPlural}
        {hasFilters && ` ${copy.foundSuffix}`}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-text-muted">{copy.noMatches}</p>
          <button
            onClick={() => {
              setQuery('')
              setSelectedTags(new Set())
              setSelectedYear('')
            }}
            className="mt-3 text-sm text-accent-600 hover:text-accent-700"
          >
            {copy.clearFilters}
          </button>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(paper => (
            <ShowcaseCard key={paper.slug} paper={paper} meta={repoMeta[paper.slug]} lang={lang} copy={copy} />
          ))}
        </div>
      )}
    </div>
  )
}
