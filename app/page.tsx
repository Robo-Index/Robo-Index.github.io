'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { defaultLocale, isLocale, localeStorageKey } from '@/src/lib/i18n'
import { getDictionary } from '@/src/i18n/dictionaries'

const dict = getDictionary(defaultLocale)

function detectPreferredLanguage() {
  const stored = localStorage.getItem(localeStorageKey)
  if (stored && isLocale(stored)) return stored

  const browserLocales = navigator.languages ?? [navigator.language]
  const matched = browserLocales.find(locale => locale.toLowerCase().startsWith('zh'))
  return matched ? 'zh' : defaultLocale
}

export default function RootRedirectPage() {
  useEffect(() => {
    const targetLocale = detectPreferredLanguage()
    localStorage.setItem(localeStorageKey, targetLocale)
    window.location.replace(`/${targetLocale}/`)
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">RoboIndex</h1>
        <p className="text-text-secondary">{dict.root.redirecting}</p>
        <div className="flex items-center justify-center gap-4 text-sm">
          <Link href="/en/" className="text-accent-600 hover:text-accent-700">English</Link>
          <span className="text-border">·</span>
          <Link href="/zh/" className="text-accent-600 hover:text-accent-700">中文</Link>
        </div>
      </div>
    </main>
  )
}
