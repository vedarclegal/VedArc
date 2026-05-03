import { useState, type FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { SplitHeading } from '../components/primitives/SplitHeading';
import { Reveal } from '../components/primitives/Reveal';
import { Eyebrow } from '../components/primitives/Eyebrow';
import { BrassRule } from '../components/primitives/BrassRule';
import { editorial } from '../lib/motion';
import { cn } from '../lib/cn';

const intents = [
  'I am an in-house counsel',
  'I am a practising advocate',
  'I represent a corporate legal team',
  'I represent a university or law school',
  'I am exploring an alliance',
  'Other',
];

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
    const data = new FormData(e.currentTarget);
    try {
      if (endpoint) {
        await fetch(endpoint, { method: 'POST', body: data });
      } else {
        await new Promise((r) => setTimeout(r, 900));
      }
      setDone(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Contact — VedArc Legal</title>
        <meta name="description" content="Begin a conversation with VedArc Legal — for programs, partnerships, and proposals." />
      </Helmet>

      <section className="container-editorial py-24 lg:py-40 relative overflow-hidden">
        <Eyebrow>Begin a Conversation</Eyebrow>
        <div className="mt-10 max-w-5xl">
          <SplitHeading as="h1" text="Tell us where" className="text-display-lg leading-[0.95] tracking-tight" />
          <SplitHeading as="h1" text="you stand." className="text-display-lg leading-[0.95] tracking-tight italic text-text/85" delay={0.18} italic />
          <SplitHeading as="h1" text="We will tell you the rest." className="text-display-lg leading-[0.95] tracking-tight" delay={0.34} />
        </div>
        <div className="mt-12 max-w-3xl">
          <BrassRule duration={1.4} delay={0.9} />
        </div>
      </section>

      <section className="container-editorial pb-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow>Direct</Eyebrow>
            <a href="mailto:hello@vedarclegal.in" className="editorial-link mt-6 block font-display text-2xl italic" data-cursor="link">
              hello@vedarclegal.in
            </a>
            <p className="mt-8 text-text/75 max-w-xs">
              For programs, partnerships, and bespoke proposals. We respond within two working days.
            </p>
            <div className="mt-12 space-y-3">
              <p className="micro">VedArc Legal</p>
              <p className="text-text/75">New Delhi, India</p>
            </div>

            {/* hours card */}
            <div className="mt-16 border-t border-rule pt-8">
              <p className="micro text-brass mb-4">Office hours · IST</p>
              <ul className="space-y-2 text-text/75 text-[15px]">
                <li className="flex justify-between">
                  <span>Mon — Fri</span>
                  <span className="font-mono tabular-nums">10:00 — 19:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Sat</span>
                  <span className="font-mono tabular-nums">11:00 — 16:00</span>
                </li>
                <li className="flex justify-between text-text/50">
                  <span>Sun</span>
                  <span className="font-mono tabular-nums">Closed</span>
                </li>
              </ul>
            </div>
          </Reveal>

          <div className="lg:col-span-7 lg:col-start-6">
            <AnimatePresence mode="wait">
              {!done ? (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease: editorial }}
                  className="space-y-10"
                >
                  <div className="grid gap-10 sm:grid-cols-2">
                    <Field label="Your name" name="name" required />
                    <Field label="Email" name="email" type="email" required />
                  </div>
                  <div className="grid gap-10 sm:grid-cols-2">
                    <Field label="Role" name="role" />
                    <Field label="Organisation" name="organisation" />
                  </div>

                  <CustomSelect label="What brings you here?" name="intent" options={intents} />

                  <Field label="Tell us a little more" name="message" textarea />

                  <div className="pt-4 flex items-center justify-between flex-wrap gap-6">
                    <p className="micro max-w-md text-muted">
                      By submitting you agree to be contacted about your enquiry. We do not share details.
                    </p>
                    <button
                      type="submit"
                      disabled={submitting}
                      data-cursor="cta"
                      className="group relative inline-flex items-center gap-3 bg-oxblood px-8 py-4 font-mono text-[11px] uppercase tracking-widest text-ivory transition-colors hover:bg-oxblood/90 disabled:opacity-60 overflow-hidden"
                    >
                      {/* Submitting brass progress */}
                      <span
                        className={cn(
                          'absolute inset-x-0 bottom-0 h-px bg-brass origin-left transition-transform duration-1000',
                          submitting ? 'scale-x-100' : 'scale-x-0',
                        )}
                      />
                      <span>{submitting ? 'Sending' : 'Send Enquiry'}</span>
                      <span className={cn('transition-transform', submitting ? 'animate-spin' : 'group-hover:translate-x-1')}>
                        {submitting ? '◆' : '→'}
                      </span>
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: editorial }}
                  className="border border-brass p-12 relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 origin-left bg-brass/5"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.4, ease: editorial }}
                  />
                  <div className="relative">
                    <motion.svg
                      width="42"
                      height="42"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgb(var(--brass))"
                      strokeWidth="1.5"
                    >
                      <motion.path
                        d="M4 12 L10 18 L20 6"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.9, ease: editorial }}
                      />
                    </motion.svg>
                    <h3 className="mt-6 font-display text-display-sm italic">Received.</h3>
                    <p className="mt-4 text-text/80 max-w-md">
                      Thank you. A member of our team will write back within two working days.
                    </p>
                    <p className="micro mt-8 text-brass">VL · 2026</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = 'text',
  textarea,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const floating = focused || value.length > 0;

  const sharedProps = {
    name,
    required,
    value,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValue(e.target.value),
    className: 'w-full bg-transparent pt-7 pb-3 text-text outline-none',
  };

  return (
    <label className="relative block">
      <span
        className={cn(
          'absolute left-0 transition-all duration-300 ease-editorial',
          floating
            ? 'top-0 text-[10px] uppercase tracking-widest text-brass'
            : 'top-7 text-base text-text/55',
        )}
      >
        {label}
        {required && <span className="text-brass"> *</span>}
      </span>
      {textarea ? (
        <textarea rows={4} {...sharedProps} />
      ) : (
        <input type={type} {...sharedProps} />
      )}
      <span className="absolute bottom-0 left-0 h-px w-full bg-rule" />
      <motion.span
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-brass"
        initial={false}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.5, ease: editorial }}
      />
    </label>
  );
}

function CustomSelect({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <input type="hidden" name={name} value={value} />
      <p className="micro mb-4">{label}</p>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="group flex w-full items-center justify-between border-b border-rule py-3 text-left text-text outline-none focus:border-brass transition-colors"
        data-cursor="link"
      >
        <span className={cn('transition-colors', !value && 'text-text/55')}>
          {value || 'Choose one…'}
        </span>
        <motion.span
          className="text-brass"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: editorial }}
        >
          ↓
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: editorial }}
            className="absolute left-0 right-0 top-full z-20 mt-1 border border-rule bg-bg shadow-lg"
          >
            {options.map((o, i) => (
              <motion.li
                key={o}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setValue(o);
                    setOpen(false);
                  }}
                  className="group flex w-full items-center justify-between px-5 py-3.5 text-left text-text/85 transition-colors hover:bg-text/[0.04] hover:text-text"
                  data-cursor="link"
                >
                  <span className="flex items-center gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-brass/70 w-6">
                      0{i + 1}
                    </span>
                    {o}
                  </span>
                  <span className="text-brass opacity-0 transition-opacity group-hover:opacity-100">→</span>
                </button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
