import { z } from 'zod'

export const MAX_INPUT_LENGTH = 2000

export const userInputSchema = z.object({
  text: z
    .string()
    .trim()
    .min(3, 'Please enter a little more text.')
    .max(MAX_INPUT_LENGTH, `Please keep it under ${MAX_INPUT_LENGTH} characters.`),
})

export const explanationSchema = z.object({
  summary: z.string().describe('A short, friendly plain-language explanation (2-4 sentences).'),
  keyTerms: z
    .array(z.object({ term: z.string(), meaning: z.string() }))
    .describe('Medical words or abbreviations from the input, each explained simply.'),
  simpleSteps: z
    .array(z.string())
    .describe('If the input contains instructions, restate them as simple steps. Otherwise empty.'),
  askYourProvider: z
    .array(z.string())
    .describe('2-3 short questions the person could ask their healthcare provider to clarify.'),
})

export const questionsSchema = z.object({
  categories: z
    .array(
      z.object({
        title: z.string().describe('A short category name, e.g. "Understanding my symptoms".'),
        questions: z.array(z.string()),
      }),
    )
    .describe('3-5 categories of questions to ask during the appointment.'),
  tips: z.array(z.string()).describe('2-3 practical tips for getting the most out of the appointment.'),
})

export type Explanation = z.infer<typeof explanationSchema>
export type QuestionList = z.infer<typeof questionsSchema>

export type ApiResult<T> =
  | { mode: 'ai'; data: T }
  | { mode: 'demo'; data: T; reason: string }
