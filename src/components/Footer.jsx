import { erp, footer, school } from '../data/siteData'
import { Icon } from '../lib/ui'
import { waLink } from '../lib/whatsapp'

/* Any link that leaves the site opens in a new tab, safely. */
const isExternal = (href) => /^https?:\/\//.test(href)

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__cta">
          <div>
            <h2>Still deciding?</h2>
            <p>
              Spend an hour on campus. It answers more questions than any brochure we could
              write.
            </p>
          </div>
          <a href="#contact" className="btn btn--primary">
            Book a visit
            <Icon name="arrow" size={18} />
          </a>
        </div>

        <a
          className="portal-bar"
          href={erp.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="portal-bar__icon">
            <Icon name="portal" size={22} />
          </span>
          <span className="portal-bar__text">
            <strong>Already part of the school? Open the {erp.label}</strong>
            <em>{erp.note}</em>
          </span>
          <span className="portal-bar__go">
            Sign in
            <Icon name="external" size={15} />
          </span>
        </a>

        <div className="footer__grid">
          <div className="footer__brand">
            <a href="#top" className="brand">
              <span className="brand__mark" aria-hidden="true">
                {school.initials}
              </span>
              <span className="brand__text">
                <strong>{school.shortName}</strong>
                <em>International School</em>
              </span>
            </a>
            <p>{footer.blurb}</p>
            <ul className="socials">
              {school.social.map((s) => {
                const isWa = s.href === 'whatsapp'
                return (
                  <li key={s.label}>
                    <a
                      href={isWa ? waLink(school.whatsapp.greeting) : s.href}
                      aria-label={s.label}
                      className={isWa ? 'is-whatsapp' : undefined}
                      {...(isWa ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      <Icon name={s.icon} size={17} />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {footer.columns.map((col) => (
            <nav className="footer__col" key={col.title} aria-label={col.title}>
              <h3>{col.title}</h3>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(isExternal(l.href)
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      {l.label}
                      {isExternal(l.href) ? (
                        <Icon name="external" size={12} className="link-out" />
                      ) : null}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="footer__bar">
          <p>
            © {new Date().getFullYear()} {school.name}. {school.affiliation}.
          </p>
          <ul className="footer__legal">
            {footer.legal.map((l) => (
              <li key={l}>
                <a href="#top">{l}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
