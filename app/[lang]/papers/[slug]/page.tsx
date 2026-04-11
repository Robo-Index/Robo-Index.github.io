import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import TagPill from '@/components/TagPill'
import { getDictionary } from '@/src/i18n/dictionaries'
import { buildAlternates, getLocalizedText, isLocale, locales, withLocale } from '@/src/lib/i18n'
import { getAllPapers, getPaperBySlug } from '@/src/lib/papers'

export function generateStaticParams() {
  return locales.flatMap(lang => getAllPapers().map(p => ({ lang, slug: p.slug })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  if (!isLocale(lang)) return {}

  const dict = getDictionary(lang)
  const paper = getPaperBySlug(slug)
  const title = paper ? getLocalizedText(paper.title, paper.title_zh, lang) : dict.papers.heading

  return {
    title: `${title} | RoboIndex`,
    alternates: buildAlternates(`/papers/${slug}`),
  }
}

export default async function PaperDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  if (!isLocale(lang)) notFound()

  const dict = getDictionary(lang)
  const paper = getPaperBySlug(slug)
  if (!paper) notFound()

  const title = getLocalizedText(paper.title, paper.title_zh, lang)
  const abstract = getLocalizedText(paper.abstract, paper.abstract_zh, lang)

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <Link
        href={withLocale(lang, '/papers')}
        className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent-600 transition-colors duration-200"
      >
        <span aria-hidden="true">&larr;</span>
        {dict.papers.backToPapers}
      </Link>

      <article className="mt-8">
        <div className="space-y-3">
          <div className="text-xs font-semibold tracking-widest uppercase text-accent-500">
            {paper.venue} &middot; {paper.year}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary leading-tight">
            {title}
          </h1>
        </div>

        {paper.authors.length > 0 && (
          <p className="mt-5 text-sm text-text-secondary leading-relaxed">
            {paper.authors.join(', ')}
          </p>
        )}

        {abstract && (
          <div className="mt-8 bg-surface-1 rounded-2xl border border-border-light p-6">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-text-muted mb-3">
              {dict.papers.abstractLabel}
            </h2>
            <p className="text-sm text-text-secondary leading-[1.8]">{abstract}</p>
          </div>
        )}

        {paper.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-1.5">
            {paper.tags.map(tag => (
              <TagPill key={tag} tag={tag} />
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          {paper.repo && (
            <a
              href={paper.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-text-primary text-surface-0 rounded-full hover:bg-text-secondary transition-colors duration-200"
            >
              {dict.papers.repository}
            </a>
          )}
          {paper.project_page && (
            <a
              href={paper.project_page}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-border rounded-full text-text-secondary hover:border-accent-400 hover:text-accent-600 transition-all duration-200"
            >
              {dict.papers.projectPage}
            </a>
          )}
          {paper.arxiv && (
            <a
              href={paper.arxiv}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-border rounded-full text-text-secondary hover:border-accent-400 hover:text-accent-600 transition-all duration-200"
            >
              arXiv
            </a>
          )}
          {paper.pdf && (
            <a
              href={paper.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-border rounded-full text-text-secondary hover:border-accent-400 hover:text-accent-600 transition-all duration-200"
            >
              PDF
            </a>
          )}
        </div>
      </article>
    </main>
  )
}
