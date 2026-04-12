import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-text-primary">404</h1>
        <p className="text-text-secondary">This page could not be found.</p>
        <div className="flex items-center justify-center gap-4 text-sm">
          <Link href="/en/" className="text-accent-600 hover:text-accent-700 transition-colors duration-200">English</Link>
          <span className="text-border">·</span>
          <Link href="/zh/" className="text-accent-600 hover:text-accent-700 transition-colors duration-200">中文</Link>
        </div>
      </div>
    </main>
  )
}
