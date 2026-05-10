import { useState } from 'react'

const TRUNCATE_THRESHOLD = 220

interface ReviewBodyProps {
  text: string
}

export function ReviewBody({ text }: ReviewBodyProps) {
  const [expanded, setExpanded] = useState(false)
  const isLong = text.length > TRUNCATE_THRESHOLD

  return (
    <p className="text-sm leading-relaxed text-foreground/80">
      {isLong && !expanded ? `${text.slice(0, TRUNCATE_THRESHOLD).trimEnd()}…` : text}
      {isLong && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="ml-1 text-sm font-medium text-foreground underline-offset-2 hover:underline"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </p>
  )
}
