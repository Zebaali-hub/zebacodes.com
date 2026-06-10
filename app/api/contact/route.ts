import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const ALLOWED_SUBJECTS = [
  'Job Opportunity',
  'Project Collaboration',
  'Technical Discussion',
  'Oracle / Database Consulting',
  'General Inquiry',
]

function sanitize(str: string): string {
  return str.replace(/<[^>]*>/g, '').trim()
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { name, email, subject, message } = body as Record<string, unknown>

  // Validate inputs
  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof subject !== 'string' ||
    typeof message !== 'string'
  ) {
    return NextResponse.json({ error: 'Invalid fields' }, { status: 400 })
  }

  const cleanName = sanitize(name)
  const cleanEmail = sanitize(email)
  const cleanSubject = sanitize(subject)
  const cleanMessage = sanitize(message)

  if (cleanName.length < 2 || cleanName.length > 100) {
    return NextResponse.json({ error: 'Invalid name' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) || cleanEmail.length > 254) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }
  if (!ALLOWED_SUBJECTS.includes(cleanSubject)) {
    return NextResponse.json({ error: 'Invalid subject' }, { status: 400 })
  }
  if (cleanMessage.length < 10 || cleanMessage.length > 5000) {
    return NextResponse.json({ error: 'Invalid message length' }, { status: 400 })
  }

  // Save to Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey)
      const { error: dbError } = await supabase.from('contact_submissions').insert({
        name: cleanName,
        email: cleanEmail,
        subject: cleanSubject,
        message: cleanMessage,
      })
      if (dbError) {
        console.error('[contact] Supabase insert error:', dbError.message)
      }
    } catch (err) {
      console.error('[contact] Supabase error:', err)
    }
  }

  // Send email via Resend
  const resendKey = process.env.RESEND_API_KEY
  if (resendKey) {
    try {
      const resend = new Resend(resendKey)
      await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: 'zebaali1415@gmail.com',
        replyTo: cleanEmail,
        subject: `[Portfolio] ${cleanSubject} — from ${cleanName}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; background: #0A0F1E; color: #E2E8F0; padding: 36px 32px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08);">
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:24px;">
              <div style="width:36px; height:36px; border-radius:10px; background:linear-gradient(135deg,#2E75B6,#00D4FF); display:flex; align-items:center; justify-content:center; font-weight:700; font-size:13px; color:#fff;">ZA</div>
              <span style="color:#9CA3AF; font-size:13px;">New contact message</span>
            </div>
            <h1 style="color:#00D4FF; font-size:20px; font-weight:700; margin:0 0 20px;">${cleanSubject}</h1>
            <table style="width:100%; border-collapse:collapse; margin-bottom:24px;">
              <tr>
                <td style="padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.06); color:#6B7280; font-size:12px; width:70px; vertical-align:top;">NAME</td>
                <td style="padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.06); color:#E2E8F0; font-size:14px;">${cleanName}</td>
              </tr>
              <tr>
                <td style="padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.06); color:#6B7280; font-size:12px; vertical-align:top;">EMAIL</td>
                <td style="padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.06);">
                  <a href="mailto:${cleanEmail}" style="color:#2E75B6; font-size:14px; text-decoration:none;">${cleanEmail}</a>
                </td>
              </tr>
            </table>
            <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); border-radius:10px; padding:20px;">
              <p style="color:#9CA3AF; font-size:11px; text-transform:uppercase; letter-spacing:0.08em; margin:0 0 12px;">Message</p>
              <p style="color:#E2E8F0; font-size:14px; line-height:1.7; margin:0; white-space:pre-wrap;">${cleanMessage}</p>
            </div>
            <p style="color:#4B5563; font-size:11px; margin-top:24px; margin-bottom:0;">Sent from zebacodes.com portfolio contact form</p>
          </div>
        `,
      })
    } catch (err) {
      console.error('[contact] Resend error:', err)
    }
  }

  return NextResponse.json({ success: true })
}
