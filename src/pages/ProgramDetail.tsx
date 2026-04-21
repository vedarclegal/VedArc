import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { SplitHeading } from '../components/primitives/SplitHeading';
import { Reveal } from '../components/primitives/Reveal';
import { Eyebrow } from '../components/primitives/Eyebrow';
import { BrassRule } from '../components/primitives/BrassRule';
import { MagneticButton } from '../components/primitives/MagneticButton';
import { Spotlight } from '../components/primitives/Spotlight';
import { useProgram, usePrograms } from '../hooks/useContent';
import { courseJsonLd } from '../lib/seo';
import { editorial } from '../lib/motion';

export default function ProgramDetail() {
  const { slug } = useParams();
  const { data: program, isLoading } = useProgram(slug);
  const { data: all = [] } = usePrograms();
  const articleRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ['start start', 'end end'],
  });
  const barWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  if (isLoading) return <div className="container-editorial py-32">Loading…</div>;
  if (!program) return <Navigate to="/programs" replace />;

  const related = all.filter((p) => p.slug !== program.slug && p.track === program.track).slice(0, 2);

  return (
    <>
      <Helmet>
        <title>{program.title} — VedArc Legal</title>
        <meta name="description" content={program.summary} />
        <script type="application/ld+json">{JSON.stringify(courseJsonLd(program))}</script>
      </Helmet>

      {/* Reading progress bar */}
      <div className="pointer-events-none fixed left-0 top-20 z-30 w-full">
        <div className="h-px w-full bg-rule/40">
          <motion.div className="h-px bg-brass" style={{ width: barWidth }} />
        </div>
      </div>

      <div ref={articleRef}>
        {/* HERO */}
        <section className="container-editorial py-24 lg:py-36 relative overflow-hidden">
          <div className="pointer-events-none absolute right-0 top-12 select-none">
            <span className="font-display italic text-[160px] lg:text-[280px] leading-none text-brass/[0.06]">
              {program.serial.split('/')[1]?.trim()}
            </span>
          </div>
          <div className="flex items-center justify-between mb-10">
            <Eyebrow numeral={program.serial.split('/')[1]?.trim()}>
              {program.audience}
            </Eyebrow>
            <Link to="/programs" className="micro editorial-link" data-cursor="link">
              ← All programs
            </Link>
          </div>

          <SplitHeading
            as="h1"
            text={program.title}
            className="text-display-lg leading-[0.95] tracking-tight max-w-5xl"
          />
          <Reveal delay={0.6}>
            <p className="mt-6 font-display italic text-display-sm text-text/65 max-w-3xl">
              {program.subtitle}
            </p>
          </Reveal>

          <div className="mt-12 max-w-2xl">
            <BrassRule duration={1.4} delay={0.9} />
          </div>
        </section>

        {/* DETAIL */}
        <section className="container-editorial pb-32">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-12">
              <Reveal>
                <Eyebrow>Overview</Eyebrow>
                <p className="mt-6 text-[19px] leading-[1.7] text-text/90 text-pretty">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-15%' }}
                    transition={{ duration: 0.9, ease: editorial }}
                    className="float-left mr-2 mt-2 font-display text-[72px] leading-[0.7] text-brass italic"
                  >
                    {program.summary[0]}
                  </motion.span>
                  {program.summary.slice(1)}
                </p>
              </Reveal>

              <Reveal>
                <Spotlight className="border-l-2 border-brass pl-6 py-4" color="rgba(181, 137, 74, 0.1)">
                  <p className="micro mb-3">USP & Target</p>
                  <p className="font-display text-2xl lg:text-[28px] italic leading-snug text-text">
                    {program.usp}
                  </p>
                </Spotlight>
              </Reveal>

              <Reveal>
                <div className="grid grid-cols-2 gap-px bg-rule">
                  <div className="bg-bg p-6 group transition-colors hover:bg-text/[0.02]">
                    <p className="micro mb-3 text-brass">Duration</p>
                    <p className="font-display text-xl">{program.duration}</p>
                  </div>
                  <div className="bg-bg p-6 group transition-colors hover:bg-text/[0.02]">
                    <p className="micro mb-3 text-brass">Format</p>
                    <p className="font-display text-xl">{program.format}</p>
                  </div>
                </div>
              </Reveal>
            </div>

            <aside className="lg:col-span-5 lg:sticky lg:top-32 self-start">
              <Eyebrow>Modules</Eyebrow>
              <ol className="mt-8 space-y-px bg-rule">
                {program.modules.map((m, i) => (
                  <Reveal as="li" key={i} delay={i * 0.04}>
                    <div className="bg-bg flex items-baseline gap-5 p-5 hover:bg-text/[0.03] transition-colors group">
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
                          transition={{ duration: 0.7, delay: 0.15 + i * 0.05, ease: editorial }}
                        />
                      </motion.svg>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-brass/80 w-6 shrink-0">
                        0{i + 1}
                      </span>
                      <span className="text-text/90">{m}</span>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </aside>
          </div>
        </section>
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="container-editorial py-32 border-t border-rule/60">
          <Eyebrow>Related Programs</Eyebrow>
          <ul className="mt-12 grid gap-px bg-rule lg:grid-cols-2">
            {related.map((r) => (
              <li key={r.slug} className="bg-bg group relative overflow-hidden">
                <Link to={`/programs/${r.slug}`} className="block" data-cursor="cta">
                  <Spotlight className="p-8 lg:p-10" color="rgba(181, 137, 74, 0.12)" size={360}>
                    <span className="micro text-brass">{r.serial}</span>
                    <h3 className="mt-4 font-display text-2xl lg:text-3xl italic text-balance transition-transform duration-500 group-hover:-translate-y-0.5">
                      {r.title}
                    </h3>
                    <p className="mt-3 text-text/70">{r.subtitle}</p>
                    <span className="mt-6 inline-flex items-center gap-2 micro group-hover:translate-x-2 transition-transform duration-500">
                      Read →
                    </span>
                  </Spotlight>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* CTA */}
      <section className="container-editorial py-32 text-center">
        <SplitHeading
          as="h2"
          text="Ready to enrol — or design something custom?"
          className="text-display-md leading-[1.05] max-w-4xl mx-auto"
        />
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <MagneticButton to="/contact" variant="oxblood">Begin a Conversation</MagneticButton>
          <MagneticButton to="/programs" variant="ghost">View all programs</MagneticButton>
        </div>
      </section>
    </>
  );
}
