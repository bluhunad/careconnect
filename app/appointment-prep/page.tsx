import type { Metadata } from 'next'
import { ClipboardList } from 'lucide-react'
import { PageIntro } from '@/components/page-intro'
import { AppointmentPrepForm } from '@/components/appointment-prep-form'

export const metadata: Metadata = {
  title: 'Appointment Prep',
  description: 'Turn your health concerns into an organized list of questions for your next appointment.',
}

export default function AppointmentPrepPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-10">
      <PageIntro
        icon={ClipboardList}
        title="Appointment Prep"
        description="Write down what you want to talk about with your healthcare provider. We'll turn it into an organized list of questions you can bring with you."
      />
      <AppointmentPrepForm />
    </div>
  )
}
