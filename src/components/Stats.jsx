import { stats } from '../data/siteData'
import { Counter, Reveal } from '../lib/ui'

export default function Stats() {
  return (
    <section className="section section--tight stats-section">
      <div className="container">
        <div className="stats">
          {stats.map((s, i) => (
            <Reveal className="stat" key={s.label} delay={i * 90}>
              <div className="stat__value">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="stat__label">{s.label}</div>
              <div className="stat__note">{s.note}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
