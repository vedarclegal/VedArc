import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { editorial } from '../../lib/motion';
import { cn } from '../../lib/cn';

interface Props {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3';
  italic?: boolean;
}

export function SplitHeading({ text, className, delay = 0, as = 'h2', italic }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const words = text.split(' ');
  const Tag = motion[as];

  return (
    <Tag ref={ref as never} className={cn('font-display', italic && 'italic', className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="block">
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom pr-[0.22em] last:pr-0">
            <motion.span
              initial={{ y: '110%' }}
              animate={inView ? { y: '0%' } : undefined}
              transition={{
                duration: 0.95,
                delay: delay + i * 0.07,
                ease: editorial,
              }}
              className="inline-block"
              style={{ fontVariationSettings: '"opsz" 144' }}
            >
              {w}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
