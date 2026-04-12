'use client'

import { useRouter, usePathname } from 'next/navigation'
import { localeStorageKey, replaceLocaleInPath } from '@/src/lib/i18n'
import type { Locale } from '@/src/lib/i18n'

export default function LanguageSwitcher({
  lang,
  label,
}: {
  lang: Locale
  label: string
}) {
  const router = useRouter()
  const pathname = usePathname()

  const setLanguage = (nextLang: Locale) => {
    localStorage.setItem(localeStorageKey, nextLang)
    router.push(replaceLocaleInPath(pathname || '/', nextLang))
  }

  return (
    <div className="flex items-center gap-1 rounded-lg border border-border-light bg-surface-1 p-1" aria-label={label}>
      <button
        onClick={() => setLanguage('en')}
        className={`rounded-md px-2 py-1 text-[11px] font-medium transition-colors ${
          lang === 'en' ? 'bg-text-primary text-surface-0' : 'text-text-muted hover:text-text-primary'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('zh')}
        className={`rounded-md px-2 py-1 text-[11px] font-medium transition-colors ${
          lang === 'zh' ? 'bg-text-primary text-surface-0' : 'text-text-muted hover:text-text-primary'
        }`}
      >
        中文
      </button>
    </div>
  )
}
