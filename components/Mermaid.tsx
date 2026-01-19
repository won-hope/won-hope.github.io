'use client'

import React, { useEffect, useRef, useState } from 'react'

interface MermaidProps {
  chart: string
}

const Mermaid = ({ chart }: MermaidProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    if (hasMounted && ref.current) {
      import('mermaid').then((mermaid) => {
        mermaid.default.initialize({
          startOnLoad: true,
          theme: 'default',
          securityLevel: 'loose',
        })

        // 2. 렌더링 실행
        mermaid.default.contentLoaded()
      })
    }
  }, [chart, hasMounted])

  if (!hasMounted) {
    return <div className="mermaid-loading" />
  }

  return (
    <div className="mermaid" ref={ref}>
      {chart}
    </div>
  )
}

export default Mermaid
