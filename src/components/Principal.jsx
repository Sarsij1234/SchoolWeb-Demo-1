import { principal } from '../data/siteData'
import { Figure, Icon, Reveal } from '../lib/ui'

export default function Principal() {
  return (
    <section className="section section--tight">
      <div className="container">
        <Reveal className="principal card">
          <div className="principal__media">
            <Figure
              src={principal.image}
              seed="principal-portrait"
              alt={principal.name}
              label="Portrait"
              ratio="1 / 1"
            />
          </div>

          <div className="principal__body">
            <span className="principal__quote-mark" aria-hidden="true">
              <Icon name="quote" size={34} />
            </span>
            <p className="eyebrow">
              <span className="eyebrow__dot" aria-hidden="true" />
              {principal.eyebrow}
            </p>
            <blockquote>{principal.quote}</blockquote>
            <footer className="principal__sig">
              <strong>{principal.name}</strong>
              <span>{principal.role}</span>
              <em>{principal.credentials}</em>
            </footer>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
