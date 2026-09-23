/* ============================================================================
 *  SITE DATA — this is the only file you need to edit to make the site yours.
 *  Every section of the website reads its content from here.
 *
 *  PHOTOS — the demo ships with stock photographs in `public/photos/`.
 *    - To swap one: drop your own file into public/photos/ and point the
 *      `image` field at it, e.g. image: '/photos/our-library.jpg'
 *      (Keeping the same filename means you don't edit this file at all.)
 *    - Set `image: null` to fall back to a generated gradient placeholder.
 *
 *  NOTE: the stock photos are Unsplash-licensed images of real people and
 *  places. Replace them ALL — especially the faculty portraits — before you
 *  put this online as your school's actual site.
 * ========================================================================== */

export const school = {
  name: 'Evergreen Valley International School',
  shortName: 'Evergreen Valley',
  initials: 'EV',
  tagline: 'Where curiosity becomes character',
  established: 1998,
  affiliation: 'CBSE Affiliation No. 1030428',
  email: 'admissions@evergreenvalley.edu',
  phone: '+91 80 4123 7700',

  /* Admin WhatsApp number that receives website enquiries.
   * Format: country code first, no + and no spaces. 91 = India. */
  whatsapp: {
    number: '919899333623',
    display: '+91 98993 33623',
    /* Pre-typed into WhatsApp when someone taps the floating button. */
    greeting: 'Hello! I found your website and would like to know more about admissions.',
    /* Label shown beside the floating button on desktop. */
    label: 'Enquire on WhatsApp',
    hours: 'Replies Mon – Sat, 9 AM – 6 PM',
  },

  address: {
    line1: '12 Cedar Ridge Road, Whitefield',
    line2: 'Bengaluru, Karnataka 560066',
  },
  hours: 'Mon – Fri · 8:00 AM – 4:30 PM',
  social: [
    { label: 'WhatsApp', href: 'whatsapp', icon: 'whatsapp' },
    { label: 'Instagram', href: '#', icon: 'instagram' },
    { label: 'YouTube', href: '#', icon: 'youtube' },
    { label: 'LinkedIn', href: '#', icon: 'linkedin' },
    { label: 'Facebook', href: '#', icon: 'facebook' },
  ],
}

/* ---------------------------------------------------------------------------
 *  SCHOOL ERP / PARENT PORTAL
 *  Linked from the header, the mobile menu and the footer.
 *
 *  ⚠️ This currently points at a UAT (testing) environment. Swap `url` for the
 *  production address before real parents use the site.
 * ------------------------------------------------------------------------- */
export const erp = {
  url: 'https://little-star.uat.zorovah.com/dashboard',
  label: 'Parent Portal',
  shortLabel: 'Portal',
  /* Shown in the mobile menu and the footer callout. */
  note: 'Fees, attendance, report cards and circulars',
}

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Academics', href: '#academics' },
  { label: 'Campus', href: '#campus' },
  { label: 'Faculty', href: '#faculty' },
  { label: 'Life', href: '#gallery' },
  { label: 'News', href: '#events' },
  { label: 'Admissions', href: '#admissions' },
]

export const hero = {
  badge: 'Admissions open for 2026 – 27',
  titleLines: ['A school built for', 'the way children'],
  titleAccent: 'actually learn',
  lead:
    'For over twenty-five years, Evergreen Valley has paired academic rigour with genuine curiosity — small classes, extraordinary teachers, and a campus that invites children to ask better questions.',
  primaryCta: { label: 'Begin an application', href: '#admissions' },
  secondaryCta: { label: 'Book a campus visit', href: '#contact' },
  highlights: [
    { value: '1:12', label: 'Teacher ratio' },
    { value: '98%', label: 'University placement' },
    { value: '40+', label: 'Clubs & societies' },
  ],
  image: '/photos/hero-campus.jpg',
}

/* Scrolling ribbon under the hero */
export const ribbon = [
  'CBSE Affiliated',
  'Cambridge Assessment Partner',
  'Round Square Member',
  'Green Campus Certified',
  'National Robotics Champions 2025',
  'Duke of Edinburgh Award Centre',
]

