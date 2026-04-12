import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/src/i18n/dictionaries'
import { buildAlternates, isLocale, locales } from '@/src/lib/i18n'

export function generateStaticParams() {
  return locales.map(lang => ({ lang }))
}

const links = [
  'https://github.com/Robo-Index/Robo-Index.github.io/issues/new?title=Submission+Experience&labels=guide',
  'https://github.com/fly-pigTH/ral-skill',
  'https://github.com/Robo-Index/Robo-Index.github.io/issues',
]

const team = [
  {
    name: 'Ce Hao (郝策)',
    github: 'CeHao1',
  },
  {
    name: 'Yinglei Zhu',
    github: 'fly-pigTH',
  },
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
    title: `${dict.contribute.metadataTitle} | RoboIndex`,
    description: dict.contribute.metadataDescription,
    alternates: buildAlternates('/contribute'),
  }
}

export default async function ContributePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const dict = getDictionary(lang)

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">{dict.contribute.heading}</h1>
        <p className="mt-2 text-text-secondary">{dict.contribute.summary}</p>
      </div>

      <div className="space-y-6 mb-16">
        {dict.contribute.ways.map((way, index) => (
          <div key={way.title} className="bg-surface-1 border border-border-light rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-2">{way.title}</h2>
            <p className="text-sm text-text-secondary mb-4">{way.desc}</p>
            <ol className="space-y-2 mb-5">
              {way.steps.map((step, stepIndex) => (
                <li key={step} className="flex items-start gap-3 text-sm text-text-primary">
                  <span className="w-5 h-5 rounded-full bg-accent-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {stepIndex + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <a
              href={links[index]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-accent-600 hover:text-accent-700 transition-colors"
            >
              {way.linkLabel}
            </a>
          </div>
        ))}
      </div>

      <div className="mb-12">
        <h2 className="text-lg font-semibold text-text-primary mb-6">{dict.contribute.team}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {team.map((member, index) => (
            <div key={member.github} className="bg-surface-1 border border-border-light rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={`https://github.com/${member.github}.png?size=80`}
                  alt={member.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="text-sm font-semibold text-text-primary">{member.name}</div>
                  <a
                    href={`https://github.com/${member.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-accent-500 hover:underline"
                  >
                    @{member.github}
                  </a>
                </div>
              </div>
              <div className="text-xs font-medium text-accent-600 mb-1">{dict.contribute.teamRoles[index].role}</div>
              <div className="text-xs text-text-muted">{dict.contribute.teamRoles[index].desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center pt-8 border-t border-border-light">
        <p className="text-sm text-text-muted">
          <a href="https://github.com/Robo-Index/Robo-Index.github.io" target="_blank" rel="noopener noreferrer" className="text-accent-500 hover:underline">RoboIndex</a>
          {' · '}
          <a href="https://github.com/fly-pigTH/ral-skill" target="_blank" rel="noopener noreferrer" className="text-accent-500 hover:underline">ral.skill</a>
          {' · MIT License'}
        </p>
      </div>
    </main>
  )
}
