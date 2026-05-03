import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { SplitHeading } from '../components/primitives/SplitHeading';
import { Reveal } from '../components/primitives/Reveal';
import { Eyebrow } from '../components/primitives/Eyebrow';
import { BrassRule } from '../components/primitives/BrassRule';
import { MagneticButton } from '../components/primitives/MagneticButton';
import { Counter } from '../components/primitives/Counter';
import { PortraitFrame } from '../components/primitives/PortraitFrame';
import { Spotlight } from '../components/primitives/Spotlight';

const differentiators = [
  {
    title: 'Cross-Skilling Expertise',
    body: "Litigation insight for corporate lawyers; advisory competence for practising advocates. We don't teach in silos — we upskill and cross-skill.",
  },
  {
    title: 'Practice-Led Learning',
    body: 'Every program is anchored in real disputes, real contracts, and real decisions. No abstract theory, no recycled content.',
  },
  {
    title: 'Indian Legal Context',
    body: 'Programs are designed around domestic statutes, tribunals, and the procedural realities of NCLT, DRT, and high courts.',
  },
  {
    title: 'Expert-Led Faculty',
    body: 'In-house counsels, practising advocates, retired judges, professors, and legal researchers — taught by those who do.',
  },
];

const philosophyPoints = [
  'Knowledge must be structured, applicable, and quietly evolving.',
  'Cross-functional exposure accelerates career growth and professional maturity.',
  'Learning must be anchored in practice, not theory alone.',
  'Every program integrates experiential learning with conceptual clarity.',
];

const panel = [
  { initials: 'AK', name: 'In-House Counsels', role: 'Corporate · Litigation' },
  { initials: 'RS', name: 'Practising Advocates', role: 'Firms · MNCs' },
  { initials: 'PM', name: 'Professors', role: 'Doctrine · Research' },
  { initials: 'JN', name: 'Retired Judges', role: 'Tribunals · Bench' },
];

