import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

function sanitize(s: string) {
  return s.trim().toLowerCase().replace(/<[^>]*>/g, '')
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { email } = body as Record<string, unknown>

  if (
    typeof email !== 'string' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 254
  ) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const clean = sanitize(email)

  // Supabase
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (url && key) {
    try {
      const supabase = createClient(url, key)
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email: clean, source: 'website' })

      if (error) {
        if (error.code === '23505') {
          return NextResponse.json({ success: true, already: true })
        }
        console.error('[newsletter] db error:', error.message)
        return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
      }
    } catch (err) {
      console.error('[newsletter] supabase:', err)
    }
  }

  // Resend welcome email
  const resendKey = process.env.RESEND_API_KEY
  if (resendKey) {
    try {
      const resend = new Resend(resendKey)
      await resend.emails.send({
        from: 'Zeba Ali <onboarding@resend.dev>',
        to: clean,
        subject: "You're in — zebacodes.com",
        text: "Thanks for subscribing. I write about backend engineering, distributed systems, and building in public after Oracle. Real notes, no noise. — Zeba",
      })
    } catch (err) {
      console.error('[newsletter] resend:', err)
    }
  }

  return NextResponse.json({ success: true })
}
