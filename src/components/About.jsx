import { about } from '../data/siteData'
import { Figure, Icon, Reveal, SectionHead } from '../lib/ui'

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container about">
        <SectionHead eyebrow={about.eyebrow} title={about.title} lead={about.lead} />

        <div className="about__grid">
          <Reveal className="about__media">
            <Figure
              src={about.image}
              seed="about-classroom"
              alt="Students working together in a classroom"
              label="Classroom photograph"
              ratio="4 / 5"
            />
            <div className="about__badge">
              <strong>24</strong>
              <span>students per class, capped</span>
            </div>
          </Reveal>

          <ul className="pillars">
            {about.pillars.map((p, i) => (
              <Reveal as="li" className="card card--hover card--lit pillar" key={p.title} delay={i * 90}>
                <span className="pillar__icon">
                  <Icon name={p.icon} size={21} />
                </span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
