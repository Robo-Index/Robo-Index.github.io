'use client'

import { useState, useMemo } from 'react'
import type { Paper } from '@/src/lib/types'
import type { Locale } from '@/src/lib/i18n'
import { getLocalizedText } from '@/src/lib/i18n'
import PaperCard from './PaperCard'
import TagPill from './TagPill'

export default function PapersPageClient({
  papers,
  allTags,
  allVenues,
  allYears,
  lang,
  copy,
}: {
  papers: Paper[]
  allTags: string[]
  allVenues: string[]
  allYears: number[]
  lang: Locale
  copy: {
    searchPlaceholder: string
    allVenues: string
    allYears: string
    clearAll: string
    filterByTags: string
    tagsUnit: string
    foundSuffix: string
    noMatches: string
    clearFilters: string
    paperSingular: string
    paperPlural: string
    code: string
  }
}) {
  const [query, setQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set())
  const [selectedVenue, setSelectedVenue] = useState('')
  const [selectedYear, setSelectedYear] = useState<number | ''>('')

  const filtered = useMemo(() => {
    return papers.filter(p => {
      if (query) {
        const q = query.toLowerCase()
        const englishMatch = p.title.toLowerCase().includes(q) || p.abstract?.toLowerCase().includes(q)
        const localizedMatch = lang === 'zh' && (
          p.title_zh?.toLowerCase().includes(q) || p.abstract_zh?.toLowerCase().includes(q)
        )
        if (!englishMatch && !localizedMatch) return false
      }
      if (selectedTags.size > 0) {
        if (!Array.from(selectedTags).every(t => p.tags.includes(t))) return false
      }
      if (selectedVenue && p.venue !== selectedVenue) return false
      if (selectedYear && p.year !== selectedYear) return false
      return true
    })
  }, [papers, query, selectedTags, selectedVenue, selectedYear])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => {
      const next = new Set(prev)
      if (next.has(tag)) next.delete(tag)
      else next.add(tag)
      return next
    })
  }

  const hasFilters = query || selectedTags.size > 0 || selectedVenue || selectedYear

  return (
    <div>
      <div className="bg-surface-1 rounded-2xl border border-border-light p-4 sm:p-6">
        <input
          type="text"
          placeholder={copy.searchPlaceholder}
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full px-4 py-3 text-sm bg-surface-0 border border-border rounded-xl focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-100 transition-all duration-200 placeholder:text-text-muted"
        />

        <div className="mt-3 flex flex-col sm:flex-row sm:flex-wrap gap-2">
          <select
            value={selectedVenue}
            onChange={e => setSelectedVenue(e.target.value)}
            className="w-full sm:w-auto text-sm px-3 py-2 border border-border rounded-xl bg-surface-0 text-text-secondary focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-100 transition-all duration-200"
          >
            <option value="">{copy.allVenues}</option>
            {allVenues.map(v => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value ? Number(e.target.value) : '')}
            className="w-full sm:w-auto text-sm px-3 py-2 border border-border rounded-xl bg-surface-0 text-text-secondary focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-100 transition-all duration-200"
          >
            <option value="">{copy.allYears}</option>
            {allYears.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          {hasFilters && (
            <button
              onClick={() => {
                setQuery('')
                setSelectedTags(new Set())
                setSelectedVenue('')
                setSelectedYear('')
              }}
              className="text-sm px-3 py-2 text-accent-600 hover:text-accent-700 transition-colors duration-200 text-left sm:text-center"
            >
              {copy.clearAll}
            </button>
          )}
        </div>

        <details className="mt-4 group">
          <summary className="text-xs text-text-muted cursor-pointer hover:text-text-secondary transition-colors select-none">
            {copy.filterByTags} ({allTags.length} {copy.tagsUnit}) <span className="group-open:hidden">▸</span><span className="hidden group-open:inline">▾</span>
          </summary>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {allTags.map(tag => (
              <TagPill
                key={tag}
                tag={tag}
                active={selectedTags.has(tag)}
                onClick={() => toggleTag(tag)}
              />
            ))}
          </div>
        </details>
      </div>

      <div className="mt-6 text-sm text-text-muted">
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
              setSelectedVenue('')
              setSelectedYear('')
            }}
            className="mt-3 text-sm text-accent-600 hover:text-accent-700 transition-colors duration-200"
          >
            {copy.clearFilters}
          </button>
        </div>
      ) : (
        <div className="mt-4 grid gap-4 min-w-0">
          {filtered.map(paper => (
            <PaperCard key={paper.slug} paper={paper} lang={lang} codeLabel={copy.code} />
          ))}
        </div>
      )}
    </div>
  )
}