export default function About() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <>
      <Helmet>
        <title>About — VedArc Legal</title>
        <meta name="description" content="VedArc Legal is a collective of seasoned legal professionals offering cross-skilling for in-house counsel, practising advocates, and law schools." />
      </Helmet>

      {/* HERO */}
      <section ref={heroRef} className="container-editorial py-24 lg:py-40 relative overflow-hidden">
        <motion.div style={{ y: heroY }}>
          <Eyebrow>About VedArc Legal</Eyebrow>
          <div className="mt-10 max-w-5xl">
            <SplitHeading as="h1" text="A collective of" className="text-display-lg leading-[0.95] tracking-tight" />
            <SplitHeading as="h1" text="practising lawyers" className="text-display-lg leading-[0.95] tracking-tight italic text-text/80" delay={0.18} italic />
            <SplitHeading as="h1" text="building a school of practice." className="text-display-lg leading-[0.95] tracking-tight" delay={0.34} />
          </div>
          <div className="mt-12 max-w-2xl">
            <BrassRule duration={1.4} delay={0.9} />
          </div>
        </motion.div>
      </section>

      {/* MEASURE — counters specific to about */}
      <section className="border-y border-rule/60 py-14">
        <div className="container-editorial grid grid-cols-2 gap-y-10 sm:grid-cols-4">
          {[
            { n: 60, label: 'Years of combined practice', suffix: '+' },
            { n: 8, label: 'Sectors covered', suffix: '' },
            { n: 12, label: 'Tribunals & forums', suffix: '+' },
            { n: 4, label: 'Audience tracks', suffix: '' },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="text-center sm:text-left">
              <p className="micro mb-3 text-brass">{String(i + 1).padStart(2, '0')}</p>
              <p className="font-display text-[44px] md:text-[64px] leading-none italic" style={{ fontVariationSettings: '"opsz" 144' }}>
                <Counter to={s.n} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-text/70 text-[15px]">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* VISION + MISSION */}
      <section className="container-editorial py-24 lg:py-32">
        <div className="grid gap-16 md:grid-cols-2">
          <Reveal>
            <Eyebrow>Vision</Eyebrow>
            <h2 className="mt-6 font-display text-display-sm leading-tight italic">
              To redefine legal upskilling for contemporary practice.
            </h2>
            <p className="mt-6 text-text/85 max-w-md">
              A platform where advocates, in-house counsel, and students acquire practical, cross-functional
              capabilities across litigation, advisory, and corporate legal practice — bridging the silos
              that the profession has carried for too long.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>Mission</Eyebrow>
            <h2 className="mt-6 font-display text-display-sm leading-tight italic">
              To deliver structured learning grounded in real legal scenarios.
            </h2>
            <p className="mt-6 text-text/85 max-w-md">
              We combine conceptual clarity with experiential learning so participants develop procedural
              fluency, commercial reasoning, and professional judgement that is immediately useful in
              Indian legal practice.
            </p>
          </Reveal>
        </div>
      </section>

      {/* WHO WE ARE - long form */}
      <section className="bg-surface/60 py-32 lg:py-44">
        <div className="container-editorial">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <Eyebrow>Who We Are</Eyebrow>
            </div>
            <div className="lg:col-span-8 lg:col-start-5 prose-editorial space-y-7 text-[18px] leading-[1.7] text-text/90">
              <Reveal>
                <p className="text-balance">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-20%' }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="float-left mr-3 mt-1 font-display text-[88px] leading-[0.7] text-brass italic"
                  >
                    V
                  </motion.span>
                  edArc Legal is established and led by a collective of seasoned legal professionals — bringing
                  together cross-functional expertise in in-house counsel practice, litigation, and commercial
                  advisory. The founding cohort spans Ed-tech, FMCG, construction contracts, and arbitration,
                  complemented by prior tenures at law firms and hands-on court exposure.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p>
                  Complementing this, the team comprises practising advocates who run their own firms and
                  advise corporate and multinational clients — with extensive experience in high courts,
                  arbitral tribunals, and quasi-judicial forums including <span className="small-caps">NCLT</span> and{' '}
                  <span className="small-caps">DRT</span>, handling complex commercial disputes.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p>
                  Many have collaborated with Senior Advocates and Advocates-on-Record at the Supreme Court,
                  lending strategic insight across litigation and advisory matters. This synergistic blend of
                  in-house and corporate-litigation expertise underpins VedArc Legal's philosophy of
                  cross-skilling.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATORS */}
      <section className="container-editorial py-32 lg:py-44">
        <Eyebrow>What Makes Us Different</Eyebrow>
        <Reveal>
          <h2 className="mt-6 font-display text-display-md leading-[1.05] max-w-3xl">
            Not a conventional law academy — and never trying to be.
          </h2>
        </Reveal>

        <ul className="mt-16 grid gap-px bg-rule lg:grid-cols-2">
          {differentiators.map((d, i) => (
            <Reveal as="li" key={d.title} delay={i * 0.07} className="bg-bg group relative overflow-hidden">
              <Spotlight className="p-10 lg:p-12">
                <div className="mb-5">
                  <motion.span className="block h-px bg-brass/40" initial={{ width: 64 }} whileHover={{ width: 160 }} />
                </div>
                <h3 className="font-display text-2xl lg:text-[30px] leading-tight transition-transform duration-500 group-hover:-translate-y-0.5">
                  {d.title}
                </h3>
                <p className="mt-5 text-text/80 max-w-lg">{d.body}</p>
              </Spotlight>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* PANEL */}
      <section className="container-editorial py-32 lg:py-44">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Our Panel & Speakers</Eyebrow>
            <Reveal>
              <h2 className="mt-6 font-display text-display-sm leading-tight italic">
                From bar rooms to legal heads.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-text/80 max-w-md">
                Programs are curated and delivered by in-house counsels, practising advocates,
                retired judges, professors, and legal researchers.
              </p>
            </Reveal>
          </div>

          <ul className="lg:col-span-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            {panel.map((p, i) => (
              <li key={p.name}>
                <PortraitFrame
                  initials={p.initials}
                  name={p.name}
                  role={p.role}
                  delay={i * 0.08}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="bg-indigo text-ivory py-32 lg:py-44 relative overflow-hidden">
        <div className="container-editorial relative">
          <Eyebrow className="text-ivory/70">Our Philosophy</Eyebrow>
          <Reveal>
            <h2 className="mt-8 font-display text-display-md leading-[1.05] italic max-w-4xl text-balance">
              Inspired by the concept of a Modern Veda for legal professionals.
            </h2>
          </Reveal>
          <ul className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {philosophyPoints.map((point, i) => (
              <Reveal as="li" key={i} delay={i * 0.06}>
                <span className="font-mono text-[11px] uppercase tracking-widest text-brass">
                  0{i + 1}
                </span>
                <p className="mt-6 font-display text-lg leading-snug italic text-ivory/90">
                  {point}
                </p>
                <span className="mt-6 block h-px w-10 bg-brass" />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="container-editorial py-32 text-center">
        <SplitHeading
          as="h2"
          text="Discover how VedArc Legal can elevate your practice."
          className="text-display-md leading-[1.05] max-w-4xl mx-auto"
        />
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <MagneticButton to="/programs" variant="primary">Explore Programs</MagneticButton>
          <MagneticButton to="/contact" variant="ghost">Request a Consultation</MagneticButton>
        </div>
      </section>
    </>
  );
}
