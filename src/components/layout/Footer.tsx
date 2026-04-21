import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Seal } from '../primitives/Seal';
import { BrassRule } from '../primitives/BrassRule';
import { editorial } from '../../lib/motion';
import site from '../../content/site.json';

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const [typed, setTyped] = useState('');

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const target = site.footer.colophon;
    const id = window.setInterval(() => {
      i++;
      setTyped(target.slice(0, i));
      if (i >= target.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <footer ref={ref} className="relative mt-32 border-t border-rule/50 bg-bg pt-20 pb-12">
      <div className="container-editorial">
        <div className="grid gap-16 lg:grid-cols-12">
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, ease: editorial }}
          >
            <div className="flex items-start gap-4">
              <Seal size={56} />
              <div>
                <p className="font-display text-display-sm italic leading-tight text-balance">
                  A modern veda for Indian legal practice.
                </p>
                <p className="mt-4 max-w-md text-text/80">
                  Practice-driven cross-skilling for in-house counsel, practising advocates, and law schools.
                </p>
              </div>
            </div>
          </motion.div>

          <FooterColumn label="Visit" inView={inView} delay={0.1}>
            {site.nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="editorial-link text-text/85 hover:text-text" data-cursor="link">
                  <span className="text-brass mr-2 text-[10px] font-mono align-baseline">{n.numeral}</span>
                  {n.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn label="Legal" inView={inView} delay={0.18}>
            {site.footer.legal.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="editorial-link text-text/85 hover:text-text" data-cursor="link">
                  {l.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, delay: 0.26, ease: editorial }}
          >
            <p className="micro mb-5">Correspondence</p>
            <p className="text-text/85">{site.footer.address}</p>
            <a
              href={`mailto:${site.footer.email}`}
              className="editorial-link mt-2 inline-block text-text"
              data-cursor="link"
            >
              {site.footer.email}
            </a>
            <div className="mt-6 flex gap-5">
              {site.footer.social.map((s) => (
                <a key={s.label} href={s.href} className="editorial-link micro" data-cursor="link">
                  {s.label} ↗
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="my-12">
          <BrassRule />
        </div>

        <div className="flex flex-col-reverse items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="micro">© MMXXVI VedArc Legal · All rights reserved</p>
          <p className="micro text-muted/80 max-w-md md:text-right">
            {typed}
            {typed.length < site.footer.colophon.length && (
              <span className="ml-0.5 inline-block w-px h-3 align-middle bg-brass animate-pulse" />
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  label,
  children,
  inView,
  delay = 0,
}: {
  label: string;
  children: React.ReactNode;
  inView: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      className="lg:col-span-2"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, delay, ease: editorial }}
    >
      <p className="micro mb-5">{label}</p>
      <ul className="space-y-3">{children}</ul>
    </motion.div>
  );
}
