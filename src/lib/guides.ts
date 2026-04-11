import fs from 'fs'
import path from 'path'
import yaml from 'yaml'
import type { Locale } from '@/src/lib/i18n'

const GUIDES_DIR = path.join(process.cwd(), 'src/content/guides')

export interface GuideBlock {
  type: 'text' | 'list' | 'steps' | 'links' | 'quote' | 'heading' | 'callout' | 'compare'
  content?: string
  items?: (string | { label: string; url: string })[]
  ordered?: boolean
  variant?: 'tip' | 'warning'
  good?: string
  bad?: string
  note?: string
}

export interface GuideChapter {
  id: string
  title: string
  blocks: GuideBlock[]
}

export interface GuidePhase {
  id: string
  title: string
  subtitle: string
  chapters: GuideChapter[]
}

export interface FullGuide {
  title: string
  author: string
  author_url: string
  updated: string
  description: string
  phases: GuidePhase[]
}

function readLocalizedYaml(baseName: string, lang: Locale) {
  const requestedPath = path.join(GUIDES_DIR, `${baseName}.${lang}.yaml`)
  if (fs.existsSync(requestedPath)) {
    return {
      data: yaml.parse(fs.readFileSync(requestedPath, 'utf-8')),
      isFallback: false,
    }
  }

  const fallbackPath = path.join(GUIDES_DIR, `${baseName}.en.yaml`)
  if (!fs.existsSync(fallbackPath)) return null

  return {
    data: yaml.parse(fs.readFileSync(fallbackPath, 'utf-8')),
    isFallback: lang !== 'en',
  }
}

export function getFullGuide(lang: Locale): { guide: FullGuide | null; isFallback: boolean } {
  const result = readLocalizedYaml('ral-guide', lang)
  if (!result) {
    return { guide: null, isFallback: false }
  }

  return { guide: result.data as FullGuide, isFallback: result.isFallback }
}
