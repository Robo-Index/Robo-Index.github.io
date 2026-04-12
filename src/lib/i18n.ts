export const locales = ['en', 'zh'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'
export const localeStorageKey = 'preferred-language'

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export function withLocale(lang: Locale, pathname = ''): string {
  if (!pathname || pathname === '/') {
    return `/${lang}`
  }

  return pathname.startsWith('/') ? `/${lang}${pathname}` : `/${lang}/${pathname}`
}

export function replaceLocaleInPath(pathname: string, nextLang: Locale): string {
  const normalized = pathname || '/'
  const stripped = normalized.replace(/^\/(en|zh)(?=\/|$)/, '')
  return withLocale(nextLang, stripped || '/')
}

export function getLocalizedText(
  english: string,
  chinese: string | undefined,
  lang: Locale,
): string {
  return lang === 'zh' && chinese ? chinese : english
}

export function buildAlternates(pathname = '') {
  return {
    languages: {
      en: withLocale('en', pathname),
      zh: withLocale('zh', pathname),
    },
  }
}
