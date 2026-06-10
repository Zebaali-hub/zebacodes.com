import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmail({
  name,
  email,
  subject,
  message,
}: {
  name: string
  email: string
  subject: string
  message: string
}) {
  return resend.emails.send({
    from: 'Portfolio Contact <onboarding@resend.dev>',
    to: 'zebaali1415@gmail.com',
    replyTo: email,
    subject: `[Portfolio] ${subject} — from ${name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0A0F1E; color: #E2E8F0; padding: 32px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
        <h2 style="color: #00D4FF; margin-top: 0;">New Contact Message</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #9CA3AF; width: 80px;">Name</td>
            <td style="padding: 8px 0; color: #E2E8F0;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #9CA3AF;">Email</td>
            <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2E75B6;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #9CA3AF;">Subject</td>
            <td style="padding: 8px 0; color: #E2E8F0;">${subject}</td>
          </tr>
        </table>
        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 20px 0;" />
        <p style="color: #9CA3AF; margin-bottom: 8px;">Message:</p>
        <p style="color: #E2E8F0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
      </div>
    `,
  })
}
