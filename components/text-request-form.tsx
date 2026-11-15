'use client'

import { useId, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { MAX_INPUT_LENGTH } from '@/lib/schemas'

export function TextRequestForm({
  label,
  placeholder,
  examples,
  submitLabel,
  loadingLabel,
  loading,
  error,
  onSubmit,
}: {
  label: string
  placeholder: string
  examples: { label: string; text: string }[]
  submitLabel: string
  loadingLabel: string
  loading: boolean
  error: string | null
  onSubmit: (text: string) => void
}) {
  const [text, setText] = useState('')
  const id = useId()
  const errorId = `${id}-error`

  return (
    <form
      className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm"
      onSubmit={(e) => {
        e.preventDefault()
        if (text.trim()) onSubmit(text)
      }}
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor={id} className="text-base">
          {label}
        </Label>
        <Textarea
          id={id}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          maxLength={MAX_INPUT_LENGTH}
          rows={6}
          className="min-h-36 text-base"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
        />
        <p className="text-right text-xs text-muted-foreground">
          {text.length} / {MAX_INPUT_LENGTH}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Try a fictional example:</p>
        <div className="flex flex-wrap gap-2">
          {examples.map((example) => (
            <Button
              key={example.label}
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setText(example.text)}
            >
              {example.label}
            </Button>
          ))}
        </div>
      </div>

      {error ? (
        <p id={errorId} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}

      <Button type="submit" size="lg" className="h-11 text-base sm:self-start sm:px-6" disabled={loading || !text.trim()}>
        {loading ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" />
            {loadingLabel}
          </>
        ) : (
          submitLabel
        )}
      </Button>
    </form>
  )
}
