import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { editorial } from '../../lib/motion';
import { cn } from '../../lib/cn';

interface Props {
  initials: string;
  name: string;
  role: string;
  serial?: string;
  delay?: number;
  className?: string;
}

export function PortraitFrame({ initials, name, role, serial, delay = 0, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, delay, ease: editorial }}
      className={cn('group relative', className)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-surface">
        {/* Duotone treatment with brass + ink */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgb(var(--brass) / 0.18), rgb(var(--ink) / 0.65))',
          }}
        />
        <div className="absolute inset-0 grid place-items-center">
          <span
            className="font-display text-[120px] italic leading-none text-ivory/80 transition-transform duration-700 group-hover:scale-110"
            style={{ fontVariationSettings: '"opsz" 144' }}
          >
            {initials}
          </span>
        </div>
        {/* Brass corner brackets */}
        <span className="absolute left-3 top-3 h-5 w-5 border-l border-t border-brass" />
        <span className="absolute right-3 top-3 h-5 w-5 border-r border-t border-brass" />
        <span className="absolute left-3 bottom-3 h-5 w-5 border-l border-b border-brass" />
        <span className="absolute right-3 bottom-3 h-5 w-5 border-r border-b border-brass" />
        {serial && (
          <span className="absolute right-4 top-4 micro text-ivory/80">{serial}</span>
        )}
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-3 border-t border-rule pt-4">
        <div>
          <p className="font-display text-lg italic">{name}</p>
          <p className="micro mt-1.5">{role}</p>
        </div>
        <span className="micro text-brass">↗</span>
      </div>
    </motion.div>
  );
}
