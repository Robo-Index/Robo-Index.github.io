import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PapersPageClient from '@/components/PapersPageClient'
import { getDictionary } from '@/src/i18n/dictionaries'
import { buildAlternates, isLocale } from '@/src/lib/i18n'
import { getAllPapers, getAllTags, getAllVenues } from '@/src/lib/papers'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const dict = getDictionary(lang)

  return {
    title: `${dict.papers.metadataTitle} | RoboIndex`,
    alternates: buildAlternates('/papers'),
  }
}

export default async function PapersPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const dict = getDictionary(lang)
  const papers = getAllPapers()
  const allTags = getAllTags()
  const allVenues = getAllVenues()
  const allYears = [...new Set(papers.map(p => p.year))].sort((a, b) => b - a)

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 overflow-hidden">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">{dict.papers.heading}</h1>
        <p className="mt-2 text-text-secondary">
          {papers.length} {dict.papers.summary}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-accent-50 text-accent-600 border border-accent-200">RA-L</span>
          <span className="text-xs text-text-muted">{dict.papers.rangeLabel}</span>
        </div>
      </div>
      <PapersPageClient
        papers={papers}
        allTags={allTags}
        allVenues={allVenues}
        allYears={allYears}
        lang={lang}
        copy={dict.papers}
      />
    </main>
  )
}
