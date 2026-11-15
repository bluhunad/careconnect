import Link from 'next/link'
import { ArrowRight, Lock, ShieldCheck, Sparkles } from 'lucide-react'
import { features } from '@/lib/features'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-10 sm:py-16">
      <section className="flex flex-col gap-6" aria-labelledby="welcome-heading">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
          <Sparkles className="size-4" aria-hidden="true" />
          Your healthcare helper
        </span>
        <h1
          id="welcome-heading"
          className="max-w-3xl text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl"
        >
          Welcome to CareConnect <span className="text-primary">AI</span>
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
          Healthcare information can be confusing. CareConnect AI turns medical language into plain words,
          helps you prepare questions before an appointment, and keeps your upcoming visits organized — all
          in one simple place.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/easyexplain" className={cn(buttonVariants({ size: 'lg' }), 'h-11 px-5 text-base')}>
            Get started
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Link>
          <Link
            href="/reminders"
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-11 px-5 text-base')}
          >
            View my reminders
          </Link>
        </div>
      </section>

      <section aria-labelledby="features-heading" className="flex flex-col gap-4">
        <h2 id="features-heading" className="text-xl font-semibold text-foreground">
          What would you like to do?
        </h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <li key={feature.href}>
              <Link
                href={feature.href}
                className="group flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary">
                  <feature.icon className="size-5" aria-hidden="true" />
                </span>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-teal">{feature.tagline}</p>
                  <h3 className="text-lg font-semibold text-foreground">{feature.name}</h3>
                </div>
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                <span className="flex items-center gap-1 text-sm font-medium text-primary">
                  Open {feature.name}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="trust-heading" className="grid gap-4 rounded-xl bg-secondary/60 p-6 md:grid-cols-2">
        <h2 id="trust-heading" className="sr-only">
          Safety and privacy
        </h2>
        <div className="flex gap-3">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-foreground">Information, not diagnosis</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              CareConnect AI explains and organizes. It never diagnoses illnesses or recommends treatments —
              always follow your healthcare provider&apos;s advice.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Lock className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-foreground">Use fictional information</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              This is a learning project. Please avoid entering real names or personal health details while
              testing.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
