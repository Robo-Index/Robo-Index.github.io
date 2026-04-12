export interface Paper {
  slug: string
  title: string
  title_zh?: string
  venue: string
  year: number
  authors: string[]
  abstract: string
  abstract_zh?: string
  tags: string[]
  repo?: string
  project_page?: string
  arxiv?: string
  pdf?: string
  preview_image?: string
  preview_video?: string
  date_added: string
}

export interface TimelineStage {
  name: string
  name_zh?: string
  duration_min: number
  duration_max: number
  source: 'official' | 'guide' | 'community'
  note?: string
  note_zh?: string
}

export interface PaperIndex {
  data: Paper[]
  meta: { count: number; generated_at: string }
}

export interface RepoMeta {
  stars: number
  forks: number
  open_issues: number
  language: string | null
  license: string | null
  description: string | null
  pushed_at: string
  topics: string[]
  owner_avatar: string
  full_name: string
  html_url: string
  created_at: string
  updated_at?: string
}

export interface RepoMetaIndex {
  data: Record<string, RepoMeta>
  meta: { count: number; generated_at?: string; fetched_at?: string }
}

export interface Stats {
  total_papers: number
  papers_with_repo: number
  venues: Record<string, number>
  years: Record<number, number>
  tags: Record<string, number>
  generated_at: string
}
