import { useEffect, useState } from 'react'
import { school, navLinks, erp } from '../data/siteData'
import { Icon } from '../lib/ui'

/* The site is dark by default for everyone, whatever their device is set to.
   A visitor who uses the header toggle has that choice remembered instead.
   Resolved once before first paint, so there is no flash of the wrong theme. */
const DEFAULT_THEME = 'dark'

function initialTheme() {
  try {
    const stored = localStorage.getItem('ev-theme')
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    /* private mode / blocked storage — just use the default */
  }
  return DEFAULT_THEME
}

function useTheme() {
  const [theme, setTheme] = useState(initialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('ev-theme', theme)
    } catch {
      /* not fatal — the theme still applies for this visit */
    }
  }, [theme])

  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))]
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [progress, setProgress] = useState(0)
  const [theme, toggleTheme] = useTheme()

  /* Sticky state + reading progress bar */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const max = document.body.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Highlight the section currently on screen */
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.6] },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  /* Lock the page behind the mobile drawer, and close it on Escape */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <header className={`nav ${scrolled ? 'is-stuck' : ''}`}>
        <div className="nav__progress" style={{ transform: `scaleX(${progress / 100})` }} />
        <div className="container nav__inner">
          <a href="#top" className="brand" onClick={() => setOpen(false)}>
            <span className="brand__mark" aria-hidden="true">
              {school.initials}
            </span>
            <span className="brand__text">
              <strong>{school.shortName}</strong>
              <em>International School</em>
            </span>
          </a>

          <nav className="nav__links" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={active === link.href ? 'is-active' : ''}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <button
              type="button"
              className="icon-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={19} />
            </button>
            <a
              href={erp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost btn--sm nav__portal"
              title={erp.note}
            >
              <Icon name="portal" size={16} />
              {erp.shortLabel}
            </a>
            <a href="#admissions" className="btn btn--primary btn--sm nav__cta">
              Apply now
            </a>
            <button
              type="button"
              className={`burger ${open ? 'is-open' : ''}`}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`drawer ${open ? 'is-open' : ''}`}>
        <nav className="drawer__links" aria-label="Mobile">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ '--i': i }}
            >
              <span>{String(i + 1).padStart(2, '0')}</span>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="drawer__footer">
          <a
            href={erp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="drawer__portal"
            onClick={() => setOpen(false)}
          >
            <span className="drawer__portal-icon">
              <Icon name="portal" size={18} />
            </span>
            <span>
              <strong>{erp.label}</strong>
              <em>{erp.note}</em>
            </span>
            <Icon name="external" size={15} />
          </a>

          <a href="#admissions" className="btn btn--primary btn--block" onClick={() => setOpen(false)}>
            Begin an application
          </a>
          <p>
            {school.phone} · {school.email}
          </p>
        </div>
      </div>
      <button
        type="button"
        className={`drawer__scrim ${open ? 'is-open' : ''}`}
        onClick={() => setOpen(false)}
        tabIndex={-1}
        aria-hidden="true"
      />
    </>
  )
}
