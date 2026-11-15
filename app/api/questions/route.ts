import { generateWithFallback, SAFETY_RULES } from '@/lib/ai'
import { demoQuestions } from '@/lib/demo-responses'
import { questionsSchema, userInputSchema } from '@/lib/schemas'

export async function POST(request: Request) {
  const parsed = userInputSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0]?.message ?? 'Invalid input.' }, { status: 400 })
  }

  const { text } = parsed.data
  const result = await generateWithFallback({
    instructions: `You are Appointment Prep, part of CareConnect AI. You help patients turn their concerns into a clear, organized list of questions to ask their healthcare provider.\n\n${SAFETY_RULES}\n\nWrite questions in the first person ("Could my...", "What should I..."). Questions should help the patient learn from their provider — never suggest a diagnosis or treatment inside a question.`,
    prompt: `Here are the concerns I want to discuss at my appointment:\n\n"""${text}"""\n\nCreate an organized list of questions I can ask.`,
    schema: questionsSchema,
    fallback: () => demoQuestions(text),
  })

  return Response.json(result)
}
