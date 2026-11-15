import type { LucideIcon } from 'lucide-react'
import { ShieldAlert } from 'lucide-react'

export function PageIntro({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <h1 className="text-2xl font-semibold text-balance text-foreground sm:text-3xl">{title}</h1>
      </div>
      <p className="max-w-2xl leading-relaxed text-pretty text-muted-foreground">{description}</p>
    </div>
  )
}

export function SafetyCallout({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="note"
      className="flex gap-3 rounded-lg border border-border bg-secondary/60 p-4 text-sm leading-relaxed text-secondary-foreground"
    >
      <ShieldAlert className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
      <div>{children}</div>
    </div>
  )
}

export function ResponseModeBadge({ mode }: { mode: 'ai' | 'demo' }) {
  if (mode === 'ai') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
        <span className="size-1.5 rounded-full bg-teal" aria-hidden="true" />
        AI-generated response
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-900">
      <span className="size-1.5 rounded-full bg-amber-500" aria-hidden="true" />
      Demo mode — not from an AI model
    </span>
  )
}

export function DemoModeNotice({ reason }: { reason?: string }) {
  return (
    <p className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm leading-relaxed text-amber-900">
      <strong>Demo mode:</strong> The AI service could not be reached, so this is a pre-written sample
      response built from simple rules. It is shown so you can still test the feature.
      {reason ? ` (${reason})` : null}
    </p>
  )
}
