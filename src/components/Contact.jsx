import { useState } from 'react'
import { contact, school } from '../data/siteData'
import { Icon, Reveal, SectionHead } from '../lib/ui'
import { composeEnquiry, mailtoLink, waLink } from '../lib/whatsapp'

const EMPTY = { name: '', phone: '', email: '', subject: contact.subjects[0], message: '' }

/* The form has no backend. Instead it composes what the visitor typed into a
   WhatsApp message (or an email) and hands it off — a real, working enquiry
   with nothing to host. See the README to swap in a server endpoint instead. */
export default function Contact() {
  const [form, setForm] = useState(EMPTY)
  const [sent, setSent] = useState(false)

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    window.open(waLink(composeEnquiry(form)), '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <SectionHead eyebrow={contact.eyebrow} title={contact.title} lead={contact.lead} />

        <div className="contact">
          <Reveal className="contact__info">
            <ul className="contact__list">
              <li>
                <span className="contact__icon">
                  <Icon name="pin" size={18} />
                </span>
                <div>
                  <strong>Campus</strong>
                  <p>
                    {school.address.line1}
                    <br />
                    {school.address.line2}
                  </p>
                </div>
              </li>
              <li>
                <span className="contact__icon contact__icon--wa">
                  <Icon name="whatsapp" size={18} />
                </span>
                <div>
                  <strong>WhatsApp</strong>
                  <p>
                    <a
                      href={waLink(school.whatsapp.greeting)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {school.whatsapp.display}
                    </a>
                    <br />
                    <span className="contact__hint">{school.whatsapp.hours}</span>
                  </p>
                </div>
              </li>
              <li>
                <span className="contact__icon">
                  <Icon name="phone" size={18} />
                </span>
                <div>
                  <strong>Admissions office</strong>
                  <p>
                    <a href={`tel:${school.phone.replace(/\s/g, '')}`}>{school.phone}</a>
                  </p>
                </div>
              </li>
              <li>
                <span className="contact__icon">
                  <Icon name="mail" size={18} />
                </span>
                <div>
                  <strong>Email</strong>
                  <p>
                    <a href={`mailto:${school.email}`}>{school.email}</a>
                  </p>
                </div>
              </li>
              <li>
                <span className="contact__icon">
                  <Icon name="clock" size={18} />
                </span>
                <div>
                  <strong>Office hours</strong>
                  <p>{school.hours}</p>
                </div>
              </li>
            </ul>

            <div className="map">
              <div className="map__grid" aria-hidden="true" />
              <span className="map__pin" aria-hidden="true">
                <Icon name="pin" size={18} />
              </span>
              <span className="map__label">Replace with an embedded map</span>
            </div>
          </Reveal>

          <Reveal className="contact__form card" delay={120}>
            {sent ? (
              <div className="form-success" role="status">
                <span className="form-success__icon form-success__icon--wa">
                  <Icon name="whatsapp" size={26} />
                </span>
                <h3>WhatsApp is opening…</h3>
                <p>
                  Your enquiry is pre-typed and ready — just press send in WhatsApp. If the
                  tab didn’t open, use the button below.
                </p>
                <div className="form-success__actions">
                  <a
                    href={waLink(composeEnquiry(form))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--wa btn--sm"
                  >
                    <Icon name="whatsapp" size={17} />
                    Open WhatsApp again
                  </a>
                  <button
                    type="button"
                    className="btn btn--ghost btn--sm"
                    onClick={() => {
                      setForm(EMPTY)
                      setSent(false)
                    }}
                  >
                    New enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="field-row">
                  <label className="field">
                    <span>Your name</span>
                    <input
                      type="text"
                      required
                      placeholder="Ananya Sharma"
                      value={form.name}
                      onChange={update('name')}
                    />
                  </label>
                  <label className="field">
                    <span>Phone</span>
                    <input
                      type="tel"
                      placeholder="+91 98000 00000"
                      value={form.phone}
                      onChange={update('phone')}
                    />
                  </label>
                </div>

                <label className="field">
                  <span>Email</span>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={update('email')}
                  />
                </label>

                <label className="field">
                  <span>I’m writing about</span>
                  <select value={form.subject} onChange={update('subject')}>
                    {contact.subjects.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>Message</span>
                  <textarea
                    rows={4}
                    placeholder="Tell us a little about your child and what you’re looking for."
                    value={form.message}
                    onChange={update('message')}
                  />
                </label>

                <button type="submit" className="btn btn--wa btn--block">
                  <Icon name="whatsapp" size={19} />
                  Send on WhatsApp
                </button>

                <p className="form-note">
                  Opens WhatsApp with your message ready to send — you press send.{' '}
                  <a href={mailtoLink(form)} className="form-note__alt">
                    Prefer email instead?
                  </a>
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
