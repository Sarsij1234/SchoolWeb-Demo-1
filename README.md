# Evergreen Valley — School Portfolio Website

A modern, animated single-page school website built with React 19 + Vite.
All demo content is placeholder — replace it with your school's real data.

```bash
npm run dev      # start the dev server at http://localhost:5173
npm run build    # production build into dist/
npm run preview  # preview the production build
npm run lint     # oxlint
```

---

## Replacing the demo content

**Everything you need to change lives in one file: [`src/data/siteData.js`](src/data/siteData.js).**

It exports one object per section of the page. Change the values, and the site
updates — you never need to touch the layout or CSS.

| Export | Controls |
| --- | --- |
| `school` | Name, initials, tagline, address, phone, email, **WhatsApp number**, social links |
| `erp` | **Parent Portal / ERP link** shown in the header, mobile menu and footer |
| `navLinks` | The top navigation menu |
| `hero` | Headline, lead paragraph, buttons, the three highlight figures |
| `ribbon` | The scrolling accreditation strip under the hero |
| `stats` | The four animated counters |
| `about` | "Why us" heading and the four pillar cards |
| `principal` | Principal's message, name, credentials |
| `academics` | The four tabbed stages (Early Years → Senior) |
| `campus` | The facilities bento grid |
| `faculty` | Teacher cards |
| `gallery` | Student-life photo grid + lightbox |
| `events` | News and events list |
| `testimonials` | The rotating quote slider |
| `admissions` | Application steps and key dates |
| `contact` | Contact form subject options |
| `footer` | Footer blurb, link columns, legal links |

### Replacing the photos

The demo ships with **28 stock photographs in `public/photos/`**, already wired
up across the hero, academics, campus, faculty and gallery sections.

> ⚠️ **These are Unsplash-licensed photos of real people and places.** Replace
> them all — especially the six faculty portraits — before putting this online
> as your school's real site. Using stock headshots under your teachers' names
> would misrepresent real individuals.

**The easy way:** save your own photo over the existing file, keeping the same
filename. Nothing in the code changes.

| Slot | File | Size used |
| --- | --- | --- |
| Hero | `hero-campus.jpg` | 900×1100 |
| About | `about-classroom.jpg` | 800×1000 |
| Principal | `principal.jpg` | 700×700 |
| Academic stages | `stage-{early,primary,middle,senior}.jpg` | 900×675 |
| Facilities | `facility-{library,science,robotics,arts,sports,innovation,farm}.jpg` | 900×700 (library 800×1100) |
| Faculty | `teacher-{meera,rohan,aisha,daniel,priya,james}.jpg` | 520×693 |
| Gallery | `gallery-{founders,chemistry,football,theatre,robotics,expedition,assembly,art}.jpg` | 760×760 |

Sizes are guidance, not a requirement — every image is `object-fit: cover`, so
any reasonable photo will crop sensibly. Aim for roughly the same aspect ratio.

**Or point at a different file** by editing the `image` field in `siteData.js`:

```js
{ title: 'Central Library', image: '/photos/our-new-library.jpg' }
```

Set `image: null` on any entry to fall back to a generated gradient placeholder
— useful while you're still waiting on a photo.

---

## Changing the look

Colours, fonts, spacing and radii are all CSS custom properties at the top of
[`src/index.css`](src/index.css). Change `--brand` and `--brand-2` and the
entire site — buttons, gradients, glows, counters — re-themes:

```css
--brand: #6f5cf6;    /* primary       */
--brand-2: #16c8d6;  /* secondary     */
--gold: #f5b23d;     /* accent        */
```

Light and dark themes are both defined there. Dark is the default; the toggle in
the header saves the visitor's choice to `localStorage`.

Fonts are **Fraunces** (headings) and **Outfit** (body), loaded from Google
Fonts in [`index.html`](index.html). Swap the `<link>` and the `--display` /
`--sans` variables to change them.

Section layouts live in [`src/styles/sections.css`](src/styles/sections.css),
organised top-to-bottom in the same order the sections appear on the page.

---

## Project structure

```
src/
  data/siteData.js      ← all site content (edit this)
  lib/ui.jsx            ← shared primitives: Reveal, Counter, Figure, Icon
  components/           ← one file per page section
  styles/sections.css   ← all section styling
  index.css             ← design tokens, base styles, utilities
  App.jsx               ← section order
```

