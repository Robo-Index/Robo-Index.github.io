import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import LocaleHtmlUpdater from '@/components/LocaleHtmlUpdater'
import { getDictionary } from '@/src/i18n/dictionaries'
import { isLocale, locales } from '@/src/lib/i18n'

export function generateStaticParams() {
  return locales.map(lang => ({ lang }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const dict = getDictionary(lang)

  return (
    <>
      <LocaleHtmlUpdater lang={lang} />
      <Header lang={lang} labels={dict.header} />
      {children}
    </>
  )
}
