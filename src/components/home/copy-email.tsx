'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function CopyEmail({ email }: { email: string }) {
  const t = useTranslations('contact')
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle')

  async function copy() {
    try {
      await navigator.clipboard.writeText(email)
      setStatus('copied')
    } catch {
      setStatus('failed')
    }
    setTimeout(() => setStatus('idle'), 2500)
  }

  const label =
    status === 'copied' ? t('copied') : status === 'failed' ? t('copy_failed') : t('copy')

  return (
    <button
      type="button"
      onClick={copy}
      className="-my-2 inline-flex items-center gap-2 py-2 font-mono text-xs uppercase tracking-[0.08em] text-muted hover:text-accent"
    >
      {status === 'copied' ? (
        <Check size={14} aria-hidden="true" />
      ) : (
        <Copy size={14} aria-hidden="true" />
      )}
      <span aria-live="polite">{label}</span>
    </button>
  )
}