export const stats = [
  { value: 1680, suffix: '+', label: 'Students on campus', note: 'Nursery through Grade 12' },
  { value: 142, suffix: '', label: 'Faculty members', note: '64% hold a master’s or above' },
  { value: 27, suffix: '', label: 'Years of teaching', note: 'Founded in 1998' },
  { value: 96, suffix: '%', label: 'Parent satisfaction', note: '2025 community survey' },
]

export const about = {
  eyebrow: 'Why Evergreen Valley',
  title: 'An education measured in more than marks',
  lead:
    'We build classrooms where a child can be wrong out loud, try again, and leave knowing how they think. Everything else — the results, the offers, the confidence — follows from that.',
  pillars: [
    {
      icon: 'compass',
      title: 'Inquiry-led classrooms',
      text: 'Lessons start with a question, not a chapter. Students investigate, argue from evidence, and present their thinking every single week.',
    },
    {
      icon: 'users',
      title: 'Small by design',
      text: 'We cap classes at 24. Every teacher knows every child’s name, reading level, and what makes them light up.',
    },
    {
      icon: 'palette',
      title: 'Arts on equal footing',
      text: 'Music, theatre, and studio art are timetabled alongside the sciences — not squeezed into whatever is left on a Friday.',
    },
    {
      icon: 'globe',
      title: 'Genuinely global',
      text: 'Exchange programmes across four continents, a Model UN circuit, and a student body from 19 nationalities.',
    },
  ],
  image: '/photos/about-classroom.jpg',
}

export const principal = {
  eyebrow: 'From the Principal',
  quote:
    'Parents often ask what makes a school good. After thirty years in classrooms, my answer has not changed: it is whether a child walks in on Monday morning wanting to know something. Everything we do here protects that instinct.',
  name: 'Dr. Ananya Rao',
  role: 'Principal · Evergreen Valley International School',
  credentials: 'Ph.D. Education Policy, Cambridge · Fulbright Fellow',
  image: '/photos/principal.jpg',
}

export const academics = {
  eyebrow: 'Academics',
  title: 'Four stages, one continuous story',
  lead:
    'Our programme grows with the child — from sensory play to independent research — with deliberate bridges between every stage.',
  stages: [
    {
      id: 'early',
      name: 'Early Years',
      grades: 'Nursery – Grade 2',
      ages: 'Ages 3 – 7',
      headline: 'Learning through play, structure through routine',
      text: 'A Reggio-inspired environment where children build language, number sense, and social confidence. Days move between guided discovery, outdoor exploration, and quiet focused work.',
      points: [
        'Phonics and early numeracy woven through play',
        'Daily outdoor and sensory learning blocks',
        'Two adults in every classroom',
        'No formal examinations — portfolio assessment only',
      ],
      image: '/photos/stage-early.jpg',
    },
    {
      id: 'primary',
      name: 'Primary',
      grades: 'Grades 3 – 5',
      ages: 'Ages 8 – 10',
      headline: 'Where skills become habits',
      text: 'Children move from learning to read to reading to learn. Writing across subjects, mental maths fluency, and the first taste of long-form projects.',
      points: [
        'Cross-curricular termly projects',
        'Second language begins (French, Spanish or Kannada)',
        'Weekly library research periods',
        'Swimming and instrumental music for every child',
      ],
      image: '/photos/stage-primary.jpg',
    },
    {
      id: 'middle',
      name: 'Middle School',
      grades: 'Grades 6 – 8',
      ages: 'Ages 11 – 13',
      headline: 'Specialists, laboratories, and real responsibility',
      text: 'Subject specialists take over, laboratory science starts in earnest, and students begin choosing electives that shape their senior years.',
      points: [
        'Dedicated physics, chemistry and biology labs',
        'Design & robotics as a timetabled subject',
        'Student council and house leadership roles',
        'Annual residential expedition',
      ],
      image: '/photos/stage-middle.jpg',
    },
    {
      id: 'senior',
      name: 'Senior School',
      grades: 'Grades 9 – 12',
      ages: 'Ages 14 – 18',
      headline: 'Board rigour, university readiness',
      text: 'CBSE board preparation paired with an independent research requirement, university counselling from Grade 9, and genuine academic independence.',
      points: [
        'Science, Commerce and Humanities streams',
        'Dedicated university counselling team',
        'Capstone research project in Grade 11',
        'SAT / IELTS preparation on campus',
      ],
      image: '/photos/stage-senior.jpg',
    },
  ],
}

