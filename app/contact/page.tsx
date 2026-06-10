'use client'

import { useState } from 'react'

type Form = { name: string; email: string; subject: string; message: string }
type Status = 'idle' | 'loading' | 'success' | 'error'

const subjects = [
  'Job Opportunity',
  'Project Collaboration',
  'Technical Discussion',
  'Oracle / Database Consulting',
  'General Inquiry',
]

const inputCls =
  'w-full rounded-md px-4 py-3 text-sm outline-none transition-colors'

const fieldStyle = {
  background: 'rgba(240,235,224,0.045)',
  border: '1px solid rgba(240,235,224,0.11)',
  color: '#f5f1e8',
} as const

const openTo = [
  'Backend engineering roles',
  'Java / Spring Boot systems',
  'Database-heavy infrastructure',
  'Distributed systems and observability',
]

export default function ContactPage() {
  const [form, setForm]     = useState<Form>({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Partial<Form>>({})

  function validate() {
    const e: Partial<Form> = {}
    if (form.name.trim().length < 2) e.name = 'At least 2 characters'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.subject) e.subject = 'Select a subject'
    if (form.message.trim().length < 10) e.message = 'At least 10 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
    if (errors[name as keyof Form]) setErrors((p) => ({ ...p, [name]: undefined }))
  }

  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 h-[360px] pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(200,240,0,0.05), transparent 72%), radial-gradient(circle at 80% 12%, rgba(103,232,249,0.075), transparent 32%)',
        }}
        aria-hidden
      />

      <div className="relative max-w-[1120px] mx-auto px-6 sm:px-12 py-16 sm:py-20">
        <header className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-16 mb-12 sm:mb-16 items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-5" style={{ color: 'rgba(200,240,0,0.72)' }}>
              Contact
            </p>
            <h1 className="font-display text-[52px] sm:text-[72px] font-black tracking-tight leading-none" style={{ color: '#f5f1e8' }}>
              Let&apos;s build something difficult.
            </h1>
          </div>
          <p className="text-[16px] sm:text-[18px] leading-[1.75] font-light" style={{ color: 'rgba(240,235,224,0.68)' }}>
            I&apos;m open to backend engineering roles and technical collaborations where depth matters:
            database behavior, Java systems, production debugging, and infrastructure that has to hold.
          </p>
        </header>

        <div className="grid lg:grid-cols-[360px_1fr] gap-6 lg:gap-8">
          <aside className="rounded-lg border p-6 sm:p-7 h-fit" style={{ borderColor: 'rgba(240,235,224,0.09)', background: 'rgba(240,235,224,0.03)' }}>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] mb-5" style={{ color: 'rgba(240,235,224,0.36)' }}>
              Open to
            </p>
            <ul className="space-y-3 mb-8">
              {openTo.map((item) => (
                <li key={item} className="flex gap-3 text-[14px]" style={{ color: 'rgba(240,235,224,0.72)' }}>
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#c8f000] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="border-t pt-6 space-y-4" style={{ borderColor: 'rgba(240,235,224,0.08)' }}>
              <a href="mailto:zebaali1415@gmail.com" className="block text-[14px] transition-colors hover:text-[#c8f000]" style={{ color: 'rgba(240,235,224,0.72)' }}>
                zebaali1415@gmail.com
              </a>
              <a href="https://github.com/zebacodes" target="_blank" rel="noopener noreferrer" className="block text-[14px] transition-colors hover:text-[#c8f000]" style={{ color: 'rgba(240,235,224,0.72)' }}>
                github.com/zebacodes ↗
              </a>
              <a href="https://linkedin.com/in/zeba-ali" target="_blank" rel="noopener noreferrer" className="block text-[14px] transition-colors hover:text-[#c8f000]" style={{ color: 'rgba(240,235,224,0.72)' }}>
                LinkedIn ↗
              </a>
            </div>
          </aside>

          <section className="rounded-lg border p-6 sm:p-7" style={{ borderColor: 'rgba(240,235,224,0.09)', background: 'linear-gradient(180deg, rgba(240,235,224,0.045), rgba(240,235,224,0.018))' }}>
            {status === 'success' ? (
              <div className="min-h-[420px] flex flex-col justify-center text-center">
                <p className="font-display text-[32px] font-bold mb-3" style={{ color: '#f5f1e8' }}>
                  Message sent.
                </p>
                <p className="text-[15px] mb-7" style={{ color: 'rgba(240,235,224,0.6)' }}>
                  I&apos;ll get back to you soon.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mx-auto rounded-md px-5 py-2.5 text-[13px] font-medium"
                  style={{ background: '#f5f1e8', color: '#0a0a0a' }}
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-[0.16em] mb-2" style={{ color: 'rgba(240,235,224,0.4)' }}>
                      Name
                    </label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" className={inputCls} style={fieldStyle} />
                    {errors.name && <p className="font-mono text-xs text-[#c8f000] mt-1.5">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-[0.16em] mb-2" style={{ color: 'rgba(240,235,224,0.4)' }}>
                      Email
                    </label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@company.com" className={inputCls} style={fieldStyle} />
                    {errors.email && <p className="font-mono text-xs text-[#c8f000] mt-1.5">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.16em] mb-2" style={{ color: 'rgba(240,235,224,0.4)' }}>
                    Subject
                  </label>
                  <select name="subject" value={form.subject} onChange={handleChange} className={`${inputCls} cursor-pointer`} style={{ ...fieldStyle, colorScheme: 'dark' }}>
                    <option value="" style={{ background: '#141414' }}>Select...</option>
                    {subjects.map((s) => <option key={s} value={s} style={{ background: '#141414' }}>{s}</option>)}
                  </select>
                  {errors.subject && <p className="font-mono text-xs text-[#c8f000] mt-1.5">{errors.subject}</p>}
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.16em] mb-2" style={{ color: 'rgba(240,235,224,0.4)' }}>
                    Message
                  </label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="What are you building, hiring for, or thinking through?" rows={8} className={`${inputCls} resize-none`} style={fieldStyle} />
                  {errors.message && <p className="font-mono text-xs text-[#c8f000] mt-1.5">{errors.message}</p>}
                </div>

                {status === 'error' && (
                  <p className="font-mono text-xs text-[#c8f000]">Something went wrong. Try again or email directly.</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full rounded-md px-4 py-3 text-sm font-semibold transition-opacity disabled:opacity-60"
                  style={{ background: '#f5f1e8', color: '#0a0a0a' }}
                >
                  {status === 'loading' ? 'Sending...' : 'Send message'}
                </button>
              </form>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
