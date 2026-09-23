import { hero, school, ribbon } from '../data/siteData'
import { Figure, Icon, Reveal } from '../lib/ui'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <div className="hero__copy">
          <Reveal as="p" className="pill pill--accent hero__badge">
            <span className="ping" aria-hidden="true" />
            {hero.badge}
          </Reveal>

          <h1 className="hero__title">
            {hero.titleLines.map((line, i) => (
              <Reveal as="span" className="hero__line" key={line} delay={90 + i * 90}>
                {line}
              </Reveal>
            ))}
            <Reveal as="span" className="hero__line" delay={90 + hero.titleLines.length * 90}>
              <span className="gradient-text">{hero.titleAccent}</span>
            </Reveal>
          </h1>

          <Reveal as="p" className="hero__lead" delay={420}>
            {hero.lead}
          </Reveal>

          <Reveal className="hero__actions" delay={520}>
            <a href={hero.primaryCta.href} className="btn btn--primary">
              {hero.primaryCta.label}
              <Icon name="arrow" size={18} />
            </a>
            <a href={hero.secondaryCta.href} className="btn btn--ghost">
              {hero.secondaryCta.label}
            </a>
          </Reveal>

          <Reveal className="hero__highlights" delay={620}>
            {hero.highlights.map((h) => (
              <div className="hero__highlight" key={h.label}>
                <strong>{h.value}</strong>
                <span>{h.label}</span>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal className="hero__visual" delay={300}>
          <Figure
            src={hero.image}
            seed="hero-campus"
            alt={`Students on the ${school.shortName} campus`}
            label="Campus photograph"
            className="hero__figure"
            priority
          />

          {/* Floating glass cards over the artwork */}
          <div className="float-card float-card--a">
            <span className="float-card__icon">
              <Icon name="check" size={16} />
            </span>
            <div>
              <strong>Est. {school.established}</strong>
              <em>{school.affiliation}</em>
            </div>
          </div>

          <div className="float-card float-card--b">
            <div className="avatars" aria-hidden="true">
              <i style={{ '--h': 250 }} />
              <i style={{ '--h': 186 }} />
              <i style={{ '--h': 38 }} />
              <i style={{ '--h': 310 }} />
            </div>
            <div>
              <strong>19 nationalities</strong>
              <em>One community</em>
            </div>
          </div>
        </Reveal>
      </div>

      <a className="scroll-cue" href="#about" aria-label="Scroll to content">
        <span className="scroll-cue__line" aria-hidden="true" />
        Scroll
      </a>

      {/* Accreditation marquee */}
      <div className="ribbon" aria-label="Accreditations and recognitions">
        <div className="ribbon__track">
          {[...ribbon, ...ribbon].map((item, i) => (
            <span className="ribbon__item" key={`${item}-${i}`} aria-hidden={i >= ribbon.length}>
              {item}
              <i aria-hidden="true">✦</i>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
