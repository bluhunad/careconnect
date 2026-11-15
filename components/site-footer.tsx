export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-6 text-sm text-muted-foreground">
        <p>
          <strong className="text-foreground">Medical safety notice:</strong> CareConnect AI provides general
          educational information only. It does not diagnose conditions, recommend treatments, or replace
          advice from a licensed healthcare professional. If you think you are having a medical emergency,
          call 911 or your local emergency number right away.
        </p>
        <p>
          <strong className="text-foreground">Privacy notice:</strong> Please do not enter real names, dates
          of birth, medical record numbers, or other personal health information. Use fictional examples
          when testing. Text sent to EasyExplain and Appointment Prep is processed by an AI model to create
          a response and is not saved by this app. Care Reminders are stored only in this browser.
        </p>
        <p className="text-xs">CareConnect AI — IBM AI Experiential Learning Lab project.</p>
      </div>
    </footer>
  )
}
