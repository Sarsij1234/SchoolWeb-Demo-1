import { admissions } from '../data/siteData'
import { Icon, Reveal, SectionHead } from '../lib/ui'

export default function Admissions() {
  return (
    <section className="section" id="admissions">
      <div className="container">
        <SectionHead
          eyebrow={admissions.eyebrow}
          title={admissions.title}
          lead={admissions.lead}
        />

        <div className="admissions">
          <ol className="steps">
            {admissions.steps.map((step, i) => (
              <Reveal as="li" className="step" key={step.n} delay={i * 90}>
                <span className="step__n">{step.n}</span>
                <div className="step__body">
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal className="deadlines card" delay={120}>
            <h3 className="deadlines__title">Key dates</h3>
            <dl>
              {admissions.deadlines.map((d) => (
                <div className="deadlines__row" key={d.label}>
                  <dt>{d.label}</dt>
                  <dd>{d.value}</dd>
                </div>
              ))}
            </dl>

            <p className="deadlines__note">
              <span className="tick" aria-hidden="true">
                <Icon name="check" size={13} />
              </span>
              {admissions.note}
            </p>

            <a href="#contact" className="btn btn--primary btn--block">
              Start your enquiry
              <Icon name="arrow" size={18} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
