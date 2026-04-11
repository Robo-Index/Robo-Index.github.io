import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ShowcaseClient from '@/components/ShowcaseClient'
import { getDictionary } from '@/src/i18n/dictionaries'
import { buildAlternates, isLocale } from '@/src/lib/i18n'
import { getAllPapers, getAllTags } from '@/src/lib/papers'
import { getRepoMetaMap } from '@/src/lib/repos'
import type { RepoMeta } from '@/src/lib/types'

function normalizeUrl(url: string): string {
  return url.toLowerCase().replace(/\/$/, '')
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const dict = getDictionary(lang)

  return {
    title: `${dict.showcase.metadataTitle} | RoboIndex`,
    description: dict.showcase.metadataDescription,
    alternates: buildAlternates('/showcase'),
  }
}

export default async function ShowcasePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const dict = getDictionary(lang)
  const allPapers = getAllPapers()
  const papers = allPapers.filter(p => p.repo)
  const allTags = getAllTags()
  const allYears = [...new Set(papers.map(p => p.year))].sort((a, b) => b - a)

  const metaMap = getRepoMetaMap()
  const repoMeta: Record<string, RepoMeta> = {}
  let totalStars = 0

  for (const paper of papers) {
    if (!paper.repo) continue
    const meta = metaMap[normalizeUrl(paper.repo)]
    if (meta) {
      repoMeta[paper.slug] = meta
      totalStars += meta.stars
    }
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-14">
        <div className="inline-block px-3 py-1 rounded-full bg-accent-50 text-accent-700 text-xs font-semibold tracking-wide uppercase mb-4">
          {dict.showcase.badge}
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
          {dict.showcase.heading}
        </h1>
        <p className="mt-3 text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
          {dict.showcase.summary}
        </p>
        <div className="mt-6 flex justify-center gap-6 text-sm">
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold text-text-primary">{papers.length}</span>
            <span className="text-text-muted">{dict.showcase.openSourcePapers}</span>
          </div>
          <div className="w-px bg-border-light" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold text-text-primary">{allPapers.length}</span>
            <span className="text-text-muted">{dict.showcase.totalIndexed}</span>
          </div>
          <div className="w-px bg-border-light" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold text-text-primary">{allYears.length}</span>
            <span className="text-text-muted">{dict.showcase.yearsCovered}</span>
          </div>
          {totalStars > 0 && (
            <>
              <div className="w-px bg-border-light" />
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl font-bold text-text-primary">
                  {totalStars >= 1000 ? `${(totalStars / 1000).toFixed(1).replace(/\.0$/, '')}k` : totalStars}
                </span>
                <span className="text-text-muted">{dict.showcase.totalStars}</span>
              </div>
            </>
          )}
        </div>
      </div>

      <ShowcaseClient papers={papers} allTags={allTags} allYears={allYears} repoMeta={repoMeta} lang={lang} copy={dict.showcase} />
    </main>
  )
}
