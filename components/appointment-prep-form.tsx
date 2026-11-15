'use client'

import { useState } from 'react'
import { Check, Copy, Lightbulb, Printer } from 'lucide-react'
import { useAiRequest } from '@/hooks/use-ai-request'
import type { QuestionList } from '@/lib/schemas'
import { Button } from '@/components/ui/button'
import { DemoModeNotice, ResponseModeBadge, SafetyCallout } from '@/components/page-intro'
import { TextRequestForm } from '@/components/text-request-form'

const examples = [
  {
    label: 'Ongoing headaches',
    text: 'I have been getting headaches in the afternoon for about two weeks. I also feel more tired than usual and have been sleeping poorly.',
  },
  {
    label: 'New medication',
    text: 'My provider started me on a new medication last month. I want to know about side effects and whether I can take it with my allergy pills.',
  },
  {
    label: 'Annual checkup',
    text: 'Annual checkup. I want to talk about exercise, stress at work, and whether I am due for any screenings.',
  },
]

function toPlainText(data: QuestionList) {
  return data.categories
    .map((c) => `${c.title}\n${c.questions.map((q) => `- ${q}`).join('\n')}`)
    .join('\n\n')
}

export function AppointmentPrepForm() {
  const { result, error, loading, submit } = useAiRequest<QuestionList>('/api/questions')
  const [copied, setCopied] = useState(false)

  async function copy() {
    if (!result) return
    await navigator.clipboard.writeText(toPlainText(result.data))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      <SafetyCallout>
        These questions help you have a better conversation with your provider. They are not medical advice.
        If you have urgent or severe symptoms, call 911 or your local emergency number.
      </SafetyCallout>

      <TextRequestForm
        label="What would you like to discuss at your appointment?"
        placeholder="Example: I've had trouble sleeping and want to ask about my new medication."
        examples={examples}
        submitLabel="Create my question list"
        loadingLabel="Creating questions…"
        loading={loading}
        error={error}
        onSubmit={submit}
      />

      <div aria-live="polite">
        {result ? (
          <section
            aria-labelledby="questions-heading"
            className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 id="questions-heading" className="text-lg font-semibold text-foreground">
                Your appointment questions
              </h2>
              <ResponseModeBadge mode={result.mode} />
            </div>

            {result.mode === 'demo' ? <DemoModeNotice /> : null}

            <div className="flex flex-col gap-5">
              {result.data.categories.map((category) => (
                <div key={category.title} className="flex flex-col gap-2">
                  <h3 className="font-semibold text-primary">{category.title}</h3>
                  <ul className="flex flex-col gap-2">
                    {category.questions.map((q) => (
                      <li key={q} className="flex gap-3 rounded-lg bg-secondary/50 p-3 leading-relaxed">
                        <span
                          className="mt-1 size-4 shrink-0 rounded border-2 border-primary/50"
                          aria-hidden="true"
                        />
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {result.data.tips.length > 0 ? (
              <div className="flex flex-col gap-2 rounded-lg border border-accent bg-accent/40 p-4">
                <h3 className="flex items-center gap-2 font-semibold text-accent-foreground">
                  <Lightbulb className="size-4" aria-hidden="true" />
                  Tips for your visit
                </h3>
                <ul className="list-disc pl-5 text-sm leading-relaxed text-foreground">
                  {result.data.tips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="flex flex-wrap gap-2 print:hidden">
              <Button variant="outline" onClick={copy}>
                {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
                {copied ? 'Copied' : 'Copy questions'}
              </Button>
              <Button variant="outline" onClick={() => window.print()}>
                <Printer aria-hidden="true" />
                Print
              </Button>
            </div>
          </section>
        ) : null}
      </div>
    </div>
  )
}
