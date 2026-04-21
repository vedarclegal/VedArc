import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { cn } from '../../lib/cn';

interface Props {
  className?: string;
  delay?: number;
  duration?: number;
}

export function BrassRule({ className, delay = 0, duration = 1.2 }: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <svg
      ref={ref}
      className={cn('block h-px w-full', className)}
      preserveAspectRatio="none"
      viewBox="0 0 1000 1"
    >
      <motion.line
        x1="0"
        y1="0.5"
        x2="1000"
        y2="0.5"
        stroke="rgb(var(--brass))"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : undefined}
        transition={{ duration, delay, ease: [0.7, 0, 0.2, 1] }}
      />
    </svg>
  );
}
