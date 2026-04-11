import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/src/i18n/dictionaries'
import { buildAlternates, isLocale, withLocale } from '@/src/lib/i18n'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const dict = getDictionary(lang)

  return {
    title: `${dict.ralSkill.metadataTitle} | RoboIndex`,
    description: dict.ralSkill.metadataDescription,
    alternates: buildAlternates('/ral-skill'),
  }
}

export default async function RalSkillPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const dict = getDictionary(lang)

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-500 text-xs font-medium mb-4">
          {dict.ralSkill.badge}
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
          ral.skill
        </h1>
        <p className="mt-2 text-base sm:text-lg text-text-secondary">{dict.ralSkill.subtitle}</p>
        <p className="mt-4 text-text-muted max-w-lg mx-auto text-sm leading-relaxed">{dict.ralSkill.summary}</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <a
            href="https://github.com/fly-pigTH/ral-skill"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-text-primary text-surface-0 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            GitHub →
          </a>
          <Link
            href={withLocale(lang, '/guides')}
            className="px-5 py-2.5 rounded-xl bg-surface-2 text-text-primary text-sm font-medium hover:bg-surface-2/80 transition-colors"
          >
            {dict.ralSkill.guidesCta}
          </Link>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-center text-sm font-medium text-text-muted uppercase tracking-wide mb-6">
          {dict.ralSkill.sourcesHeading}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {dict.ralSkill.sourceCards.map((card, index) => (
            <div
              key={card.title}
              className={`text-center p-5 rounded-2xl border ${
                index === 0
                  ? 'bg-blue-500/10 border-blue-500/20'
                  : index === 1
                    ? 'bg-violet-500/10 border-violet-500/20'
                    : 'bg-amber-500/10 border-amber-500/20'
              }`}
            >
              <div className="text-2xl mb-2">{index === 0 ? '📋' : index === 1 ? '📘' : '💬'}</div>
              <div className={`text-sm font-semibold ${index === 0 ? 'text-blue-500' : index === 1 ? 'text-violet-500' : 'text-amber-500'}`}>{card.title}</div>
              <div className={`text-xs mt-1 ${index === 0 ? 'text-blue-400' : index === 1 ? 'text-violet-400' : 'text-amber-400'}`}>{card.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-lg font-semibold text-text-primary mb-6">{dict.ralSkill.featuresHeading}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {dict.ralSkill.features.map((feature, index) => (
            <div key={feature.title} className="p-4 rounded-xl bg-surface-1 border border-border-light">
              <div className="text-xl mb-2">{['🗺️', '✍️', '🛡️', '📐', '⏱️', '🔍', '🎲'][index]}</div>
              <div className="text-sm font-medium text-text-primary">{feature.title}</div>
              <div className="text-xs text-text-muted mt-1">{feature.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-lg font-semibold text-text-primary mb-6">{dict.ralSkill.demoHeading}</h2>
        <div className="bg-surface-2 rounded-2xl border border-border-light overflow-hidden font-mono text-sm">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border-light">
            <span className="w-3 h-3 rounded-full bg-rose-400"></span>
            <span className="w-3 h-3 rounded-full bg-amber-400"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
            <span className="ml-3 text-xs text-text-muted font-sans">Claude Code</span>
          </div>

          <div className="p-5 space-y-6">
            <div className="text-text-muted">
              <span className="select-none">$ </span>claude
            </div>
            <div className="text-text-muted text-xs">
              <div>╭───────────────────────────────────╮</div>
              <div>│{'  '}Claude Code{'                        '}│</div>
              <div>╰───────────────────────────────────╯</div>
            </div>

            {dict.ralSkill.demos.map((demo, index) => (
              <div key={index} className="space-y-2">
                <div className="text-text-muted">
                  <span className="select-none">&gt; </span>
                  <span className="text-text-primary">/ral-skill {demo.question}</span>
                </div>
                <div className="pl-2 border-l-2 border-accent-500/30 ml-1">
                  <div className="text-text-primary leading-relaxed">
                    <span className="text-accent-500">ral.skill</span>
                    <span className="text-text-muted"> ❯ </span>
                    {demo.answer}
                  </div>
                  <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                    {demo.sources.map(source => (
                      <span key={source} className="text-[10px] px-2 py-0.5 rounded-full bg-surface-1 text-text-muted font-sans">{source}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-lg font-semibold text-text-primary mb-4">{dict.ralSkill.installHeading}</h2>
        <div className="bg-surface-2 border border-border-light rounded-xl p-5 text-sm font-mono overflow-x-auto">
          <div className="text-text-muted mb-1">{dict.ralSkill.installGlobal}</div>
          <div className="text-accent-600 break-all">git clone https://github.com/fly-pigTH/ral-skill ~/.claude/skills/ral-skill</div>
          <div className="text-text-muted mt-4 mb-1">{dict.ralSkill.installUsage}</div>
          <div className="text-accent-600">/ral-skill</div>
        </div>
      </div>

      <div className="text-center text-sm text-text-muted">
        <a href="https://github.com/CeHao1" className="text-accent-500 hover:underline" target="_blank" rel="noopener noreferrer">@CeHao1</a>
        {' · '}
        <a href="https://github.com/fly-pigTH" className="text-accent-500 hover:underline" target="_blank" rel="noopener noreferrer">@fly-pigTH</a>
        {' · '}
        {dict.ralSkill.credits}
      </div>
    </main>
  )
}
