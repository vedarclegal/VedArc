import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, type RefObject } from 'react';

interface Props {
  targetRef?: RefObject<HTMLElement | null>;
  label?: string;
}

export function ReadingProgress({ targetRef, label }: Props) {
  const fallback = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll(targetRef ? { target: targetRef as RefObject<HTMLElement>, offset: ['start start', 'end end'] } : undefined);
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const pct = useTransform(scrollYProgress, (v) => `${Math.round(v * 100)}%`);

  return (
    <div ref={fallback} className="pointer-events-none fixed left-0 top-20 z-40 flex w-full items-center gap-3 border-b border-rule/40 bg-bg/70 backdrop-blur-sm px-6 py-2">
      {label && <span className="micro hidden md:inline-block">{label}</span>}
      <div className="relative h-px flex-1 bg-rule">
        <motion.div className="absolute inset-y-0 left-0 bg-brass" style={{ width }} />
      </div>
      <motion.span className="micro tabular-nums text-brass">{pct}</motion.span>
    </div>
  );
}
