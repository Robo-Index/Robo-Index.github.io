'use client'

interface Stage {
  name: string
  name_en?: string
  duration_min: number
  duration_max: number
  source: 'official' | 'guide' | 'community'
  note?: string
}

export default function SubmissionTimeline({ stages }: { stages: Stage[] }) {
  const totalMin = stages.reduce((s, st) => s + st.duration_min, 0)
  const totalMax = stages.reduce((s, st) => s + st.duration_max, 0)

  // Accumulate days for milestone labels
  let accMin = 0
  let accMax = 0
  const milestones = stages.map(stage => {
    const start = { min: accMin, max: accMax }
    accMin += stage.duration_min
    accMax += stage.duration_max
    return { ...stage, start, end: { min: accMin, max: accMax } }
  })

  return (
    <div>
      <h2 className="font-serif text-xl font-normal text-text-primary mb-1">RA-L Submission Timeline</h2>
      <p className="text-sm text-text-muted mb-8">
        Total ~{Math.round(totalMin / 30)}–{Math.round(totalMax / 30)} months · Official guarantee ≤ 6 months
      </p>

      <div className="relative ml-4 sm:ml-8">
        {milestones.map((m, i) => {
          const days = m.duration_min === m.duration_max
            ? `${m.duration_min} days`
            : `${m.duration_min}–${m.duration_max} days`
          const isLast = i === milestones.length - 1

          return (
            <div key={i} className="relative pb-8 last:pb-0">
              {/* Vertical line */}
              {!isLast && (
                <div className="absolute left-[7px] top-[18px] bottom-0 w-px bg-accent-300/50" />
              )}

              {/* Node */}
              <div className="flex items-start gap-4">
                {/* Dot */}
                <div className="relative z-10 mt-1 shrink-0">
                  <div className="w-[15px] h-[15px] rounded-full bg-accent-500 border-[3px] border-surface-0 shadow-sm" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 -mt-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-text-primary">{m.name}</span>
                    {m.note && (
                      <span className="text-[10px] font-semibold text-accent-600 bg-accent-500/10 px-1.5 py-0.5 rounded">
                        {m.note}
                      </span>
                    )}
                  </div>

                  {/* Duration pill */}
                  <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-2 border border-border-light">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-accent-500 shrink-0">
                      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M8 4.5v4l2.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-sm font-medium text-text-primary">{days}</span>
                  </div>

                  {/* Accumulated day range */}
                  {!isLast && (
                    <p className="mt-1 text-[11px] text-text-muted">
                      Day {m.start.min}–{m.start.max === m.start.min ? '' : `${m.start.max}`} → Day {m.end.min}–{m.end.max}
                    </p>
                  )}
                  {isLast && (
                    <p className="mt-1 text-[11px] text-text-muted">
                      ~Day {m.end.min}–{m.end.max} from submission
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-border-light text-xs text-text-muted">
        Data from <a href="https://github.com/fly-pigTH/ral-skill" className="text-accent-500 hover:underline" target="_blank" rel="noopener noreferrer">ral.skill</a>
      </div>
    </div>
  )
}
