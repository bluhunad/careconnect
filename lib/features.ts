import { BookOpenText, CalendarClock, ClipboardList, type LucideIcon } from 'lucide-react'

export type Feature = {
  href: string
  name: string
  tagline: string
  description: string
  icon: LucideIcon
  usesAI: boolean
}

export const features: Feature[] = [
  {
    href: '/easyexplain',
    name: 'EasyExplain',
    tagline: 'Understand medical language',
    description:
      'Paste discharge instructions, a medication label, or an unfamiliar medical term and get a plain-language explanation.',
    icon: BookOpenText,
    usesAI: true,
  },
  {
    href: '/appointment-prep',
    name: 'Appointment Prep',
    tagline: 'Walk in prepared',
    description:
      'Describe what you want to talk about and get an organized list of questions to bring to your healthcare provider.',
    icon: ClipboardList,
    usesAI: true,
  },
  {
    href: '/reminders',
    name: 'Care Reminders',
    tagline: 'Stay organized',
    description:
      'Add upcoming appointments with dates and times, see them in order, and remove them when you are done.',
    icon: CalendarClock,
    usesAI: false,
  },
]
