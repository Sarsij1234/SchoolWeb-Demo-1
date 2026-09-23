import { useEffect, useState } from 'react'
import { gallery } from '../data/siteData'
import { Figure, Icon, Reveal, SectionHead } from '../lib/ui'

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState(null)
  const isOpen = openIndex !== null

  /* Keyboard control for the lightbox */
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenIndex(null)
      if (e.key === 'ArrowRight') setOpenIndex((i) => (i + 1) % gallery.items.length)
      if (e.key === 'ArrowLeft')
        setOpenIndex((i) => (i - 1 + gallery.items.length) % gallery.items.length)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen])

  const current = isOpen ? gallery.items[openIndex] : null

  return (
    <section className="section" id="gallery">
      <div className="container">
        <SectionHead
          eyebrow={gallery.eyebrow}
          title={gallery.title}
          lead={gallery.lead}
          align="center"
        />

        <div className="gallery">
          {gallery.items.map((item, i) => (
            <Reveal className="gallery__item" key={item.caption} delay={(i % 4) * 70}>
              <button type="button" onClick={() => setOpenIndex(i)}>
                <Figure
                  src={item.image}
                  seed={item.caption}
                  alt={item.caption}
                  label={item.tag}
                  className="gallery__figure"
                />
                <span className="gallery__overlay">
                  <span className="gallery__tag">{item.tag}</span>
                  <span className="gallery__caption">{item.caption}</span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {isOpen ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            className="lightbox__close"
            onClick={() => setOpenIndex(null)}
            aria-label="Close"
          >
            <Icon name="close" size={20} />
          </button>

          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            onClick={(e) => {
              e.stopPropagation()
              setOpenIndex((i) => (i - 1 + gallery.items.length) % gallery.items.length)
            }}
            aria-label="Previous"
          >
            <Icon name="chevron" size={22} />
          </button>

          <figure className="lightbox__inner" onClick={(e) => e.stopPropagation()}>
            <Figure
              src={current.image}
              seed={current.caption}
              alt={current.caption}
              label={current.tag}
              ratio="16 / 10"
              className="lightbox__figure"
            />
            <figcaption>
              <strong>{current.caption}</strong>
              <span>
                {openIndex + 1} / {gallery.items.length} · {current.tag}
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            onClick={(e) => {
              e.stopPropagation()
              setOpenIndex((i) => (i + 1) % gallery.items.length)
            }}
            aria-label="Next"
          >
            <Icon name="chevron" size={22} />
          </button>
        </div>
      ) : null}
    </section>
  )
}
