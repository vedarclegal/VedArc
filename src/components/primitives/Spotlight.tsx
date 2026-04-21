import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'motion/react';
import { cn } from '../../lib/cn';

interface Props {
  children: ReactNode;
  className?: string;
  color?: string;
  size?: number;
}

export function Spotlight({
  children,
  className,
  color = 'rgba(181, 137, 74, 0.18)',
  size = 420,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const bg = useMotionTemplate`radial-gradient(${size}px circle at ${x}px ${y}px, ${color}, transparent 65%)`;

  return (
    <div
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onMouseLeave={() => {
        x.set(-1000);
        y.set(-1000);
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{ background: bg }}
      />
      {children}
    </div>
  );
}
