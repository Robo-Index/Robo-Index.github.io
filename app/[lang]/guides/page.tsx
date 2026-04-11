import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import GuideTOC from '@/components/GuideTOC'
import { getDictionary } from '@/src/i18n/dictionaries'
import { buildAlternates, isLocale } from '@/src/lib/i18n'
import { getFullGuide } from '@/src/lib/guides'
import type { GuideBlock, GuideChapter, GuidePhase } from '@/src/lib/guides'

function Md({ text }: { text: string }) {
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return <>{parts.map((part, index) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={index} className="font-semibold text-text-primary">{part.slice(2, -2)}</strong>
      : <span key={index}>{part}</span>
  )}</>
}

function Block({ block }: { block: GuideBlock }) {
  switch (block.type) {
    case 'text':
      return <p className="text-[15px] text-text-primary/85 leading-[1.9] mb-4"><Md text={block.content || ''} /></p>
    case 'heading':
      return <h4 className="text-[15px] font-semibold text-text-primary mt-8 mb-3 pb-2 border-b border-border-light/50">{block.content}</h4>
    case 'quote':
      return (
        <blockquote className="my-5 border-l-[3px] border-accent-300 pl-5 py-2">
          <p className="text-[13.5px] text-text-secondary leading-[1.85] italic">{block.content}</p>
        </blockquote>
      )
    case 'list': {
      const items = (block.items || []) as string[]
      return (
        <ul className="my-4 space-y-2.5">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-[15px] text-text-primary/85 leading-[1.8]">
              <span className="text-accent-400 mt-[3px] shrink-0 text-[13px] font-mono select-none">
                {block.ordered ? `${index + 1}.` : '•'}
              </span>
              <span><Md text={item} /></span>
            </li>
          ))}
        </ul>
      )
    }
    case 'steps': {
      const items = (block.items || []) as string[]
      return (
        <div className="my-6">
          {items.map((item, index) => (
            <div key={index} className="flex gap-4 pb-5 last:pb-0">
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-accent-500 text-white text-[11px] font-bold flex items-center justify-center shrink-0 shadow-sm">
                  {index + 1}
                </div>
                {index < items.length - 1 && <div className="w-px flex-1 bg-accent-200 mt-1" />}
              </div>
              <p className="text-[15px] text-text-primary/85 leading-[1.8] pt-0.5"><Md text={item} /></p>
            </div>
          ))}
        </div>
      )
    }
    case 'links': {
      const items = (block.items || []) as { label: string; url: string }[]
      return (
        <div className="my-5 rounded-xl border border-border-light divide-y divide-border-light overflow-hidden">
          {items.map((link, index) => (
            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-5 py-3 hover:bg-surface-2/60 transition-colors group">
              <span className="text-accent-400 font-mono text-xs font-medium shrink-0">{index + 1}</span>
              <span className="text-[14px] text-text-primary group-hover:text-accent-600 transition-colors">{link.label}</span>
              <span className="text-text-muted/40 text-xs ml-auto shrink-0 group-hover:text-text-muted transition-colors">↗</span>
            </a>
          ))}
        </div>
      )
    }
    case 'callout': {
      const isWarning = block.variant === 'warning'
      return (
        <div className={`my-6 rounded-xl px-5 py-4 ${
          isWarning
            ? 'bg-accent-500/10 border border-accent-500/20'
            : 'bg-accent-500/5 border border-accent-200/30'
        }`}>
          <div className="text-[14.5px] text-text-primary leading-[1.85] whitespace-pre-line">
            <Md text={block.content || ''} />
          </div>
        </div>
      )
    }
    case 'compare':
      return (
        <div className="my-5 grid gap-2.5">
          <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-accent-500/5 border border-accent-200/30">
            <span className="text-accent-600 mt-0.5 shrink-0">✓</span>
            <p className="text-[14px] text-text-primary leading-[1.75]"><Md text={block.good || ''} /></p>
          </div>
          <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-surface-2 border border-border-light">
            <span className="text-text-muted mt-0.5 shrink-0">✗</span>
            <p className="text-[14px] text-text-primary leading-[1.75]"><Md text={block.bad || ''} /></p>
          </div>
          {block.note && <p className="text-[13px] text-text-muted leading-relaxed px-1">{block.note}</p>}
        </div>
      )
    default:
      return null
  }
}

