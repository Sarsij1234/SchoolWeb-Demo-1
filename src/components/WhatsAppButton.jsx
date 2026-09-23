import { useEffect, useState } from 'react'
import { school } from '../data/siteData'
import { Icon } from '../lib/ui'
import { waLink } from '../lib/whatsapp'

/* Floating enquiry button, pinned bottom-right on every screen.
   Appears once the visitor has scrolled past the hero so it doesn't
   compete with the hero's own call to action. */
export default function WhatsAppButton() {
  const [shown, setShown] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const { whatsapp } = school

  return (
    <div className={`wa-fab ${shown && !dismissed ? 'is-shown' : ''}`}>
      <a
        href={waLink(whatsapp.greeting)}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-fab__link"
        aria-label={whatsapp.label}
      >
        <span className="wa-fab__icon">
          <Icon name="whatsapp" size={26} />
        </span>
        <span className="wa-fab__text">
          <strong>{whatsapp.label}</strong>
          <em>{whatsapp.hours}</em>
        </span>
      </a>

      <button
        type="button"
        className="wa-fab__close"
        onClick={() => setDismissed(true)}
        aria-label="Hide the WhatsApp button"
      >
        <Icon name="close" size={12} />
      </button>
    </div>
  )
}