export const campus = {
  eyebrow: 'The Campus',
  title: 'Eleven acres, designed around learning',
  lead:
    'Purpose-built facilities that students actually use every day — not showpieces reserved for open house.',
  facilities: [
    { title: 'Central Library', text: '24,000 volumes, silent study lofts, and a digital archive open until 6 PM.', size: 'lg', image: '/photos/facility-library.jpg' },
    { title: 'Science Block', text: 'Six specialist laboratories including a dedicated research bench for senior capstones.', size: 'sm', image: '/photos/facility-science.jpg' },
    { title: 'Design & Robotics Lab', text: '3D printers, laser cutter, and a competition-grade robotics pit.', size: 'sm', image: '/photos/facility-robotics.jpg' },
    { title: 'Performing Arts Centre', text: 'A 400-seat auditorium, black-box theatre, and eight soundproofed practice rooms.', size: 'md', image: '/photos/facility-arts.jpg' },
    { title: 'Sports Complex', text: 'FIFA-standard turf, a 25 m indoor pool, eight courts, and a strength studio.', size: 'md', image: '/photos/facility-sports.jpg' },
    { title: 'Innovation Studio', text: 'Open-access maker space where any student can book time after school.', size: 'sm', image: '/photos/facility-innovation.jpg' },
    { title: 'Organic Farm & Biodome', text: 'Two acres tended by students — the source of our canteen’s greens.', size: 'sm', image: '/photos/facility-farm.jpg' },
  ],
}

export const faculty = {
  eyebrow: 'Our People',
  title: 'Teachers worth staying late for',
  lead:
    'Average tenure at Evergreen Valley is nine years. Our teachers stay because they are trusted, funded, and given time to plan properly.',
  members: [
    { name: 'Dr. Meera Krishnan', role: 'Head of Sciences', detail: 'Ph.D. Molecular Biology · 18 years teaching', image: '/photos/teacher-meera.jpg' },
    { name: 'Rohan Fernandes', role: 'Head of Mathematics', detail: 'M.Sc. Pure Mathematics · Olympiad coach', image: '/photos/teacher-rohan.jpg' },
    { name: 'Aisha Qureshi', role: 'Director of Performing Arts', detail: 'Trinity College London · Former RSC associate', image: '/photos/teacher-aisha.jpg' },
    { name: 'Daniel Okafor', role: 'Head of Design & Robotics', detail: 'M.Eng. Mechatronics · FIRST mentor', image: '/photos/teacher-daniel.jpg' },
    { name: 'Priya Nambiar', role: 'Head of Early Years', detail: 'Reggio Emilia certified · 15 years', image: '/photos/teacher-priya.jpg' },
    { name: 'James Whitaker', role: 'University Counsellor', detail: 'Former admissions officer, Warwick', image: '/photos/teacher-james.jpg' },
  ],
}

export const gallery = {
  eyebrow: 'Student Life',
  title: 'A week on campus',
  lead: 'Click any moment to see it larger.',
  items: [
    { caption: 'Founder’s Day procession', tag: 'Traditions', image: '/photos/gallery-founders.jpg' },
    { caption: 'Senior chemistry practical', tag: 'Academics', image: '/photos/gallery-chemistry.jpg' },
    { caption: 'Inter-house football final', tag: 'Sport', image: '/photos/gallery-football.jpg' },
    { caption: 'Spring production of The Tempest', tag: 'Arts', image: '/photos/gallery-theatre.jpg' },
    { caption: 'Robotics team at nationals', tag: 'Innovation', image: '/photos/gallery-robotics.jpg' },
    { caption: 'Grade 7 Himalayan expedition', tag: 'Outdoors', image: '/photos/gallery-expedition.jpg' },
    { caption: 'Morning assembly, Cedar Quad', tag: 'Community', image: '/photos/gallery-assembly.jpg' },
    { caption: 'Studio art open evening', tag: 'Arts', image: '/photos/gallery-art.jpg' },
  ],
}

