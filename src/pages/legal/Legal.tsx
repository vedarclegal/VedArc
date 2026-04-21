import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Eyebrow } from '../../components/primitives/Eyebrow';
import { SplitHeading } from '../../components/primitives/SplitHeading';
import { BrassRule } from '../../components/primitives/BrassRule';
import { Reveal } from '../../components/primitives/Reveal';
import { cn } from '../../lib/cn';

const docs: Record<string, { title: string; eyebrow: string; sections: { heading: string; body: string }[] }> = {
  terms: {
    title: 'Terms of Use',
    eyebrow: 'Legal',
    sections: [
      { heading: 'Acceptance of Terms', body: 'By accessing this website you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree, please do not use this site.' },
      { heading: 'Use of Content', body: 'All content on this website — including text, design, and trademarks — is the property of VedArc Legal unless otherwise stated. You may not reproduce or redistribute without written permission.' },
      { heading: 'Programs & Enrolments', body: 'Specific terms for paid programs are set out in the enrolment agreement provided at the time of registration.' },
      { heading: 'Limitation of Liability', body: 'Information on this site is provided for general purposes and does not constitute legal advice. VedArc Legal will not be liable for any decision taken on the basis of this content alone.' },
      { heading: 'Governing Law', body: 'These terms are governed by the laws of India and subject to the exclusive jurisdiction of the courts at New Delhi.' },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    eyebrow: 'Legal',
    sections: [
      { heading: 'Information We Collect', body: 'We collect only the information you voluntarily provide — name, email, organisation, and the message you send via our contact form.' },
      { heading: 'How We Use Information', body: 'We use this information to respond to your enquiry, share program information you have requested, and improve our services.' },
      { heading: 'Sharing of Information', body: 'We do not sell or rent personal information. We may share with service providers strictly as required to operate the website and respond to enquiries.' },
      { heading: 'Cookies', body: 'We use only essential cookies. See our Cookies Policy for more.' },
      { heading: 'Your Rights', body: 'You may request a copy of your data, ask us to correct it, or delete it by writing to hello@vedarclegal.in.' },
    ],
  },
  refund: {
    title: 'Refund Policy',
    eyebrow: 'Legal',
    sections: [
      { heading: 'Program Refunds', body: 'Refund eligibility for paid programs is set out in the enrolment agreement at the time of registration.' },
      { heading: 'Cancellations by VedArc Legal', body: 'In the rare event we cancel a scheduled program, you will receive a full refund of fees paid.' },
      { heading: 'Processing Time', body: 'Approved refunds are processed within 10–15 working days through the original payment channel.' },
      { heading: 'Contact', body: 'For any refund query write to hello@vedarclegal.in with your enrolment reference.' },
    ],
  },
  cookies: {
    title: 'Cookies Policy',
    eyebrow: 'Legal',
    sections: [
      { heading: 'What Are Cookies', body: 'Cookies are small text files placed on your device to make websites work, work better, and provide information to site owners.' },
      { heading: 'How We Use Cookies', body: 'We use only essential cookies for site preferences (such as the day or night reading theme). We do not use marketing cookies.' },
      { heading: 'Managing Cookies', body: 'You can control cookies through your browser settings. Disabling cookies may affect parts of this site.' },
    ],
  },
};

export default function Legal() {
  const { slug } = useParams();
  const doc = slug ? docs[slug] : undefined;
  const articleRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ['start start', 'end end'],
  });
  const barWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (!doc) return;
    const sectionEls = doc.sections.map((_, i) => document.getElementById(`sec-${i}`));
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
  }, [doc]);

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
              {doc.sections.map((s, i) => (
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
                      <span>
                        {String(i + 1).padStart(2, '0')} · {s.heading}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <article className="lg:col-span-8 lg:col-start-5 space-y-14">
            {doc.sections.map((s, i) => (
              <Reveal key={i}>
                <section id={`sec-${i}`} className="scroll-mt-32">
                  <p className="micro text-brass">{String(i + 1).padStart(2, '0')}</p>
                  <h2 className="mt-3 font-display text-display-sm italic">{s.heading}</h2>
                  <p className="mt-5 text-[18px] leading-[1.7] text-text/85 max-w-2xl">{s.body}</p>
                </section>
              </Reveal>
            ))}
            <p className="micro pt-8">Last updated · MMXXVI</p>
          </article>
        </div>
      </section>
    </>
  );
}
