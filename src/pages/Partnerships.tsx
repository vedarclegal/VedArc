import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { SplitHeading } from '../components/primitives/SplitHeading';
import { Reveal } from '../components/primitives/Reveal';
import { Eyebrow } from '../components/primitives/Eyebrow';
import { BrassRule } from '../components/primitives/BrassRule';
import { MagneticButton } from '../components/primitives/MagneticButton';
import { Spotlight } from '../components/primitives/Spotlight';
import { editorial } from '../lib/motion';

const models = [
  {
    name: 'Corporate Partnerships',
    objective:
      'Upskill and cross-skill in-house teams with practical litigation, advisory, and risk-management expertise.',
    offerings: [
      'Hands-on modules for litigation, dispute resolution, contract risk',
      'Advisory programs for commercial decision-making and drafting',
      'Case-study workshops, mock exercises, scenario-based learning',
      'On-demand sessions for specific challenges or priorities',
    ],
    cta: 'Request Corporate Training',
  },
  {
    name: 'Academic Partnerships',
    objective:
      'Prepare law students with practice-ready skills in contracts, advisory, and litigation.',
    offerings: [
      'Curriculum integration with universities and law schools',
      'Co-branded workshops, seminars, and mentorship programs',
      'Internship and live case-study exposure with corporate clients',
      'Guest lectures by founding team and advisory board',
    ],
    cta: 'Collaborate with Us',
  },
  {
    name: 'Strategic Alliances',
    objective:
      'Collaborate with law firms, professional networks, and industry associations to co-create or deliver programs.',
    offerings: [
      'Joint workshops, webinars, continuing legal education',
      'Co-branded initiatives to expand professional learning reach',
      'Access to founding team, advisory board, and panel of experts',
    ],
    cta: 'Explore Alliance Opportunities',
  },
];

const howWeWork = [
  { label: 'Tailored Programs', body: 'Designed around organisational priorities, sector, or academic objectives.' },
  { label: 'Flexible Delivery', body: 'Online, on-campus, or hybrid programs to suit your schedule and audience.' },
  { label: 'Practical Learning', body: 'Case studies, real disputes, advisory exercises, and contract simulations.' },
  { label: 'Measurable Outcomes', body: 'Feedback, assessments, and progress visibility to quantify learning impact.' },
];

