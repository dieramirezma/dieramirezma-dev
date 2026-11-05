'use client'

import { useEffect, useState } from 'react'

function format() {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Bogota',
  }).format(new Date())
}

export function BogotaClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    setTime(format())
    const id = setInterval(() => setTime(format()), 30000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {time || '--:--'} COT
    </span>
  )
}
