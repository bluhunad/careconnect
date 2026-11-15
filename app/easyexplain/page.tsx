import type { Metadata } from 'next'
import { BookOpenText } from 'lucide-react'
import { PageIntro } from '@/components/page-intro'
import { EasyExplainForm } from '@/components/easy-explain-form'

export const metadata: Metadata = {
  title: 'EasyExplain',
  description: 'Turn healthcare instructions and medical terms into plain, easy-to-understand language.',
}

export default function EasyExplainPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-10">
      <PageIntro
        icon={BookOpenText}
        title="EasyExplain"
        description="Paste healthcare instructions or type a medical word you don't understand. We'll explain it in simple, everyday language."
      />
      <EasyExplainForm />
    </div>
  )
}
