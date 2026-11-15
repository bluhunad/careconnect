'use client'

import { MessageCircleQuestion } from 'lucide-react'
import { useAiRequest } from '@/hooks/use-ai-request'
import type { Explanation } from '@/lib/schemas'
import { DemoModeNotice, ResponseModeBadge, SafetyCallout } from '@/components/page-intro'
import { TextRequestForm } from '@/components/text-request-form'

const examples = [
  {
    label: 'Discharge instructions',
    text: 'Take 1 tablet p.o. b.i.d. with food. Take the pain reliever PRN. Keep the incision clean and dry. NPO after midnight before your follow-up procedure.',
  },
  { label: 'Medical term', text: 'What does hypertension mean?' },
  {
    label: 'Lab note',
    text: 'Fasting blood glucose slightly elevated. Cholesterol within normal range. Recheck at follow-up in 3 months.',
  },
]

export function EasyExplainForm() {
  const { result, error, loading, submit } = useAiRequest<Explanation>('/api/explain')

  return (
    <div className="flex flex-col gap-6">
      <SafetyCallout>
        EasyExplain helps you <strong>understand</strong> information. It does not diagnose conditions or
        recommend treatments. Always follow the instructions from your healthcare provider.
      </SafetyCallout>

      <TextRequestForm
        label="Healthcare instructions or medical terms"
        placeholder="Example: Take 1 tablet b.i.d. with food. NPO after midnight."
        examples={examples}
        submitLabel="Explain in simple words"
        loadingLabel="Explaining…"
        loading={loading}
        error={error}
        onSubmit={submit}
      />

      <div aria-live="polite">
        {result ? (
          <section
            aria-labelledby="explanation-heading"
            className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 id="explanation-heading" className="text-lg font-semibold text-foreground">
                Plain-language explanation
              </h2>
              <ResponseModeBadge mode={result.mode} />
            </div>

            {result.mode === 'demo' ? <DemoModeNotice /> : null}

            <p className="text-base leading-relaxed text-foreground">{result.data.summary}</p>

            {result.data.keyTerms.length > 0 ? (
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">Key terms</h3>
                <dl className="grid gap-2 sm:grid-cols-2">
                  {result.data.keyTerms.map((item) => (
                    <div key={item.term} className="rounded-lg bg-secondary/60 p-3">
                      <dt className="font-medium text-secondary-foreground">{item.term}</dt>
                      <dd className="text-sm leading-relaxed text-muted-foreground">{item.meaning}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}

            {result.data.simpleSteps.length > 0 ? (
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground">Step by step</h3>
                <ol className="flex flex-col gap-2">
                  {result.data.simpleSteps.map((step, i) => (
                    <li key={i} className="flex gap-3 leading-relaxed">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            {result.data.askYourProvider.length > 0 ? (
              <div className="flex flex-col gap-2 rounded-lg border border-accent bg-accent/40 p-4">
                <h3 className="flex items-center gap-2 font-semibold text-accent-foreground">
                  <MessageCircleQuestion className="size-4" aria-hidden="true" />
                  Questions to ask your provider
                </h3>
                <ul className="list-disc pl-5 text-sm leading-relaxed text-foreground">
                  {result.data.askYourProvider.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>
        ) : null}
      </div>
    </div>
  )
}
