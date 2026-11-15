'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HeartPulse } from 'lucide-react'
import { features } from '@/lib/features'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 self-start rounded-md font-semibold text-foreground"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <HeartPulse className="size-5" aria-hidden="true" />
          </span>
          <span className="text-lg">
            CareConnect <span className="text-teal">AI</span>
          </span>
        </Link>

        <nav aria-label="Main">
          <ul className="-mx-1 flex gap-1 overflow-x-auto">
            {features.map((feature) => {
              const active = pathname === feature.href
              return (
                <li key={feature.href}>
                  <Link
                    href={feature.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors',
                      active
                        ? 'bg-secondary text-secondary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    )}
                  >
                    <feature.icon className="size-4" aria-hidden="true" />
                    {feature.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
