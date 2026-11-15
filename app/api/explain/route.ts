import { generateWithFallback, SAFETY_RULES } from '@/lib/ai'
import { demoExplanation } from '@/lib/demo-responses'
import { explanationSchema, userInputSchema } from '@/lib/schemas'

export async function POST(request: Request) {
  const parsed = userInputSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0]?.message ?? 'Invalid input.' }, { status: 400 })
  }

  const { text } = parsed.data
  const result = await generateWithFallback({
    instructions: `You are EasyExplain, part of CareConnect AI. You rewrite healthcare instructions and medical terminology in plain, friendly language so patients can understand them.\n\n${SAFETY_RULES}\n\nOnly explain what the text already says. Do not add new medical advice.`,
    prompt: `Explain this healthcare text in simple language:\n\n"""${text}"""`,
    schema: explanationSchema,
    fallback: () => demoExplanation(text),
  })

  return Response.json(result)
}
