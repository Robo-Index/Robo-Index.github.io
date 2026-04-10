'use client'

import { useEffect, useState } from 'react'

interface TOCNode {
  id: string
  label: string
  icon: string
  children: { id: string; label: string }[]
}

export default function GuideTOC({ nodes }: { nodes: TOCNode[] }) {
  const [activeId, setActiveId] = useState('')
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {}
    nodes.forEach(n => { init[n.id] = true })
    return init
  })

  useEffect(() => {
    const allIds = nodes.flatMap(n => [n.id, ...n.children.map(c => c.id)])
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length > 0) {
          const id = visible[0].target.id
          setActiveId(id)
          // Auto-expand parent when scrolling into a child
          for (const node of nodes) {
            if (node.children.some(c => c.id === id)) {
              setExpanded(prev => ({ ...prev, [node.id]: true }))
            }
          }
        }
      },
      { rootMargin: '-100px 0px -65% 0px', threshold: 0.05 }
    )
    allIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [nodes])

  const isPhaseActive = (node: TOCNode) =>
    activeId === node.id || node.children.some(c => c.id === activeId)

  const toggle = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <>
      {/* Desktop — Reddit-style collapsible tree */}
      <nav className="hidden lg:block w-52 shrink-0">
        <div className="sticky top-24">
          {nodes.map(node => {
            const active = isPhaseActive(node)
            const open = expanded[node.id]

            return (
              <div key={node.id} className="mb-1">
                {/* Phase row */}
                <div className="flex items-center">
                  <button
                    onClick={() => toggle(node.id)}
                    className="w-5 h-5 flex items-center justify-center text-text-muted/50 hover:text-text-muted shrink-0"
                    aria-label={open ? 'Collapse' : 'Expand'}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" className={`transition-transform duration-200 ${open ? 'rotate-90' : ''}`}>
                      <path d="M3 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <a
                    href={`#${node.id}`}
                    className={`flex-1 py-1.5 text-xs leading-snug rounded transition-colors duration-150 ${
                      active
                        ? 'text-text-primary font-semibold'
                        : 'text-text-muted hover:text-text-secondary'
                    }`}
                  >
                    {node.label}
                  </a>
                </div>

                {/* Children — collapsible */}
                {open && node.children.length > 0 && (
                  <div className="ml-[9px] border-l border-border-light pl-3 mt-0.5 mb-1">
                    {node.children.map(child => (
                      <a
                        key={child.id}
                        href={`#${child.id}`}
                        className={`block py-1 text-xs leading-snug rounded transition-colors duration-150 ${
                          activeId === child.id
                            ? 'text-accent-600 font-medium'
                            : 'text-text-muted/60 hover:text-text-muted'
                        }`}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </nav>

      {/* Mobile */}
      <div className="lg:hidden sticky top-16 z-40 -mx-6 px-6 py-2.5 bg-surface-0/90 backdrop-blur-md border-b border-border-light">
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
          {nodes.map(node => (
            <a key={node.id} href={`#${node.id}`}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all ${
                isPhaseActive(node) ? 'bg-text-primary text-surface-0' : 'bg-surface-2 text-text-muted'
              }`}>
              {node.label}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
