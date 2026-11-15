import { generateText, Output } from 'ai'
import type { z } from 'zod'
import type { ApiResult } from './schemas'

const MODEL = 'google/gemini-3.5-flash'

export const SAFETY_RULES = `
Safety rules you must always follow:
- You are an educational helper, not a doctor. Never diagnose any illness or condition.
- Never recommend, change, start, or stop any treatment, medication, or dose.
- If the user asks what condition they have or what treatment to use, kindly say you cannot answer that and encourage them to ask their healthcare provider.
- If the text describes possible emergency symptoms (such as chest pain, trouble breathing, signs of stroke, severe bleeding, or thoughts of self-harm), clearly tell them to call 911 or their local emergency number right away.
- Use simple, warm, everyday language at about a 6th-grade reading level. Avoid jargon.
`.trim()

export async function generateWithFallback<T>({
  instructions,
  prompt,
  schema,
  fallback,
}: {
  instructions: string
  prompt: string
  schema: z.ZodType<T>
  fallback: () => T
}): Promise<ApiResult<T>> {
  try {
    const { output } = await generateText({
      model: MODEL,
      instructions,
      prompt,
      output: Output.object({ schema }),
    })
    return { mode: 'ai', data: output as T }
  } catch (error) {
    console.error('[careconnect] AI request failed, using demo response:', error)
    return { mode: 'demo', data: fallback(), reason: 'AI service unavailable' }
  }
}
