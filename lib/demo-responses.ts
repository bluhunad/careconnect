import type { Explanation, QuestionList } from './schemas'

const glossary: Record<string, string> = {
  hypertension: 'High blood pressure — the force of blood against artery walls is higher than normal.',
  hypotension: 'Low blood pressure.',
  'b.i.d.': 'Twice a day.',
  bid: 'Twice a day.',
  't.i.d.': 'Three times a day.',
  tid: 'Three times a day.',
  'q.d.': 'Once a day.',
  prn: 'Only when needed.',
  npo: 'Nothing by mouth — do not eat or drink.',
  'p.o.': 'By mouth.',
  fasting: 'Not eating (and sometimes not drinking) for a set amount of time.',
  benign: 'Not cancer and not spreading.',
  acute: 'Started suddenly or recently.',
  chronic: 'Long-lasting or ongoing.',
  edema: 'Swelling caused by extra fluid in the body.',
  inflammation: 'The body’s response to injury or infection, often with redness, heat, or swelling.',
  'blood glucose': 'The amount of sugar in your blood.',
  cholesterol: 'A fatty substance in the blood.',
  incision: 'A cut made by a surgeon during a procedure.',
  dosage: 'How much medicine to take and how often.',
  'follow-up': 'A later visit to check on how you are doing.',
  outpatient: 'Care where you go home the same day.',
  prognosis: 'The expected course or outcome of a health condition.',
}

export function demoExplanation(text: string): Explanation {
  const lower = text.toLowerCase()
  const keyTerms = Object.entries(glossary)
    .filter(([term]) => new RegExp(`(^|[^a-z])${term.replace(/\./g, '\\.')}($|[^a-z])`).test(lower))
    .map(([term, meaning]) => ({ term, meaning }))

  const sentences = text
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 3)

  return {
    summary:
      keyTerms.length > 0
        ? `Your text includes ${keyTerms.length} medical term${keyTerms.length === 1 ? '' : 's'} that we found in our small built-in glossary. The meanings are listed below. A real AI model would give a fuller, personalized explanation.`
        : 'Demo mode uses a small built-in glossary and did not recognize the terms in your text. Try words like “hypertension”, “NPO”, “PRN”, or “b.i.d.” to see how explanations appear.',
    keyTerms,
    simpleSteps: sentences.length > 1 ? sentences.slice(0, 5) : [],
    askYourProvider: [
      'Can you explain this in simpler words?',
      'Is there anything I should watch for or call you about?',
      'Can I get these instructions in writing?',
    ],
  }
}

export function demoQuestions(text: string): QuestionList {
  const lower = text.toLowerCase()
  const categories: QuestionList['categories'] = [
    {
      title: 'Understanding what is going on',
      questions: [
        'What might be causing what I am experiencing?',
        'Are there tests that could help explain it?',
        'What should I keep track of before my next visit?',
      ],
    },
  ]

  if (/(medic|pill|dose|prescription|drug|side effect)/.test(lower)) {
    categories.push({
      title: 'Medications',
      questions: [
        'What is this medication for, and how should I take it?',
        'What side effects should I look out for?',
        'Could it interact with anything else I take?',
      ],
    })
  }

  if (/(sleep|tired|fatigue|stress|anxious|mood)/.test(lower)) {
    categories.push({
      title: 'Daily life and well-being',
      questions: [
        'Could my sleep, stress, or routine be affecting how I feel?',
        'Are there changes to my daily habits you would suggest?',
      ],
    })
  }

  categories.push({
    title: 'Next steps',
    questions: [
      'What are my options from here?',
      'When should I schedule a follow-up?',
      'What signs mean I should contact the office sooner?',
    ],
  })

  return {
    categories,
    tips: [
      'Bring a list of all medicines and supplements you take.',
      'Write down when your concerns started and how often they happen.',
      'It is okay to ask your provider to repeat or explain something again.',
    ],
  }
}
