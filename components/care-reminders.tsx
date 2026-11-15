'use client'

import { useEffect, useMemo, useState } from 'react'
import { CalendarDays, Clock, MapPin, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Reminder = {
  id: string
  name: string
  location: string
  date: string
  time: string
}

const STORAGE_KEY = 'careconnect-reminders'

function daysFromToday(days: number) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

const sampleReminders = (): Reminder[] => [
  { id: crypto.randomUUID(), name: 'Annual checkup', location: 'Maple Grove Family Clinic', date: daysFromToday(3), time: '09:30' },
  { id: crypto.randomUUID(), name: 'Dental cleaning', location: 'Bright Smile Dental', date: daysFromToday(10), time: '14:00' },
  { id: crypto.randomUUID(), name: 'Eye exam', location: 'Clearview Optometry', date: daysFromToday(21), time: '11:15' },
]

function toDate(r: Reminder) {
  return new Date(`${r.date}T${r.time || '00:00'}`)
}

const dateFormatter = new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
const timeFormatter = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' })

function relativeLabel(date: Date) {
  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)
  const target = new Date(date)
  target.setHours(0, 0, 0, 0)
  const diff = Math.round((target.getTime() - startOfToday.getTime()) / 86_400_000)
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Tomorrow'
  if (diff > 1) return `In ${diff} days`
  return 'Past'
}

export function CareReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [loaded, setLoaded] = useState(false)
  const [form, setForm] = useState({ name: '', location: '', date: '', time: '' })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setReminders(JSON.parse(stored))
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders))
  }, [reminders, loaded])

  const { upcoming, past } = useMemo(() => {
    const now = Date.now()
    const sorted = [...reminders].sort((a, b) => toDate(a).getTime() - toDate(b).getTime())
    return {
      upcoming: sorted.filter((r) => toDate(r).getTime() >= now),
      past: sorted.filter((r) => toDate(r).getTime() < now).reverse(),
    }
  }, [reminders])

  function addReminder(e: React.FormEvent) {
    e.preventDefault()
    const name = form.name.trim()
    if (!name || !form.date || !form.time) {
      setError('Please enter an appointment name, date, and time.')
      return
    }
    setReminders((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: name.slice(0, 100), location: form.location.trim().slice(0, 100), date: form.date, time: form.time },
    ])
    setForm({ name: '', location: '', date: '', time: '' })
    setError(null)
  }

  function deleteReminder(id: string) {
    setReminders((prev) => prev.filter((r) => r.id !== id))
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
      <form
        onSubmit={addReminder}
        className="flex h-fit flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm"
        aria-labelledby="add-reminder-heading"
      >
        <h2 id="add-reminder-heading" className="text-lg font-semibold text-foreground">
          Add a reminder
        </h2>
        <div className="flex flex-col gap-2">
          <Label htmlFor="reminder-name">Appointment name</Label>
          <Input
            id="reminder-name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Annual checkup"
            maxLength={100}
            required
            className="h-10 text-base"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="reminder-location">
            Location or provider <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="reminder-location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="e.g. Maple Grove Family Clinic"
            maxLength={100}
            className="h-10 text-base"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="reminder-date">Date</Label>
            <Input
              id="reminder-date"
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
              className="h-10 text-base"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="reminder-time">Time</Label>
            <Input
              id="reminder-time"
              type="time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              required
              className="h-10 text-base"
            />
          </div>
        </div>
        {error ? (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        ) : null}
        <Button type="submit" size="lg" className="h-11 text-base">
          <Plus aria-hidden="true" />
          Add reminder
        </Button>
      </form>

      <section aria-labelledby="upcoming-heading" className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 id="upcoming-heading" className="text-lg font-semibold text-foreground">
            Upcoming appointments{' '}
            <span className="font-normal text-muted-foreground">({upcoming.length})</span>
          </h2>
          {loaded && reminders.length === 0 ? (
            <Button variant="outline" size="sm" onClick={() => setReminders(sampleReminders())}>
              Load fictional sample reminders
            </Button>
          ) : null}
        </div>

        {!loaded ? (
          <p className="text-sm text-muted-foreground">Loading reminders…</p>
        ) : upcoming.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border bg-card p-8 text-center">
            <CalendarDays className="size-8 text-muted-foreground" aria-hidden="true" />
            <p className="font-medium text-foreground">No upcoming appointments</p>
            <p className="text-sm text-muted-foreground">Add one using the form, or load the fictional samples.</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {upcoming.map((r) => (
              <ReminderItem key={r.id} reminder={r} onDelete={deleteReminder} />
            ))}
          </ul>
        )}

        {past.length > 0 ? (
          <div className="flex flex-col gap-3 pt-2">
            <h3 className="text-sm font-semibold text-muted-foreground">Past appointments</h3>
            <ul className="flex flex-col gap-3 opacity-75">
              {past.map((r) => (
                <ReminderItem key={r.id} reminder={r} onDelete={deleteReminder} />
              ))}
            </ul>
          </div>
        ) : null}
      </section>
    </div>
  )
}

function ReminderItem({ reminder, onDelete }: { reminder: Reminder; onDelete: (id: string) => void }) {
  const date = toDate(reminder)
  const label = relativeLabel(date)
  const soon = label === 'Today' || label === 'Tomorrow'

  return (
    <li className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex w-14 shrink-0 flex-col items-center rounded-lg bg-secondary py-2 text-secondary-foreground">
        <span className="text-xs font-medium uppercase">
          {date.toLocaleDateString(undefined, { month: 'short' })}
        </span>
        <span className="text-xl leading-none font-semibold">{date.getDate()}</span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-semibold break-words text-foreground">{reminder.name}</p>
          <span
            className={
              soon
                ? 'rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground'
                : 'rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground'
            }
          >
            {label}
          </span>
        </div>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock className="size-3.5" aria-hidden="true" />
          {dateFormatter.format(date)} at {timeFormatter.format(date)}
        </p>
        {reminder.location ? (
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-3.5" aria-hidden="true" />
            {reminder.location}
          </p>
        ) : null}
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(reminder.id)}
        aria-label={`Delete reminder: ${reminder.name}`}
        className="text-muted-foreground hover:text-destructive"
      >
        <Trash2 aria-hidden="true" />
      </Button>
    </li>
  )
}
