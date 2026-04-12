import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'
import type { Locale } from '@/src/lib/i18n'
import { withLocale } from '@/src/lib/i18n'

export default function Header({
  lang,
  labels,
}: {
  lang: Locale
  labels: {
    papers: string
    guides: string
    ralSkill: string
    dashboard: string
    contribute: string
    themeToggleLabel: string
    languageToggleLabel: string
  }
}) {
  return (
    <header className="sticky top-0 z-50 bg-surface-0/80 backdrop-blur-md border-b border-border-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        <Link href={withLocale(lang)} className="font-semibold text-base sm:text-lg tracking-tight text-text-primary">
          RoboIndex
        </Link>
        <nav className="flex items-center gap-3 sm:gap-8 overflow-x-auto no-scrollbar">
          <Link href={withLocale(lang, '/papers')} className="text-xs sm:text-sm text-text-secondary hover:text-text-primary transition-colors whitespace-nowrap">
            {labels.papers}
          </Link>
          <Link href={withLocale(lang, '/guides')} className="text-xs sm:text-sm text-text-secondary hover:text-text-primary transition-colors whitespace-nowrap">
            {labels.guides}
          </Link>
          <Link href={withLocale(lang, '/ral-skill')} className="text-xs sm:text-sm text-violet-500 hover:text-violet-600 transition-colors font-medium whitespace-nowrap">
            {labels.ralSkill}
          </Link>
          <Link href={withLocale(lang, '/dashboard')} className="text-xs sm:text-sm text-text-secondary hover:text-text-primary transition-colors whitespace-nowrap">
            {labels.dashboard}
          </Link>
          <Link href={withLocale(lang, '/contribute')} className="text-xs sm:text-sm text-text-secondary hover:text-text-primary transition-colors whitespace-nowrap">
            {labels.contribute}
          </Link>
          <LanguageSwitcher lang={lang} label={labels.languageToggleLabel} />
          <ThemeToggle label={labels.themeToggleLabel} />
        </nav>
      </div>
    </header>
  )
}
