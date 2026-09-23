import { useState } from 'react'
import { academics } from '../data/siteData'
import { Figure, Icon, Reveal, SectionHead } from '../lib/ui'

export default function Academics() {
  const [activeId, setActiveId] = useState(academics.stages[0].id)
  const stage = academics.stages.find((s) => s.id === activeId)

  return (
    <section className="section" id="academics">
      <div className="container">
        <SectionHead
          eyebrow={academics.eyebrow}
          title={academics.title}
          lead={academics.lead}
          align="center"
        />

        <Reveal className="tabs" role="tablist" aria-label="Academic stages">
          {academics.stages.map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              id={`tab-${s.id}`}
              aria-selected={s.id === activeId}
              aria-controls={`panel-${s.id}`}
              className={`tab ${s.id === activeId ? 'is-active' : ''}`}
              onClick={() => setActiveId(s.id)}
            >
              <span className="tab__name">{s.name}</span>
              <span className="tab__grades">{s.grades}</span>
            </button>
          ))}
        </Reveal>

        <div
          className="stage card"
          role="tabpanel"
          id={`panel-${stage.id}`}
          aria-labelledby={`tab-${stage.id}`}
          key={stage.id}
        >
          <div className="stage__media">
            <Figure
              src={stage.image}
              seed={`stage-${stage.id}`}
              alt={`${stage.name} at school`}
              label={stage.name}
              ratio="4 / 3"
            />
          </div>

          <div className="stage__body">
            <div className="stage__meta">
              <span className="pill pill--accent">{stage.grades}</span>
              <span className="pill">{stage.ages}</span>
            </div>
            <h3>{stage.headline}</h3>
            <p className="stage__text">{stage.text}</p>
            <ul className="stage__points">
              {stage.points.map((point) => (
                <li key={point}>
                  <span className="tick" aria-hidden="true">
                    <Icon name="check" size={13} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <a href="#admissions" className="link-arrow">
              Admissions for {stage.name}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
