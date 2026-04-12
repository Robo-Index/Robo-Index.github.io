import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RoboIndex',
  description: 'Structured robotics research paper data',
}

// Inline script to prevent flash of wrong theme
const themeScript = `
(function() {
  var t = localStorage.getItem('theme');
  if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
})();
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          data-goatcounter="https://roboindex.goatcounter.com/count"
          async={true}
          src="//gc.zgo.at/count.js"
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
