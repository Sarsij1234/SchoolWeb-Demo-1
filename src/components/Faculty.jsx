import { faculty } from '../data/siteData'
import { Figure, Reveal, SectionHead } from '../lib/ui'

export default function Faculty() {
  return (
    <section className="section" id="faculty">
      <div className="container">
        <SectionHead eyebrow={faculty.eyebrow} title={faculty.title} lead={faculty.lead} />

        <div className="faculty">
          {faculty.members.map((m, i) => (
            <Reveal className="teacher" key={m.name} delay={(i % 3) * 90}>
              <Figure
                src={m.image}
                seed={m.name}
                alt={m.name}
                label="Portrait"
                ratio="3 / 4"
                className="teacher__figure"
              />
              <div className="teacher__body">
                <h3>{m.name}</h3>
                <p className="teacher__role">{m.role}</p>
                <p className="teacher__detail">{m.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