export const events = {
  eyebrow: 'News & Events',
  title: 'What’s happening this term',
  lead: 'Open events are free to attend and require no prior registration unless noted.',
  items: [
    {
      date: '2026-10-04',
      title: 'Open House & Campus Tour',
      text: 'Walk the campus with senior students, sit in on a demonstration lesson, and meet heads of department.',
      tag: 'Admissions',
      featured: true,
    },
    {
      date: '2026-10-18',
      title: 'Annual Science Exposition',
      text: 'Ninety student-built projects across four halls, judged by researchers from IISc.',
      tag: 'Academics',
    },
    {
      date: '2026-11-07',
      title: 'Founder’s Day Concert',
      text: 'The full school orchestra and senior choir perform in the Performing Arts Centre.',
      tag: 'Arts',
    },
    {
      date: '2026-11-22',
      title: 'Inter-School Robotics Invitational',
      text: 'Fourteen schools compete in our Design Lab pit. Spectators welcome all day.',
      tag: 'Innovation',
    },
  ],
}

export const testimonials = {
  eyebrow: 'In Their Words',
  title: 'What families tell us',
  items: [
    {
      quote:
        'We moved our daughter here in Grade 6 after a difficult year elsewhere. Within a term she was raising her hand again. That is the whole review.',
      name: 'Sandeep & Ritu Malhotra',
      role: 'Parents, Grade 8',
    },
    {
      quote:
        'The capstone project was the hardest thing I have ever done and the reason my university interview went well. Nobody handed me the answer — they just refused to let me quit.',
      name: 'Tara Venkatesh',
      role: 'Class of 2025 · now at NUS',
    },
    {
      quote:
        'As a teacher I have worked in four schools. This is the first where I have been given planning time, a budget, and the benefit of the doubt.',
      name: 'Rohan Fernandes',
      role: 'Head of Mathematics',
    },
  ],
}

export const admissions = {
  eyebrow: 'Admissions',
  title: 'Joining Evergreen Valley',
  lead:
    'We admit on fit, not just scores. The process takes roughly four weeks from enquiry to offer.',
  steps: [
    { n: '01', title: 'Enquiry', text: 'Submit the enquiry form or call the admissions office. We respond within two working days.' },
    { n: '02', title: 'Campus visit', text: 'Tour the campus with a senior student and meet the relevant head of school.' },
    { n: '03', title: 'Interaction', text: 'An age-appropriate assessment and a relaxed conversation with the child and parents.' },
    { n: '04', title: 'Offer & enrolment', text: 'Offers are released within ten days. Places are confirmed on receipt of the enrolment deposit.' },
  ],
  deadlines: [
    { label: 'Applications open', value: '1 September 2026' },
    { label: 'Priority deadline', value: '30 November 2026' },
    { label: 'Assessment window', value: 'December – February' },
    { label: 'Term begins', value: '8 April 2027' },
  ],
  note: 'Need-based scholarships cover up to 100% of tuition for 40 students each year.',
}

export const contact = {
  eyebrow: 'Get in touch',
  title: 'Come and see the place',
  lead:
    'The honest way to judge a school is to stand in its corridors at 11 AM on a Tuesday. Book a visit and do exactly that.',
  subjects: ['Admissions enquiry', 'Book a campus visit', 'Scholarships', 'Careers at Evergreen', 'Something else'],
}

export const footer = {
  blurb:
    'An independent, co-educational day school for students aged 3 to 18, serving families across Bengaluru since 1998.',
  columns: [
    {
      title: 'School',
      links: [
        { label: 'About us', href: '#about' },
        { label: 'Academics', href: '#academics' },
        { label: 'Campus & facilities', href: '#campus' },
        { label: 'Faculty', href: '#faculty' },
      ],
    },
    {
      title: 'Families',
      links: [
        { label: 'Admissions', href: '#admissions' },
        { label: 'Fees & scholarships', href: '#admissions' },
        { label: 'Term dates', href: '#events' },
        { label: 'Parent portal', href: erp.url },
      ],
    },
    {
      title: 'Connect',
      links: [
        { label: 'News & events', href: '#events' },
        { label: 'Contact us', href: '#contact' },
        { label: 'Careers', href: '#contact' },
        { label: 'Alumni network', href: '#' },
      ],
    },
  ],
  legal: ['Privacy policy', 'Safeguarding', 'Anti-bullying policy', 'Mandatory disclosures'],
}
