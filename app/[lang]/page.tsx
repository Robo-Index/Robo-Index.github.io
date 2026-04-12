import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import WorldMapBackground from '@/components/WorldMapBackground'
import VisitorCount from '@/components/VisitorCount'
import VisitorLocationLayer from '@/components/VisitorLocationLayer'
import { getDictionary } from '@/src/i18n/dictionaries'
import { buildAlternates, isLocale, locales, withLocale } from '@/src/lib/i18n'
import { getAllPapers } from '@/src/lib/papers'
import { maintainers, contributors } from '@/src/lib/contributors'

export function generateStaticParams() {
  return locales.map(lang => ({ lang }))
}

const venues = [
  { name: 'RA-L', live: true, color: 'bg-accent-500', text: 'text-white', border: '' },
  { name: 'ICRA', live: false, color: '', text: 'text-blue-500', border: 'border-blue-500' },
  { name: 'IROS', live: false, color: '', text: 'text-emerald-500', border: 'border-emerald-500' },
  { name: 'CoRL', live: false, color: '', text: 'text-violet-500', border: 'border-violet-500' },
  { name: 'RSS', live: false, color: '', text: 'text-rose-500', border: 'border-rose-500' },
  { name: 'TRO', live: false, color: '', text: 'text-amber-500', border: 'border-amber-500' },
]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const dict = getDictionary(lang)

  return {
    title: `${dict.home.metadataTitle} | RoboIndex`,
    description: dict.home.metadataDescription,
    alternates: buildAlternates('/'),
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const dict = getDictionary(lang)
  const papers = getAllPapers()
  const withRepo = papers.filter(p => p.repo).length

  return (
    <main className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 sm:px-6">
      <WorldMapBackground />
      <VisitorLocationLayer />
      <div className="hero-glass-mask" aria-hidden="true" />

      <div className="relative z-10 max-w-2xl w-full text-center space-y-10">
        <div className="space-y-4">
          <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
            RoboIndex
          </h1>
          <p className="text-base sm:text-xl text-text-secondary font-light">
            {dict.home.subtitle}
          </p>
          <div className="flex justify-center items-center flex-wrap gap-2 pt-1">
            {venues.map(v => (
              <span
                key={v.name}
                className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  v.live
                    ? `${v.color} ${v.text} border-transparent`
                    : `${v.text} ${v.border} border-dashed bg-transparent`
                }`}
              >
                {v.name}
              </span>
            ))}
            <span className="px-2.5 py-0.5 rounded border border-dashed border-text-muted text-[10px] text-text-muted">
              {dict.home.comingSoon}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-center items-center flex-wrap gap-x-3 gap-y-1 text-sm text-text-muted">
            <span>{papers.length} {dict.home.papersLabel}</span>
            <span className="text-border">|</span>
            <span>{withRepo} {dict.home.reposLabel}</span>
            <VisitorCount label={dict.home.visitorsLabel} />
          </div>
          <p className="text-xs text-text-muted tracking-wide">{dict.home.skillLabel}</p>
        </div>

        <div className="flex flex-col items-center gap-4 pt-2">
          <Link
            href={withLocale(lang, '/papers')}
            className="venue-gradient-btn inline-flex items-center gap-2 px-8 py-3 text-sm font-medium text-white rounded-full transition-all duration-200 hover:shadow-lg hover:brightness-110"
          >
            {dict.home.browseCta}
            <span aria-hidden="true">&rarr;</span>
          </Link>

          <div className="flex items-center gap-2 pt-2 text-[11px] text-text-muted">
            <span>{dict.home.builtByNote}</span>
            <div className="flex -space-x-1.5">
              {[...maintainers, ...contributors].map(person => (
                <img
                  key={person.github}
                  src={`https://github.com/${person.github}.png?size=48`}
                  alt={person.name}
                  title={person.name}
                  className="w-5 h-5 rounded-full border border-surface-0"
                />
              ))}
            </div>
            <Link
              href={withLocale(lang, '/contribute#contributors')}
              className="text-accent-500 hover:underline"
            >
              {dict.home.builtByLink}
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
