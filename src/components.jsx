import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X, Mail, MoveUpRight } from 'lucide-react'
import { projects } from './data/projects'

function Github({ size = 16 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.7 1.15 1.7 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.12 2.95.71.78 1.14 1.77 1.14 2.99 0 4.29-2.61 5.23-5.1 5.51.4.35.75 1.02.75 2.06v3.05c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" /></svg> }
function Linkedin({ size = 16 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52C22 2.68 21.31 2 20.45 2ZM7.93 18.34H4.96V9.2h2.97v9.14ZM6.44 7.95a1.72 1.72 0 1 1 .02-3.44 1.72 1.72 0 0 1-.02 3.44Zm11.9 10.39h-2.96v-4.45c0-1.06-.02-2.42-1.48-2.42-1.48 0-1.7 1.15-1.7 2.34v4.53H9.24V9.2h2.84v1.25h.04c.4-.72 1.36-1.48 2.8-1.48 3 0 3.56 1.97 3.56 4.53v4.84Z" /></svg> }

const sections = ['Home', 'About', 'Skills', 'Projects', 'Journey', 'Contact']
const skills = {
  FRONTEND: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Vite'],
  BACKEND: ['Node.js', 'Express', 'MongoDB', 'MySQL'],
  PROGRAMMING: ['C++', 'C#', 'Python', 'R'],
  TOOLS: ['Git', 'GitHub', 'VS Code', 'Figma'],
}

const reveal = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }

export function PageLoader() {
  const [loading, setLoading] = useState(true)
  useEffect(() => { const timer = window.setTimeout(() => setLoading(false), 850); return () => window.clearTimeout(timer) }, [])
  return <AnimatePresence>{loading && <motion.div className="loader" initial={{ y: 0 }} exit={{ y: '-100%', transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}><motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="loader-mark">PL<span>.</span></motion.span><div className="loader-line"><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.65, ease: 'easeInOut' }} /></div></motion.div>}</AnimatePresence>
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('Home')
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)
      let current = 'Home'
      sections.forEach((name) => { const el = document.getElementById(name.toLowerCase()); if (el && el.getBoundingClientRect().top <= 160) current = name })
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const links = <>{sections.map((name) => <a key={name} href={`#${name.toLowerCase()}`} onClick={() => setOpen(false)} className={active === name ? 'nav-link active' : 'nav-link'}>{name}{active === name && <motion.i layoutId="nav-dot" />}</a>)}</>
  return <header className={`navbar ${scrolled ? 'scrolled' : ''}`}><a className="brand" href="#home" aria-label="Praduman Lakhera home">PL<span>.</span></a><nav className="desktop-nav" aria-label="Main navigation">{links}</nav><a className="nav-cta" href="#contact">Let’s talk <ArrowUpRight size={15} /></a><button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button><AnimatePresence>{open && <motion.nav className="mobile-nav" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} aria-label="Mobile navigation">{links}<a href="#contact" onClick={() => setOpen(false)} className="mobile-contact">Start a conversation <ArrowUpRight size={16} /></a></motion.nav>}</AnimatePresence></header>
}

export function Hero() {
  const reduce = useReducedMotion()
  return <section className="hero section-shell" id="home"><div className="hero-grid" aria-hidden="true" /><div className="hero-orb" aria-hidden="true" /><motion.div className="hero-content" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: reduce ? 0 : 0.13, delayChildren: 0.95 } } }}>
    <motion.div className="availability" variants={reveal}><i /> Available for opportunities</motion.div>
    <motion.p className="hero-name" variants={reveal}>PRADUMAN LAKHERA <span>· DEVELOPER</span></motion.p>
    <motion.h1 variants={reveal}>FULL-STACK<br /><span>DEVELOPER</span><sup>✳</sup></motion.h1>
    <motion.div className="hero-bottom" variants={reveal}><p>I build modern, interactive web experiences and software with a focus on clean design, performance, and real-world functionality.</p><div className="hero-actions"><a className="button button-primary" href="#projects">View projects <ArrowUpRight size={17} /></a><a className="button button-quiet" href="#contact">Contact me <ArrowRight size={16} /></a></div></motion.div>
  </motion.div><div className="hero-coordinate" aria-hidden="true">28° 12' N &nbsp; 78° 13' E</div><a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></a></section>
}

function SectionTitle({ eyebrow, children, index }) { return <motion.div className="section-title" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}><span className="eyebrow"><i>{index}</i> / {eyebrow}</span><h2>{children}</h2></motion.div> }

