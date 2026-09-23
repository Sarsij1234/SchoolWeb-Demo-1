import { useEffect, useState } from 'react'
import { testimonials } from '../data/siteData'
import { Icon, Reveal, SectionHead } from '../lib/ui'

const INTERVAL = 7000

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = testimonials.items.length

  useEffect(() => {
    if (paused || count < 2) return
    const id = setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL)
    return () => clearInterval(id)
  }, [paused, count])

  return (
    <section className="section testimonials-section">
      <div className="container">
        <SectionHead eyebrow={testimonials.eyebrow} title={testimonials.title} align="center" />

        <div
          className="quotes"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <Reveal className="quotes__stage card">
            <span className="quotes__mark" aria-hidden="true">
              <Icon name="quote" size={40} />
            </span>

            {testimonials.items.map((t, i) => (
              <figure
                key={t.name}
                className={`quote ${i === index ? 'is-active' : ''}`}
                aria-hidden={i !== index}
              >
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </Reveal>

          <div className="quotes__dots" role="tablist" aria-label="Testimonials">
            {testimonials.items.map((t, i) => (
              <button
                key={t.name}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Testimonial ${i + 1}: ${t.name}`}
                className={`quotes__dot ${i === index ? 'is-active' : ''}`}
                onClick={() => setIndex(i)}
              >
                <span
                  className="quotes__dot-fill"
                  style={{ animationDuration: `${INTERVAL}ms`, animationPlayState: paused ? 'paused' : 'running' }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
