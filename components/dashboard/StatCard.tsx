export default function StatCard({ label, value, subtitle }: {
  label: string
  value: string | number
  subtitle?: string
}) {
  return (
    <div className="bg-surface-1 rounded-2xl border border-border-light p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-300 to-accent-500" />
      <p className="text-2xl sm:text-3xl font-bold text-text-primary tabular-nums">{value}</p>
      <p className="text-xs sm:text-sm text-text-muted mt-1">{label}</p>
      {subtitle && <p className="text-xs text-text-muted mt-1">{subtitle}</p>}
    </div>
  )
}