export function About() { return <section id="about" className="about section-pad"><div className="section-shell"><SectionTitle index="01" eyebrow="A LITTLE ABOUT ME">Curious by nature.<br /><span>Builder by choice.</span></SectionTitle><div className="about-layout"><div className="about-aside"><div className="orbit-mark"><span>PL</span><i /><b /></div><p>DESIGN MINDED<br />ENGINEERING LED</p></div><div className="about-copy"><p className="lead-copy">I’m Praduman — a developer interested in building <span>useful, thoughtful digital things.</span></p><p className="body-copy">From modern web applications to software, interactive experiences, and AI-powered tools, I enjoy taking ideas from a first sketch to something people can use. I care about clean interfaces, dependable engineering, and staying curious through every build.</p><div className="about-meta"><div><span className="meta-label">CURRENTLY EXPLORING</span><span>Full-stack · Interaction · AI</span></div><div><span className="meta-label">EDUCATION</span><span>BCA · OIMT / HNBGU</span></div></div></div></div><div className="fact-strip"><div><span className="fact-index">01</span><strong>10<span>+</span></strong><span>Projects built</span></div><div><span className="fact-index">02</span><strong>FULL<span>-STACK</span></strong><span>Areas of practice</span></div><div><span className="fact-index">03</span><strong>WEB<span> & </span>SOFTWARE</strong><span>Things I make</span></div><div><span className="fact-index">04</span><strong>ALWAYS<span> LEARNING</span></strong><span>How I work</span></div></div></div></section> }

export function Skills() { return <section id="skills" className="skills section-pad"><div className="section-shell"><SectionTitle index="02" eyebrow="THE TOOLKIT">Tools for the<br /><span>work at hand.</span></SectionTitle><p className="section-intro">A growing set of technologies I use to shape ideas into useful products.</p><div className="skill-grid">{Object.entries(skills).map(([category, items], index) => <motion.div className="skill-group" key={category} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.08 }}><span className="skill-category"><i>0{index + 1}</i> {category}</span><div className="skill-tags">{items.map((skill, i) => <motion.span key={skill} whileHover={{ y: -4, color: '#f5f5f3', borderColor: 'rgba(151,139,255,.45)' }} transition={{ duration: 0.18 }}><b>{String(i + 1).padStart(2, '0')}</b>{skill}<ArrowUpRight size={12} /></motion.span>)}</div></motion.div>)}</div></div></section> }

function ProjectVisual({ type }) { return <div className={`project-visual visual-${type}`} aria-hidden="true"><div className="visual-noise" />{type === 'meetup' && <><div className="meetup-top"><span>meetafriend</span><span>Find your people ↗</span></div><div className="meetup-heading">Good things<br />happen <i>together.</i></div><div className="meetup-people"><span>J</span><span>M</span><span>A</span><span>+</span></div><div className="meetup-foot"><span>THIS WEEKEND · 12 MEETUPS</span><span>EXPLORE GROUPS ↗</span></div></>}{type === 'product' && <><div className="product-bar"><span>●</span><span>Air / Pro</span><span>Overview · Tech Specs · Buy</span></div><div className="product-title">Beyond<br /><i>the ordinary.</i></div><div className="product-device"><div className="device-screen"><span>PRO</span><div className="device-light" /></div><div className="device-base" /></div><span className="product-note">DESIGNED TO MOVE YOU</span></>}{type === 'bot' && <><div className="terminal-head"><span>momo · command center</span><span>● ONLINE</span></div><div className="terminal-body"><p><b>›</b> /meetup create</p><p className="term-dim">Preparing a new community meetup...</p><div className="term-card"><span>✳&nbsp; YOUR MEETUP IS LIVE</span><strong>Friday Night Games</strong><small>12 spots · 3 groups matched</small></div><p><b>›</b> <i className="term-cursor" /></p></div><div className="terminal-foot">BOT STATUS <span>ALL SYSTEMS OPERATIONAL</span></div></>}</div> }

