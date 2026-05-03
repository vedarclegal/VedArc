import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Eyebrow } from '../../components/primitives/Eyebrow';
import { SplitHeading } from '../../components/primitives/SplitHeading';
import { BrassRule } from '../../components/primitives/BrassRule';
import { Reveal } from '../../components/primitives/Reveal';
import { cn } from '../../lib/cn';

type LegalSection = {
  heading: string;
  body: string[];
};

type LegalDoc = {
  title: string;
  eyebrow: string;
  file: string;
};

const docs: Record<string, LegalDoc> = {
  terms: {
    title: 'Terms and Conditions',
    eyebrow: 'Legal',
    file: '/legal/terms.txt',
  },
  privacy: {
    title: 'Privacy Policy',
    eyebrow: 'Legal',
    file: '/legal/privacy.txt',
  },
  'intellectual-property': {
    title: 'Intellectual Property Policy',
    eyebrow: 'Legal',
    file: '/legal/intellectual-property.txt',
  },
  cookies: {
    title: 'Cookie Policy',
    eyebrow: 'Legal',
    file: '/legal/cookies.txt',
  },
};

function parseLegalText(text: string): { intro: string[]; sections: LegalSection[] } {
  const lines = text
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const startIndex = lines.findIndex((line) => /^\d+(\.\d+)?\.\s+/.test(line));
  if (startIndex === -1) {
    return { intro: lines.slice(2), sections: [] };
  }

  const intro = lines.slice(2, Math.max(startIndex, 2));
  const sections: LegalSection[] = [];

  lines.slice(startIndex).forEach((line) => {
    const headingMatch = line.match(/^(\d+(?:\.\d+)?)\.\s+(.+)$/);
    if (headingMatch) {
      sections.push({ heading: headingMatch[2], body: [] });
      return;
    }
    const current = sections[sections.length - 1];
    if (current) current.body.push(line);
  });

  return { intro, sections };
}

export default function Legal() {
  const { slug } = useParams();
  const resolvedSlug = slug === 'ip' ? 'intellectual-property' : slug;
  const doc = resolvedSlug ? docs[resolvedSlug] : undefined;
  const articleRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ['start start', 'end end'],
  });
  const barWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const [activeIdx, setActiveIdx] = useState(0);
  const [rawText, setRawText] = useState('');

  const parsed = useMemo(() => parseLegalText(rawText), [rawText]);
  const lastUpdated = useMemo(() => {
    const match = rawText.match(/^Last Updated:\s*(.+)$/m);
    return match?.[1] ?? '3 May 2026';
  }, [rawText]);

  useEffect(() => {
    if (!doc) return;
    let cancelled = false;
    setRawText('');
    fetch(doc.file)
      .then((res) => {
        if (!res.ok) throw new Error(`Unable to load ${doc.file}`);
        return res.text();
      })
      .then((text) => {
        if (!cancelled) setRawText(text);
      })
      .catch(() => {
        if (!cancelled) setRawText('');
      });

    return () => {
      cancelled = true;
    };
  }, [doc]);

  useEffect(() => {
    if (!doc || parsed.sections.length === 0) return;
    const sectionEls = parsed.sections.map((_, i) => document.getElementById(`sec-${i}`));
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.3;
      let next = 0;
      sectionEls.forEach((el, i) => {
        if (el && el.offsetTop <= y) next = i;
      });
      setActiveIdx(next);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [doc, parsed.sections]);

  if (!doc) return <Navigate to="/" replace />;

  return (
    <>
      <Helmet>
        <title>{doc.title} — VedArc Legal</title>
      </Helmet>

      {/* Reading progress bar */}
      <div className="pointer-events-none fixed left-0 top-20 z-30 w-full">
        <div className="h-px w-full bg-rule/40">
          <motion.div className="h-px bg-brass" style={{ width: barWidth }} />
        </div>
      </div>

      <section className="container-editorial py-24 lg:py-36 relative overflow-hidden">
        <Eyebrow>{doc.eyebrow}</Eyebrow>
        <div className="mt-10 max-w-4xl">
          <SplitHeading
            as="h1"
            text={doc.title}
            className="text-display-lg leading-[0.95] tracking-tight"
          />
        </div>
        <div className="mt-12 max-w-2xl">
          <BrassRule duration={1.4} delay={0.7} />
        </div>
      </section>

      <section className="container-editorial pb-32" ref={articleRef}>
        <div className="grid gap-16 lg:grid-cols-12">
          <aside className="lg:col-span-3 lg:sticky lg:top-32 self-start">
            <Eyebrow>Contents</Eyebrow>
            <ol className="mt-6 space-y-3">
              {parsed.sections.map((s, i) => (
                <li key={s.heading} className="relative">
                  <a
                    href={`#sec-${i}`}
                    className={cn(
                      'micro block transition-colors',
                      activeIdx === i ? 'text-text' : 'text-text/55 hover:text-text/80',
                    )}
                    data-cursor="link"
                  >
                    <span className="flex items-baseline gap-3">
                      <motion.span
                        className="h-px shrink-0 bg-brass"
                        animate={{ width: activeIdx === i ? 24 : 8 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      />
                      <span>{s.heading}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <article className="lg:col-span-8 lg:col-start-5 space-y-14">
            {parsed.intro.length > 0 && (
              <Reveal>
                <div className="space-y-4 text-[18px] leading-[1.7] text-text/85 max-w-2xl">
                  {parsed.intro.map((paragraph) => (
                    <LegalBlock key={paragraph} text={paragraph} />
                  ))}
                </div>
              </Reveal>
            )}
            {parsed.sections.map((s, i) => (
              <Reveal key={i}>
                <section id={`sec-${i}`} className="scroll-mt-32">
                  <h2 className="font-display text-display-sm italic">{s.heading}</h2>
                  <div className="mt-5 space-y-4 text-[18px] leading-[1.7] text-text/85 max-w-2xl">
                    {s.body.map((paragraph) => (
                      <LegalBlock key={paragraph} text={paragraph} />
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}
            <p className="micro pt-8">Last updated · {lastUpdated}</p>
          </article>
        </div>
      </section>
    </>
  );
}

function LegalBlock({ text }: { text: string }) {
  if (text.startsWith('•')) {
    return (
      <p className="relative pl-6">
        <span className="absolute left-0 top-[0.78em] h-1.5 w-1.5 rounded-full bg-brass" />
        {formatLegalText(text.replace(/^•\s*/, ''))}
      </p>
    );
  }

  return <p>{formatLegalText(text)}</p>;
}

function formatLegalText(text: string) {
  const labelMatch = text.match(/^([^:]{2,64}):\s+(.+)$/);
  if (labelMatch) {
    return (
      <>
        <strong className="font-semibold text-text">{labelMatch[1]}:</strong> {labelMatch[2]}
      </>
    );
  }

  return text;
}
