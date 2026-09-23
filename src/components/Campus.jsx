import { campus } from '../data/siteData'
import { Figure, Reveal, SectionHead } from '../lib/ui'

export default function Campus() {
  return (
    <section className="section" id="campus">
      <div className="container">
        <SectionHead eyebrow={campus.eyebrow} title={campus.title} lead={campus.lead} />

        <div className="bento">
          {campus.facilities.map((f, i) => (
            <Reveal
              className={`bento__cell bento__cell--${f.size} card card--hover card--lit`}
              key={f.title}
              delay={(i % 3) * 90}
            >
              <Figure
                src={f.image}
                seed={f.title}
                alt={f.title}
                label={f.title}
                className="bento__figure"
              />
              <div className="bento__body">
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