function ProjectCard({ project }) { const [tilt, setTilt] = useState({ x: 0, y: 0 }); const move = (event) => { if (window.matchMedia('(pointer: coarse)').matches) return; const rect = event.currentTarget.getBoundingClientRect(); setTilt({ x: ((event.clientY - rect.top) / rect.height - .5) * -2, y: ((event.clientX - rect.left) / rect.width - .5) * 2 }) }; const links = project.github || project.live
  return <motion.article className="project-card" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} onMouseMove={move} onMouseLeave={() => setTilt({ x: 0, y: 0 })} style={{ '--tilt-x': `${tilt.x}deg`, '--tilt-y': `${tilt.y}deg` }}><div className="project-visual-wrap"><ProjectVisual type={project.visual} /><span className="project-number">{project.number} <i>/ 03</i></span><span className="project-type">{project.type}</span></div><div className="project-details"><div className="project-heading"><h3>{project.title}</h3><span className="project-arrow"><MoveUpRight size={19} /></span></div><p>{project.description}</p><div className="feature-list">{project.features.map((feature) => <span key={feature}><i />{feature}</span>)}</div><div className="project-footer"><div className="tech-list">{project.technologies.map((tag) => <span key={tag}>{tag}</span>)}</div>{links && <div className="project-links">{project.live && <a href={project.live} target="_blank" rel="noreferrer" aria-label={`View ${project.title} live`}><ArrowUpRight size={15} /></a>}{project.github && <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} on GitHub`}><Github size={15} /></a>}</div>}</div></div></motion.article>
}

export function Projects() { return <section id="projects" className="projects section-pad"><div className="section-shell"><SectionTitle index="03" eyebrow="SELECTED WORK">Things made<br /><span>with intent.</span></SectionTitle><div className="projects-head"><p className="section-intro">A few experiments and products at the intersection of engineering and experience.</p><span>2024 — 2026<br />SELECTED PROJECTS</span></div><div className="project-grid">{projects.map((project) => <ProjectCard key={project.number} project={project} />)}</div></div></section> }

export function Journey() { const steps = [['2024', 'A starting point', 'Started BCA and began exploring the foundations of software development.'], ['2025', 'Into the modern web', 'Expanded into modern web development and started building full-stack projects.'], ['2025 — 2026', 'Across the stack', 'Built with React, Node.js, C#, databases, bots, and interactive web experiences.'], ['2026', 'Making it production-ready', 'Focused on dependable software, thoughtful details, and stronger frontend engineering.']]; return <section id="journey" className="journey section-pad"><div className="section-shell journey-layout"><div><SectionTitle index="04" eyebrow="THE JOURNEY">Learning by<br /><span>making.</span></SectionTitle><p className="section-intro">A timeline of curiosity, practice, and the things I’ve learned along the way.</p><div className="education-note"><span>EDUCATION · 2024 — PRESENT</span><strong>Bachelor of Computer Applications</strong><small>OIMT / HNBGU</small></div></div><div className="timeline">{steps.map(([date, title, text], index) => <motion.div className="timeline-item" key={date} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} transition={{ delay: index * 0.08 }}><div className="timeline-pin"><i /></div><span className="timeline-date">{date}</span><div><h3>{title}</h3><p>{text}</p></div></motion.div>)}</div></div></section> }


const EMAIL = 'Proudmanlakhera@gmail.com'
const LINKEDIN_URL = 'https://www.linkedin.com/in/praduman-lakhera-3743b5343/?isSelfProfile=true'

const contactLinks = [
  { label: 'GitHub', href: 'https://github.com/PradumanLakhera', Icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/praduman-lakhera-3743b5343/?isSelfProfile=true', Icon: Linkedin },
  { label: 'Email', href: `mailto:${EMAIL}`, Icon: Mail },
]

export function Contact() {
  const configured = contactLinks.filter((link) => {
    if (link.label === 'Email') return EMAIL !== 'Proudmanlakhera@gmail.com'
    if (link.label === 'LinkedIn') return LINKEDIN_URL !== 'https://www.linkedin.com/in/praduman-lakhera-3743b5343/?isSelfProfile=true'
    return true
  })

  return <section id="contact" className="contact section-pad"><div className="section-shell"><div className="contact-top"><SectionTitle index="05" eyebrow="YOUR NEXT MOVE">Let’s build<br /><span>something.</span></SectionTitle><motion.p variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>Have an idea, project, or opportunity?<br />Let’s talk.</motion.p></div><div className="contact-bottom"><div className="contact-email"><span>HAVE SOMETHING IN MIND?</span>{EMAIL !== 'YOUR_EMAIL' ? <a href={`mailto:${EMAIL}`}>{EMAIL}<ArrowUpRight size={19} /></a> : <span className="contact-unset">Add your email to this file to get in touch.</span>}</div><div className="social-links">{configured.length ? configured.map(({ label, href, Icon }) => <a key={label} href={href} target={label === 'Email' ? undefined : '_blank'} rel={label === 'Email' ? undefined : 'noreferrer'}><Icon size={16} />{label}<ArrowUpRight size={14} /></a>) : <p>Social links appear here once configured.</p>}</div></div></div></section>
}

export function Footer() { return <footer className="footer"><div className="section-shell"><a className="brand footer-brand" href="#home">PL<span>.</span></a><span>© 2026 Praduman Lakhera</span><span>BUILT WITH REACT <i>✳</i></span><a href="#home">BACK TO TOP ↑</a></div></footer> }

export function CustomCursor() { const [position, setPosition] = useState({ x: -100, y: -100 }); const [hover, setHover] = useState(false); useEffect(() => { if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; let frame; const move = (event) => { cancelAnimationFrame(frame); frame = requestAnimationFrame(() => setPosition({ x: event.clientX, y: event.clientY })) }; const over = (event) => setHover(Boolean(event.target.closest('a, button'))); window.addEventListener('pointermove', move); document.addEventListener('pointerover', over); return () => { cancelAnimationFrame(frame); window.removeEventListener('pointermove', move); document.removeEventListener('pointerover', over) } }, []); return <div className={`custom-cursor ${hover ? 'cursor-hover' : ''}`} style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }} aria-hidden="true"><i /></div> }

