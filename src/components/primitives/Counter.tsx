import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, animate } from 'motion/react';
import { editorial } from '../../lib/motion';

interface Props {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function Counter({ to, duration = 1.6, prefix = '', suffix = '', className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration, ease: editorial });
    const unsub = mv.on('change', (v) => setDisplay(Math.round(v).toString()));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, to, duration, mv]);

  return (
    <span ref={ref} className={className} style={{ fontFeatureSettings: '"tnum", "lnum"' }}>
      {prefix}{display}{suffix}
    </span>
  );
}
