import { motion, useInView } from 'motion/react';
import { useRef, type ReactNode } from 'react';
import { editorial } from '../../lib/motion';

interface Props {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'span' | 'p' | 'li' | 'section';
}

export function Reveal({ children, delay = 0, y = 24, className, as = 'div' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px -12% 0px' });
  const Comp = motion[as];

  return (
    <Comp
      ref={ref as never}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, delay, ease: editorial }}
      className={className}
    >
      {children}
    </Comp>
  );
}
