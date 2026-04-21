import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { SplitHeading } from '../components/primitives/SplitHeading';
import { Reveal } from '../components/primitives/Reveal';
import { Eyebrow } from '../components/primitives/Eyebrow';
import { BrassRule } from '../components/primitives/BrassRule';
import { MagneticButton } from '../components/primitives/MagneticButton';
import { Marquee } from '../components/primitives/Marquee';
import { Counter } from '../components/primitives/Counter';
import { Spotlight } from '../components/primitives/Spotlight';
import { usePrograms, useTestimonials } from '../hooks/useContent';
import site from '../content/site.json';

export default function Home() {
  const { data: programs = [] } = usePrograms();
  const { data: testimonials = [] } = useTestimonials();

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const heroBlur = useTransform(scrollYProgress, [0, 1], ['blur(0px)', 'blur(2px)']);

  return (
    <>
      <Helmet>
        <title>VedArc Legal — A modern veda for Indian legal practice</title>
        <meta
          name="description"
          content="Practice-driven legal upskilling for in-house counsel, practising advocates, and law schools."
        />
      </Helmet>

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[100svh] overflow-hidden">
        {/* Decorative number marker, large faded in corner */}
        <div className="pointer-events-none absolute right-6 top-24 select-none lg:right-12">
          <span className="font-display italic text-[120px] sm:text-[180px] lg:text-[240px] leading-none text-brass/[0.07]">
            I
          </span>
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity, filter: heroBlur }}
          className="container-editorial relative flex min-h-[100svh] flex-col justify-end pt-24 pb-20"
        >
          <div className="flex items-center justify-between mb-12">
            <Eyebrow numeral="I">An Introduction</Eyebrow>
            <span className="micro hidden md:inline-block">Est. MMXXVI · New Delhi</span>
          </div>

          <SplitHeading
            as="h1"
            text="A modern veda"
            className="text-display-xl leading-[0.92] tracking-tight"
          />
          <SplitHeading
            as="h1"
            text="for Indian"
            className="text-display-xl leading-[0.92] tracking-tight italic text-text/85"
            delay={0.18}
            italic
          />
          <SplitHeading
            as="h1"
            text="legal practice."
            className="text-display-xl leading-[0.92] tracking-tight"
            delay={0.34}
          />

          <div className="mt-12">
            <BrassRule duration={1.6} delay={1.1} />
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-12">
            <Reveal delay={1.3} className="md:col-span-6 lg:col-span-5">
              <p className="text-body-lg text-text/85 text-pretty">
                A practice-driven upskilling platform for the legal professionals India will rely on next —
                in-house counsel managing disputes, advocates writing the next generation of contracts,
                and the law schools teaching them.
              </p>
            </Reveal>
            <Reveal delay={1.5} className="md:col-span-5 md:col-start-8 flex md:justify-end items-end">
              <div className="flex flex-wrap gap-4">
                <MagneticButton to="/programs" variant="primary">
                  Explore Programs
                </MagneticButton>
                <MagneticButton to="/about" variant="ghost">
                  Our Approach
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 micro flex flex-col items-center gap-2"
        >
          <motion.span
            className="block h-10 w-px bg-brass/70 origin-top"
            animate={{ scaleY: [0.2, 1, 0.2] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span>Scroll</span>
        </motion.div>
      </section>

      {/* MEASURE STRIP — counters */}
      <section className="border-y border-rule/60 py-14">
        <div className="container-editorial grid grid-cols-2 gap-y-10 sm:grid-cols-4">
          {[
            { n: 7, label: 'Programs', suffix: '' },
            { n: 24, label: 'Faculty & advisors', suffix: '+' },
            { n: 4, label: 'Audiences served', suffix: '' },
            { n: 100, label: 'Practice-led', suffix: '%' },
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

      {/* PILLARS */}
      <section className="py-32 lg:py-44">
        <div className="container-editorial">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
              <Eyebrow numeral="II">The Approach</Eyebrow>
              <Reveal>
                <h2 className="font-display text-display-md mt-6 leading-[1.05] text-balance">
                  Knowledge that is structured, applicable, and quietly evolving.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-md text-text/80">
                  VedArc Legal is built on the belief that legal knowledge must evolve with responsibility.
                  We combine doctrinal clarity with the contextual judgement that real practice demands.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-8">
              <ul className="grid gap-px bg-rule sm:grid-cols-2">
                {site.pillars.map((p, i) => (
                  <Reveal as="li" key={p.numeral} delay={i * 0.08} className="bg-bg p-8 lg:p-10 group relative overflow-hidden">
                    <div className="flex items-baseline justify-between mb-6">
                      <span className="font-mono text-[11px] uppercase tracking-widest text-brass">
                        {p.numeral}
                      </span>
                      <motion.span
                        className="h-px bg-brass/40"
                        initial={{ width: 16 }}
                        whileHover={{ width: 64 }}
                      />
                    </div>
                    <h3 className="font-display text-2xl lg:text-[28px] leading-tight transition-transform duration-500 group-hover:-translate-y-0.5">
                      {p.title}
                    </h3>
                    <p className="mt-4 text-text/80">{p.body}</p>
                    {/* Underline grows on hover */}
                    <span className="absolute left-8 right-8 lg:left-10 lg:right-10 bottom-6 h-px origin-left scale-x-0 bg-brass transition-transform duration-700 group-hover:scale-x-100" />
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="py-12">
        <Marquee items={programs.slice(0, 6).map((p) => p.title)} speed={28} />
      </section>

      {/* WHO WE SERVE */}
      <section className="py-32 lg:py-44">
        <div className="container-editorial">
          <Eyebrow numeral="III">Who We Serve</Eyebrow>
          <div className="mt-8 grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <h2 className="font-display text-display-md leading-[1.05] text-balance">
                Built for the lawyers who do the work — not the ones who only write about it.
              </h2>
            </Reveal>
            <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9 self-end">
              <p className="text-text/80">
                Each program is anchored in real disputes, real contracts, and real decision-making.
                We teach what is actually needed in practice, not what looks good in a syllabus.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-px bg-rule lg:grid-cols-4">
            {site.audiences.map((a, i) => (
              <Reveal
                key={a.label}
                delay={i * 0.06}
                className="bg-bg p-8 lg:p-10 group relative overflow-hidden"
              >
                <div className="micro mb-8 flex items-center gap-3">
                  <span className="text-brass">0{i + 1}</span>
                </div>
                <h3 className="font-display text-xl lg:text-[26px] leading-tight italic">
                  {a.label}
                </h3>
                <p className="mt-5 text-text/80 text-[15px] leading-relaxed">{a.summary}</p>
                <div className="mt-8 h-px w-0 bg-brass transition-all duration-700 group-hover:w-full" />
                {/* peek arrow */}
                <span className="absolute right-8 bottom-8 font-mono text-[14px] text-brass opacity-0 -translate-x-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                  →
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS PREVIEW */}
      <section className="py-32 lg:py-44">
        <div className="container-editorial">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <Eyebrow numeral="IV">The Programs</Eyebrow>
              <Reveal>
                <h2 className="mt-6 font-display text-display-md leading-[1.05] text-balance max-w-3xl">
                  Cross-skilling, end to end. Litigation for the corporate; advisory for the litigator.
                </h2>
              </Reveal>
            </div>
            <Link to="/programs" className="micro editorial-link self-start md:self-end" data-cursor="link">
              View all programs →
            </Link>
          </div>

          <ul className="border-t border-rule">
            {programs.slice(0, 5).map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 0.05}>
                <Link
                  to={`/programs/${p.slug}`}
                  className="group relative grid grid-cols-12 items-center gap-4 border-b border-rule py-7 lg:py-9 transition-colors"
                  data-cursor="cta"
                >
                  {/* Hover sweep */}
                  <span className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-text/[0.03] transition-transform duration-700 ease-editorial group-hover:scale-x-100" />
                  <span className="col-span-2 font-mono text-[11px] uppercase tracking-widest text-brass transition-transform duration-500 group-hover:-translate-x-2">
                    {p.serial}
                  </span>
                  <span className="col-span-7 lg:col-span-6 font-display text-2xl lg:text-3xl leading-tight transition-[letter-spacing] duration-500 group-hover:tracking-[-0.005em]">
                    {p.title}
                  </span>
                  <span className="hidden lg:inline-block lg:col-span-3 micro">{p.audience}</span>
                  <span className="col-span-3 lg:col-span-1 text-right font-mono text-sm transition-transform duration-500 group-hover:translate-x-3">
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* TESTIMONIAL */}
      {testimonials[0] && (
        <section className="py-32 lg:py-44">
          <div className="container-editorial max-w-5xl">
            <Eyebrow numeral="V">In Their Words</Eyebrow>
            <Reveal>
              <blockquote className="mt-12">
                <motion.span
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-15%' }}
                  transition={{ duration: 0.8 }}
                  className="block font-display text-[120px] leading-none italic text-brass/80"
                  aria-hidden
                >
                  “
                </motion.span>
                <p className="mt-2 font-display text-display-md leading-[1.1] italic text-balance -mt-6 pl-12">
                  {testimonials[0].quote}
                </p>
                <footer className="mt-10 flex items-center gap-4 pl-12">
                  <span className="h-px w-12 bg-brass" />
                  <span className="micro">
                    {testimonials[0].author} · {testimonials[0].role}
                  </span>
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </section>
      )}

      {/* CLOSING CTA */}
      <section className="relative my-12">
        <div className="container-editorial">
          <Spotlight
            color="rgba(181, 137, 74, 0.22)"
            size={520}
            className="bg-indigo text-ivory rounded-none px-8 py-20 lg:px-20 lg:py-32"
          >
            <div className="absolute inset-0 opacity-20" aria-hidden>
              <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                  <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgb(181 137 74 / 0.4)" strokeWidth="0.2" />
                </pattern>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
            </div>
            <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <Eyebrow numeral="VI" className="text-ivory/70">
                  Begin
                </Eyebrow>
                <h2 className="mt-6 font-display text-display-lg leading-[1] italic text-balance">
                  Sharper minds make a quieter profession.
                </h2>
                <p className="mt-6 max-w-xl text-ivory/75">
                  Whether you are an in-house counsel, a practising advocate, a corporate team or a law school —
                  we will tell you the truth about how to get better.
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <MagneticButton to="/contact" variant="oxblood">
                  Begin a Conversation
                </MagneticButton>
              </div>
            </div>
          </Spotlight>
        </div>
      </section>
    </>
  );
}