function ChapterSection({ chapter }: { chapter: GuideChapter }) {
  return (
    <section id={chapter.id} className="scroll-mt-24 py-8 first:pt-0">
      <h3 className="text-lg font-bold text-text-primary tracking-tight mb-5">{chapter.title}</h3>
      {chapter.blocks.map((block, index) => <Block key={index} block={block} />)}
    </section>
  )
}

function PhaseSection({
  phase,
  index,
  labels,
}: {
  phase: GuidePhase
  index: number
  labels: string[]
}) {
  return (
    <div id={phase.id} className="scroll-mt-24 mb-16 last:mb-0">
      <div className="flex items-center gap-4 mb-8">
        <div className="px-3 py-1.5 rounded-lg bg-accent-500 text-white text-[11px] font-bold uppercase tracking-wider">
          {labels[index] || `Phase ${index + 1}`}
        </div>
        <div>
          <h2 className="text-xl font-bold text-text-primary tracking-tight">{phase.title}</h2>
          <p className="text-[13px] text-text-muted mt-0.5">{phase.subtitle}</p>
        </div>
      </div>

      <div className="divide-y divide-border-light/40">
        {phase.chapters.map(chapter => <ChapterSection key={chapter.id} chapter={chapter} />)}
      </div>
    </div>
  )
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
    title: `${dict.guides.metadataTitle} | RoboIndex`,
    description: dict.guides.metadataDescription,
    alternates: buildAlternates('/guides'),
  }
}

export default async function GuidesPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const dict = getDictionary(lang)
  const { guide, isFallback } = getFullGuide(lang)
  if (!guide) {
    return <div className="p-12 text-center text-text-muted">{dict.guides.notFound}</div>
  }

  const tocNodes = guide.phases.map(phase => ({
    id: phase.id,
    label: phase.title,
    icon: '',
    children: phase.chapters.map(chapter => ({
      id: chapter.id,
      label: chapter.title,
    })),
  }))

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <header className="mb-14 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary mb-3">{guide.title}</h1>
        <p className="text-[15px] text-text-secondary leading-relaxed mb-5">{guide.description}</p>
        {isFallback && (
          <p className="mb-5 text-sm text-accent-700 bg-accent-50 border border-accent-200 rounded-xl px-4 py-3">
            {dict.guides.fallbackNotice}
          </p>
        )}
        <div className="flex items-center gap-3 text-[13px] text-text-muted">
          <a href={guide.author_url} className="font-medium text-text-primary hover:text-accent-600 transition-colors" target="_blank" rel="noopener noreferrer">{guide.author}</a>
          <span className="text-border">·</span>
          <span>{guide.updated}</span>
          <span className="text-border">·</span>
          <a href="https://github.com/fly-pigTH/ral-skill" className="text-accent-500 hover:underline" target="_blank" rel="noopener noreferrer">ral.skill</a>
        </div>
      </header>

      <div className="lg:flex lg:gap-14">
        <GuideTOC
          nodes={tocNodes}
          expandLabel={dict.guides.tocExpand}
          collapseLabel={dict.guides.tocCollapse}
        />

        <article className="flex-1 min-w-0">
          {guide.phases.map((phase, index) => (
            <PhaseSection key={phase.id} phase={phase} index={index} labels={dict.guides.phases} />
          ))}

          <div className="mt-14 py-8 text-center border-t border-border-light">
            <p className="text-sm text-text-muted mb-4">{dict.guides.ctaText}</p>
            <a href="https://github.com/fly-pigTH/ral-skill" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-text-primary text-surface-0 text-sm font-medium hover:opacity-90 transition-opacity">
              {dict.guides.ctaButton}
            </a>
          </div>
        </article>
      </div>
    </main>
  )
}
