import type { Metadata } from 'next'
import { CalendarClock } from 'lucide-react'
import { PageIntro } from '@/components/page-intro'
import { CareReminders } from '@/components/care-reminders'

export const metadata: Metadata = {
  title: 'Care Reminders',
  description: 'Keep track of upcoming healthcare appointments with dates and times.',
}

export default function RemindersPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10">
      <PageIntro
        icon={CalendarClock}
        title="Care Reminders"
        description="Add your upcoming appointments and see them in date order. Reminders are saved only in this browser on this device."
      />
      <CareReminders />
    </div>
  )
}
