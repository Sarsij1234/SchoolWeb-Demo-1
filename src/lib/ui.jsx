/* Shared UI primitives: scroll reveal, animated counters, image placeholders,
   section headings and the small inline icon set. */
import { useEffect, useRef, useState } from 'react'

/* --------------------------------------------------------------- in-view --- */
export function useInView({ threshold = 0.18, rootMargin = '0px 0px -60px 0px' } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            io.unobserve(entry.target)
          }
        }
      },
      { threshold, rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, rootMargin])

  return [ref, inView]
}

/* Fades + lifts its children into view on scroll. */
export function Reveal({ children, delay = 0, className = '', as: Tag = 'div', ...rest }) {
  const [ref, inView] = useInView()
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-in' : ''} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* ---------------------------------------------------------------- counter --- */
export function Counter({ to, suffix = '', prefix = '', duration = 1600 }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const reduced =
      typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setValue(to)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
      setValue(Math.round(to * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration])

  return (
    <span ref={ref} className="counter">
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  )
}

/* ----------------------------------------------------------------- figure --- */
/* Renders a photo when `src` is given, otherwise a deterministic gradient
   placeholder derived from `seed` — so the demo looks designed, not broken. */
function hueFromSeed(seed = '') {
  let h = 0
  for (let i = 0; i < seed.length; i += 1) h = (h * 31 + seed.charCodeAt(i)) % 360
  return h
}

export function Figure({
  src,
  alt = '',
  seed = '',
  label,
  ratio,
  className = '',
  priority = false, // set on above-the-fold images so they aren't lazy-loaded
  children,
}) {
  const hue = hueFromSeed(seed || alt || label || 'evergreen')
  const style = ratio ? { aspectRatio: ratio } : undefined

  if (src) {
    return (
      <div className={`figure ${className}`.trim()} style={style}>
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding={priority ? 'sync' : 'async'}
        />
        {children}
      </div>
    )
  }

  return (
    <div
      className={`figure figure--placeholder ${className}`.trim()}
      style={{ ...style, '--fig-hue': hue }}
      role="img"
      aria-label={alt || label || 'Photograph placeholder'}
    >
      <span className="figure__mark" aria-hidden="true">
        <Icon name="image" />
      </span>
      {label ? <span className="figure__label">{label}</span> : null}
      {children}
    </div>
  )
}

/* ----------------------------------------------------------------- header --- */
export function SectionHead({ eyebrow, title, lead, align = 'left', id }) {
  return (
    <header className={`section-head section-head--${align}`}>
      {eyebrow ? (
        <Reveal as="p" className="eyebrow">
          <span className="eyebrow__dot" aria-hidden="true" />
          {eyebrow}
        </Reveal>
      ) : null}
      <Reveal as="h2" className="section-title" delay={60} id={id}>
        {title}
      </Reveal>
      {lead ? (
        <Reveal as="p" className="section-lead" delay={120}>
          {lead}
        </Reveal>
      ) : null}
    </header>
  )
}

/* ------------------------------------------------------------------ icons --- */
const PATHS = {
  compass: 'M12 2a10 10 0 100 20 10 10 0 000-20zm3.6 6.4l-2.2 5-5 2.2 2.2-5 5-2.2z',
  users:
    'M16 11a4 4 0 10-4-4 4 4 0 004 4zm-8 1a3 3 0 10-3-3 3 3 0 003 3zm8 2c-3 0-7 1.5-7 4.5V21h14v-2.5c0-3-4-4.5-7-4.5zM7 14c-2.3 0-5 1.2-5 3.5V21h5v-2.5a5.6 5.6 0 011.6-3.8A7.8 7.8 0 007 14z',
  palette:
    'M12 3a9 9 0 000 18 2.2 2.2 0 001.7-3.6 2.2 2.2 0 011.7-3.6H17a4 4 0 004-4c0-3.9-4-6.8-9-6.8zM7 12a1.5 1.5 0 111.5-1.5A1.5 1.5 0 017 12zm3-4a1.5 1.5 0 111.5-1.5A1.5 1.5 0 0110 8zm5 0a1.5 1.5 0 111.5-1.5A1.5 1.5 0 0115 8z',
  globe:
    'M12 2a10 10 0 100 20 10 10 0 000-20zm6.9 9h-3a15.6 15.6 0 00-1.2-5.4A8 8 0 0118.9 11zM12 4c.8 1 1.6 3.2 1.8 7h-3.6C10.4 7.2 11.2 5 12 4zM5.1 11a8 8 0 014.2-5.4A15.6 15.6 0 008.1 11zm0 2h3a15.6 15.6 0 001.2 5.4A8 8 0 015.1 13zM12 20c-.8-1-1.6-3.2-1.8-7h3.6c-.2 3.8-1 6-1.8 7zm2.7-1.6a15.6 15.6 0 001.2-5.4h3a8 8 0 01-4.2 5.4z',
  image:
    'M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2zm0 12h14v-2.6l-3.6-3.6-3.3 3.3-2.4-2.3L5 16zm3-6.6a1.8 1.8 0 10-1.8-1.8A1.8 1.8 0 008 10.4z',
  arrow: 'M13.2 5.2l6 6a1.1 1.1 0 010 1.6l-6 6-1.6-1.6 4.1-4.1H4.5v-2.2h11.2l-4.1-4.1z',
  check: 'M9.6 16.2L5.4 12l-1.5 1.5 5.7 5.7L20.1 8.7l-1.5-1.5z',
  sun: 'M12 17a5 5 0 115-5 5 5 0 01-5 5zm0-13.5a1.1 1.1 0 011.1 1.1v1.6a1.1 1.1 0 01-2.2 0V4.6A1.1 1.1 0 0112 3.5zm0 14.2a1.1 1.1 0 011.1 1.1v1.6a1.1 1.1 0 01-2.2 0v-1.6a1.1 1.1 0 011.1-1.1zM3.5 12a1.1 1.1 0 011.1-1.1h1.6a1.1 1.1 0 010 2.2H4.6A1.1 1.1 0 013.5 12zm14.2 0a1.1 1.1 0 011.1-1.1h1.6a1.1 1.1 0 010 2.2h-1.6a1.1 1.1 0 01-1.1-1.1zM5.6 5.6a1.1 1.1 0 011.6 0l1.1 1.1a1.1 1.1 0 01-1.6 1.6L5.6 7.2a1.1 1.1 0 010-1.6zm10.1 10.1a1.1 1.1 0 011.6 0l1.1 1.1a1.1 1.1 0 01-1.6 1.6l-1.1-1.1a1.1 1.1 0 010-1.6zm2.7-10.1a1.1 1.1 0 010 1.6l-1.1 1.1a1.1 1.1 0 01-1.6-1.6l1.1-1.1a1.1 1.1 0 011.6 0zM8.3 15.7a1.1 1.1 0 010 1.6l-1.1 1.1a1.1 1.1 0 01-1.6-1.6l1.1-1.1a1.1 1.1 0 011.6 0z',
  moon: 'M21 13.2A9 9 0 1110.8 3a7.2 7.2 0 1010.2 10.2z',
  mail: 'M4 5h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2zm8 7.1L4.6 7.4 4 7.9l8 5.1 8-5.1-.6-.5z',
  phone:
    'M6.6 3h3l1.6 4-2 1.5a12 12 0 006.3 6.3l1.5-2 4 1.6v3a2 2 0 01-2.2 2A17.6 17.6 0 014.6 5.2 2 2 0 016.6 3z',
  pin: 'M12 2a7 7 0 00-7 7c0 5.1 7 13 7 13s7-7.9 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1114.5 9 2.5 2.5 0 0112 11.5z',
  clock: 'M12 2a10 10 0 100 20 10 10 0 000-20zm1.1 10.4l3.5 2.1-1.1 1.8-4.6-2.8V6h2.2z',
  quote:
    'M9.6 6.2C6.6 7.5 4.8 10 4.8 13.1a4.6 4.6 0 004.6 4.7 3.9 3.9 0 004-3.9 3.8 3.8 0 00-3.8-3.9h-.5c.3-1.3 1.4-2.4 3-3.1zm9.6 0c-3 1.3-4.8 3.8-4.8 6.9a4.6 4.6 0 004.6 4.7 3.9 3.9 0 004-3.9 3.8 3.8 0 00-3.8-3.9h-.5c.3-1.3 1.4-2.4 3-3.1z',
  close: 'M18.3 5.7L12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3z',
  chevron: 'M8.6 5.6L15 12l-6.4 6.4L7 16.8 11.8 12 7 7.2z',
  portal:
    'M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm8-2h8v8h-8v-8zm2 2v4h4v-4h-4z',
  external:
    'M14 3h7v7h-2.2V6.8l-7.5 7.5-1.6-1.6L17.2 5.2H14V3zM5 5h5v2.2H7.2v9.6h9.6V14H19v5a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z',
  instagram:
    'M12 7.4a4.6 4.6 0 104.6 4.6A4.6 4.6 0 0012 7.4zm0 7.6a3 3 0 113-3 3 3 0 01-3 3zM16.8 2H7.2A5.2 5.2 0 002 7.2v9.6A5.2 5.2 0 007.2 22h9.6a5.2 5.2 0 005.2-5.2V7.2A5.2 5.2 0 0016.8 2zm3.6 14.8a3.6 3.6 0 01-3.6 3.6H7.2a3.6 3.6 0 01-3.6-3.6V7.2a3.6 3.6 0 013.6-3.6h9.6a3.6 3.6 0 013.6 3.6zm-3.2-9.7a1.1 1.1 0 11-1.1-1.1 1.1 1.1 0 011.1 1.1z',
  youtube:
    'M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 002.4 7.2 26 26 0 002 12a26 26 0 00.4 4.8 2.5 2.5 0 001.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 001.8-1.8A26 26 0 0022 12a26 26 0 00-.4-4.8zM10 15V9l5.2 3z',
  linkedin:
    'M6.9 8.6H3.4V21h3.5zM5.2 3a2 2 0 102 2 2 2 0 00-2-2zm7.9 5.4H9.7V21h3.4v-6.5c0-1.7.3-3.4 2.4-3.4s2.1 1.9 2.1 3.5V21H21v-7c0-3.4-.7-6-4.7-6a4.1 4.1 0 00-3.7 2h-.1z',
  facebook:
    'M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.1A19 19 0 0014.6 2C12 2 10.2 3.6 10.2 6.5v2H7.4V12h2.8v10h3.6V12h2.8l.4-3.5z',
  whatsapp:
    'M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5 0-.2 0-.4-.1-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3c-.9-1.4-1.3-3-1.3-4.6 0-4.6 3.8-8.4 8.4-8.4s8.4 3.8 8.4 8.4-3.7 8.5-8.3 8.5z',
}

export function Icon({ name, size = 22, className = '' }) {
  const d = PATHS[name]
  if (!d) return null
  return (
    <svg
      className={`icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} />
    </svg>
  )
}

/* ------------------------------------------------------------------ dates --- */
export function formatDate(iso) {
  const d = new Date(`${iso}T00:00:00`)
  return {
    day: d.toLocaleDateString('en-GB', { day: '2-digit' }),
    month: d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase(),
    year: d.getFullYear(),
    full: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
  }
}
