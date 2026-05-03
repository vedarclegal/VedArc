import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { SplitHeading } from '../components/primitives/SplitHeading';
import { Reveal } from '../components/primitives/Reveal';
import { Eyebrow } from '../components/primitives/Eyebrow';
import { BrassRule } from '../components/primitives/BrassRule';
import { Spotlight } from '../components/primitives/Spotlight';
import { usePrograms, type Program } from '../hooks/useContent';
import { editorial } from '../lib/motion';

type Track = 'all' | 'individual' | 'corporate' | 'academic';

const tabs: { id: Track; label: string }[] = [
  { id: 'all', label: 'All Programs' },
  { id: 'individual', label: 'Individual' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'academic', label: 'Academic' },
];

export default function Programs() {
  const [track, setTrack] = useState<Track>('all');
  const { data: all = [] } = usePrograms();
  const list = track === 'all' ? all : all.filter((p) => p.track === track);

  return (
    <>
      <Helmet>
        <title>Programs — VedArc Legal</title>
        <meta name="description" content="Cross-skilling programs in litigation, contract drafting, and advisory practice — for in-house counsel, advocates, and law schools." />
      </Helmet>

      <section className="container-editorial py-24 lg:py-40 relative overflow-hidden">
        <Eyebrow>The Programs</Eyebrow>
        <div className="mt-10">
          <SplitHeading as="h1" text="Cross-skilling for" className="text-display-lg leading-[0.95] tracking-tight" />
          <SplitHeading as="h1" text="modern legal practice." className="text-display-lg leading-[0.95] tracking-tight italic text-text/85" delay={0.18} italic />
        </div>
        <Reveal delay={0.7}>
          <p className="mt-12 max-w-2xl text-text/80">
            Our programs help legal professionals move beyond traditional silos — building practical
            competence, procedural fluency, and commercial judgement across litigation and advisory roles.
          </p>
        </Reveal>
        <div className="mt-12 max-w-3xl">
          <BrassRule duration={1.4} delay={0.9} />
        </div>
      </section>

      {/* TABS */}
      <section className="sticky top-20 z-20 bg-bg/85 backdrop-blur-md border-y border-rule/60">
        <div className="container-editorial flex items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1 py-4 -mx-2 overflow-x-auto">
            {tabs.map((t) => {
              const active = track === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTrack(t.id)}
                  className="relative px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-text/70 hover:text-text transition-colors"
                  data-cursor="link"
                >
                  {t.label}
                  {active && (
                    <motion.span
                      layoutId="track-rule"
                      className="absolute inset-x-3 -bottom-px h-px bg-brass"
                      transition={{ duration: 0.42, ease: editorial }}
                    />
                  )}
                </button>
              );
            })}
          </div>
          <span className="hidden md:inline-block micro tabular-nums text-text/60">
            {String(list.length).padStart(2, '0')} / {String(all.length).padStart(2, '0')}
          </span>
        </div>
      </section>

      {/* GRID */}
      <section className="container-editorial py-24">
        <AnimatePresence mode="wait">
          <motion.ul
            key={track}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.36, ease: editorial }}
            className="grid gap-px bg-rule lg:grid-cols-2"
          >
            {list.map((p, i) => (
              <ProgramCard key={p.slug} program={p} index={i} />
            ))}
          </motion.ul>
        </AnimatePresence>
        {list.length === 0 && (
          <p className="text-center text-text/60 py-20">No programs in this track yet.</p>
        )}
      </section>
    </>
  );
}

function ProgramCard({ program: p, index }: { program: Program; index: number }) {
  return (
    <motion.li
      className="group relative bg-bg overflow-hidden"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: editorial }}
    >
      <Link to={`/programs/${p.slug}`} className="block" data-cursor="cta">
        <Spotlight className="p-8 lg:p-10" color="rgba(181, 137, 74, 0.14)" size={380}>
          <div className="flex items-center justify-between mb-8">
            <span className="font-mono text-[11px] uppercase tracking-widest text-brass transition-transform duration-500 group-hover:-translate-x-2">
              {p.serial}
            </span>
            <span className="micro">{p.audience}</span>
          </div>

          <h3 className="font-display text-3xl lg:text-[40px] leading-[1.05] italic text-balance transition-transform duration-500 group-hover:-translate-y-0.5">
            {p.title}
          </h3>
          <p className="mt-3 text-text/65 text-[15px]">{p.subtitle}</p>

          <p className="mt-6 text-text/80 max-w-xl">{p.summary}</p>

          {/* Reveal on hover - peek of USP */}
          <div className="mt-6 max-h-0 overflow-hidden transition-[max-height] duration-700 ease-editorial group-hover:max-h-32">
            <p className="border-l-2 border-brass pl-4 italic text-text/75 text-[15px]">
              {p.usp}
            </p>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <span className="micro flex items-center gap-3">
              <span className="text-brass">◆</span>
              {p.duration}
            </span>
            <span className="micro flex items-center gap-2 text-text transition-transform duration-500 group-hover:translate-x-2">
              Read program
              <span>→</span>
            </span>
          </div>

          {/* Brass corner brackets */}
          <span className="absolute left-0 top-0 h-8 w-8 border-l border-t border-brass opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:h-10 group-hover:w-10" />
          <span className="absolute right-0 top-0 h-8 w-8 border-r border-t border-brass opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:h-10 group-hover:w-10" />
          <span className="absolute left-0 bottom-0 h-8 w-8 border-l border-b border-brass opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:h-10 group-hover:w-10" />
          <span className="absolute right-0 bottom-0 h-8 w-8 border-r border-b border-brass opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:h-10 group-hover:w-10" />
        </Spotlight>
      </Link>
    </motion.li>
  );
}