To reorder sections, rearrange them in `App.jsx`. To remove one, delete its line
there (and its entry in `navLinks`).

---

## School ERP / Parent Portal

The site links out to the school's ERP in three places:

1. **A "Portal" button in the header** (hidden below 860px — it moves into the
   mobile menu instead).
2. **A highlighted entry in the mobile menu**, with a one-line description.
3. **A sign-in bar in the footer**, plus the "Parent portal" link in the
   Families column.

All of them open in a new tab with `rel="noopener noreferrer"`.

Configure it via the `erp` export in
[`src/data/siteData.js`](src/data/siteData.js):

```js
export const erp = {
  url: 'https://little-star.uat.zorovah.com/dashboard',
  label: 'Parent Portal',
  shortLabel: 'Portal',          // used on the compact header button
  note: 'Fees, attendance, report cards and circulars',
}
```

> ⚠️ **That URL is a UAT (testing) environment.** Point `url` at the production
> ERP address before real parents use this site — a `uat.` host may hold test
> data, get reset, or go offline without warning.

Linking to `/dashboard` rather than `/login` is deliberate: the ERP redirects
signed-out visitors to `/login?redirect=/dashboard`, so they land on the
dashboard once they've signed in, and signed-in parents skip the login screen
entirely.

Any footer link whose `href` starts with `http` is automatically treated as
external — new tab, plus a small outbound arrow.

## WhatsApp enquiries

Visitors can raise an enquiry over WhatsApp from four places:

1. **A floating button**, bottom-right on every screen, which appears once they
   scroll past the hero. Hovering expands it to show your reply hours.
2. **The contact form** — "Send on WhatsApp" composes everything they typed
   (name, phone, email, subject, message) into a formatted WhatsApp message.
3. **Each event card**, pre-filled with that event's name and date.
4. **The WhatsApp entry** in the contact list and the footer social row.

### The admin number

Enquiries go to **+91 98993 33623**. To change it, edit the `whatsapp` block
inside `school` in [`src/data/siteData.js`](src/data/siteData.js):

```js
whatsapp: {
  number: '919899333623',          // country code first, no + and no spaces
  display: '+91 98993 33623',      // how it's shown on the page
  greeting: 'Hello! I found your website...',
  label: 'Enquire on WhatsApp',
  hours: 'Replies Mon – Sat, 9 AM – 6 PM',
},
```

`number` must have the country code and no `+` or spaces (`91` is India), and
must be registered with WhatsApp. `display` is cosmetic — it's what visitors
read. A WhatsApp Business account is worth using here: it gives you away
messages, quick replies, and labels for sorting admission enquiries.

### How it works

No backend, no API key, no Business API account. The buttons build a standard
[`wa.me`](https://faq.whatsapp.com/5913398998672934) link with the message
pre-typed — WhatsApp opens in the app on phones and `web.whatsapp.com` on
desktop. **The visitor still presses send themselves**, so nothing is sent
without their action, and no message data ever passes through a server of yours.

The link building lives in [`src/lib/whatsapp.js`](src/lib/whatsapp.js).

---

## Known demo limitations

- **The contact form has no server.** It hands the enquiry to WhatsApp (or to
  the visitor's email client via the "Prefer email instead?" link) rather than
  posting anywhere. That is a complete, working enquiry flow — but if you'd
  rather collect submissions in a database or inbox, replace `handleSubmit` in
  [`src/components/Contact.jsx`](src/components/Contact.jsx) with a `fetch()` to
  Formspree, a serverless function, or your CMS.
- **The map is a decorative placeholder**, not a real map. Replace `.map` in
  `Contact.jsx` with a Google Maps or OpenStreetMap `<iframe>`.
- **Footer legal links and the non-WhatsApp social links point nowhere** (`#`).
  Fill them in `siteData.js`.
- It is a single page; there is no router. Add `react-router-dom` if you need
  separate URLs per section.

## Accessibility & motion

Semantic landmarks, a skip link, keyboard-operable tabs and lightbox (arrow keys
and `Escape`), visible focus rings, and full support for
`prefers-reduced-motion` — which disables the reveal, counter and marquee
animations.
