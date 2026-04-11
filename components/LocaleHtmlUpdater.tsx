'use client'

import { useEffect } from 'react'
import type { Locale } from '@/src/lib/i18n'

export default function LocaleHtmlUpdater({ lang }: { lang: Locale }) {
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return null
}