export default function Partnerships() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <>
      <Helmet>
        <title>Partnerships — VedArc Legal</title>
        <meta name="description" content="Partner with VedArc Legal to upskill corporate legal teams, law students, and professional networks." />
      </Helmet>

      <section ref={heroRef} className="container-editorial py-24 lg:py-40 relative overflow-hidden">
        <motion.div style={{ y: heroY }}>
          <Eyebrow>Partnerships</Eyebrow>
          <div className="mt-10 max-w-5xl">
            <SplitHeading as="h1" text="From Bar Rooms" className="text-display-lg leading-[0.95] tracking-tight" />
            <SplitHeading as="h1" text="to Legal Heads." className="text-display-lg leading-[0.95] tracking-tight italic text-text/85" delay={0.18} italic />
          </div>
          <Reveal delay={0.7}>
            <p className="mt-12 max-w-2xl text-text/80">
              Practice-driven upskilling and cross-skilling programs for organisations, universities,
              institutions, and professional networks across the Indian legal ecosystem.
            </p>
          </Reveal>
          <div className="mt-12 max-w-3xl">
            <BrassRule duration={1.4} delay={0.9} />
          </div>
        </motion.div>
      </section>

      {/* WHY PARTNER */}
      <section className="container-editorial py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Why Partner</Eyebrow>
            <Reveal>
              <h2 className="mt-6 font-display text-display-sm leading-tight italic">
                We do not teach. We upskill and cross-skill.
              </h2>
            </Reveal>
          </div>
          <ul className="lg:col-span-8 grid gap-px bg-rule sm:grid-cols-2">
            {[
              ['Expert-Led Programs', 'In-house counsels, advocates, retired judges, academics.'],
              ['Practice-Oriented', 'Real disputes, contracts, advisory scenarios — practical competence.'],
              ['Scalable & Flexible', 'Tailored for corporates, universities, law schools, networks.'],
              ['Indian Legal Context', 'Aligned with statutes, tribunals, governance, procedure.'],
              ['Measurable Impact', 'Outcome-focused with feedback, tracking, and practical application.'],
              ['Long-Term Value', 'Programs built to deepen capability — not chase a certificate.'],
            ].map(([title, body], i) => (
              <Reveal as="li" key={title} delay={i * 0.05} className="bg-bg group relative overflow-hidden">
                <Spotlight className="p-6 lg:p-8" color="rgba(181, 137, 74, 0.1)" size={300}>
                  <h3 className="mt-3 font-display text-xl italic">{title}</h3>
                  <p className="mt-2 text-text/75 text-[15px]">{body}</p>
                </Spotlight>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* MODELS - alternating full bleed */}
      {models.map((m, i) => (
        <section
          key={m.name}
          className={i % 2 === 1 ? 'bg-surface/60 py-32 lg:py-44 relative overflow-hidden' : 'py-32 lg:py-44 relative overflow-hidden'}
        >
          <div className="container-editorial relative">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <Reveal>
                  <h2 className="font-display text-display-md leading-[1.05] italic">
                    {m.name}
                  </h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="mt-6 text-text/80 max-w-md">{m.objective}</p>
                </Reveal>
                <div className="mt-10">
                  <MagneticButton to="/contact" variant={i === 0 ? 'oxblood' : 'primary'}>
                    {m.cta}
                  </MagneticButton>
                </div>
              </div>

              <ul className="lg:col-span-6 lg:col-start-7 space-y-px bg-rule">
                {m.offerings.map((o, oi) => (
                  <Reveal as="li" key={oi} delay={oi * 0.05}>
                    <div className="bg-bg p-5 lg:p-6 flex items-baseline gap-5 group hover:bg-text/[0.02] transition-colors">
                      <motion.svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgb(var(--brass))"
                        strokeWidth="2"
                        className="mt-1 shrink-0"
                      >
                        <motion.path
                          d="M4 12 L10 18 L20 6"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.1 + oi * 0.05, ease: editorial }}
                        />
                      </motion.svg>
                      <span className="text-text/90">{o}</span>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      {/* HOW WE WORK */}
      <section className="container-editorial py-32">
        <Eyebrow>How We Work</Eyebrow>
        <Reveal>
          <h2 className="mt-6 font-display text-display-md leading-[1.05] max-w-3xl">
            Customised, practical, and outcome-oriented.
          </h2>
        </Reveal>
        <ol className="mt-16 grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-4 relative">
          {howWeWork.map((s, i) => (
            <Reveal as="li" key={s.label} delay={i * 0.07} className="bg-bg p-8 lg:p-10 group relative overflow-hidden">
              <h3 className="font-display text-2xl italic transition-transform duration-500 group-hover:-translate-y-0.5">
                {s.label}
              </h3>
              <p className="mt-3 text-text/75 text-[15px]">{s.body}</p>
              {/* Connecting line on hover */}
              <span className="absolute bottom-6 left-8 right-8 lg:left-10 lg:right-10 h-px origin-left scale-x-0 bg-brass transition-transform duration-700 group-hover:scale-x-100" />
            </Reveal>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="container-editorial py-32">
        <Spotlight className="bg-indigo text-ivory px-8 py-20 lg:px-20 lg:py-28" color="rgba(181, 137, 74, 0.2)" size={520}>
          <Eyebrow className="text-ivory/70">Begin</Eyebrow>
          <h2 className="mt-6 font-display text-display-md italic max-w-3xl text-balance">
            Schedule a partnership discussion.
          </h2>
          <div className="mt-10 flex flex-wrap gap-4">
            <MagneticButton to="/contact" variant="oxblood">Schedule a Discussion</MagneticButton>
            <MagneticButton href="mailto:hello@vedarclegal.in" variant="ghost" className="text-ivory border-ivory/30 hover:text-brass hover:border-brass">
              Request a Custom Proposal
            </MagneticButton>
          </div>
        </Spotlight>
      </section>
    </>
  );
}
