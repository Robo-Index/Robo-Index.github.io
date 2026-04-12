import fs from 'fs'
import path from 'path'
import yaml from 'yaml'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DashboardClient from '@/components/dashboard/DashboardClient'
import SubmissionTimeline from '@/components/dashboard/SubmissionTimeline'
import { getDictionary } from '@/src/i18n/dictionaries'
import { buildAlternates, isLocale, locales } from '@/src/lib/i18n'
import type { TimelineStage } from '@/src/lib/types'

export function generateStaticParams() {
  return locales.map(lang => ({ lang }))
}

function loadTimeline(lang: 'en' | 'zh') {
  const requestedPath = path.join(process.cwd(), `src/content/timeline.${lang}.yaml`)
  const fallbackPath = path.join(process.cwd(), 'src/content/timeline.en.yaml')
  const filePath = fs.existsSync(requestedPath) ? requestedPath : fallbackPath
  if (!fs.existsSync(filePath)) return null
  const content = fs.readFileSync(filePath, 'utf-8')
  return yaml.parse(content) as { stages: TimelineStage[] }
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
    title: `${dict.dashboard.metadataTitle} | RoboIndex`,
    alternates: buildAlternates('/dashboard'),
  }
}

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const dict = getDictionary(lang)
  const timeline = loadTimeline(lang)

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">{dict.dashboard.heading}</h1>
        <p className="mt-2 text-text-secondary">{dict.dashboard.summary}</p>
      </div>
      <DashboardClient copy={dict.dashboard} />

      {timeline && (
        <div className="mt-12 bg-surface-1 rounded-2xl border border-border-light p-6">
          <SubmissionTimeline
            stages={timeline.stages}
            lang={lang}
            copy={{
              title: dict.dashboard.timelineTitle,
              summary: dict.dashboard.timelineSummary,
              days: dict.dashboard.timelineDays,
              fromSubmission: dict.dashboard.timelineFromSubmission,
              dataFrom: dict.dashboard.timelineDataFrom,
            }}
          />
        </div>
      )}
    </main>
  )
}
