'use client'

import React, { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: true,
  theme: 'default',
  securityLevel: 'loose',
})

interface MermaidProps {
  chart: string
}

const Mermaid = ({ chart }: MermaidProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      mermaid.contentLoaded()
    }
  }, [chart])

  return (
    <div className="mermaid" ref={ref}>
      {chart}
    </div>
  )
}

export default Mermaid
