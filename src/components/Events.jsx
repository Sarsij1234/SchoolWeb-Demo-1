import { events } from '../data/siteData'
import { formatDate, Icon, Reveal, SectionHead } from '../lib/ui'
import { waLink } from '../lib/whatsapp'

export default function Events() {
  return (
    <section className="section" id="events">
      <div className="container">
        <SectionHead eyebrow={events.eyebrow} title={events.title} lead={events.lead} />

        <div className="events">
          {events.items.map((item, i) => {
            const d = formatDate(item.date)
            return (
              <Reveal
                className={`event card card--hover ${item.featured ? 'event--featured' : ''}`}
                key={item.title}
                delay={i * 80}
              >
                <time className="event__date" dateTime={item.date}>
                  <span className="event__day">{d.day}</span>
                  <span className="event__month">{d.month}</span>
                </time>

                <div className="event__body">
                  <div className="event__top">
                    <span className="pill">{item.tag}</span>
                    {item.featured ? <span className="pill pill--accent">Open to all</span> : null}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>

                <a
                  className="event__link"
                  href={waLink(
                    `Hello, I'd like to register for "${item.title}" on ${d.full}. Could you share the details?`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Register for ${item.title} on WhatsApp`}
                >
                  <Icon name="whatsapp" size={18} />
                </a>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
