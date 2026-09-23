/* WhatsApp enquiry helpers.
 *
 * wa.me links open the WhatsApp app on phones and web.whatsapp.com on desktop,
 * with the message pre-typed. The visitor still has to press send, so nothing
 * is sent without them choosing to — and no backend is involved. */

import { school } from '../data/siteData'

/** Strip everything that isn't a digit — wa.me wants a bare country code + number. */
export function normalise(number) {
  return String(number ?? '').replace(/\D/g, '')
}

/** Build a wa.me link with a pre-filled message. */
export function waLink(message, number = school.whatsapp.number) {
  const digits = normalise(number)
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${digits}${text}`
}

/** Compose the multi-line message sent from the contact form. */
export function composeEnquiry({ name, phone, email, subject, message }) {
  const lines = [
    `Hello ${school.shortName}, I'd like to make an enquiry.`,
    '',
    `Name: ${name || '—'}`,
  ]
  if (phone) lines.push(`Phone: ${phone}`)
  if (email) lines.push(`Email: ${email}`)
  if (subject) lines.push(`Regarding: ${subject}`)
  if (message) lines.push('', message.trim())
  return lines.join('\n')
}

/** mailto: fallback for visitors who would rather not use WhatsApp. */
export function mailtoLink({ name, phone, email, subject, message }) {
  const body = [
    `Name: ${name || '—'}`,
    phone ? `Phone: ${phone}` : null,
    email ? `Email: ${email}` : null,
    '',
    message || '',
  ]
    .filter((l) => l !== null)
    .join('\n')

  const params = new URLSearchParams({
    subject: subject || 'Website enquiry',
    body,
  })
  return `mailto:${school.email}?${params.toString()}`
}
