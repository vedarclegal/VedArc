import { useRef, type ReactNode, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { cn } from '../../lib/cn';

interface Props {
  to?: string;
  href?: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'oxblood';
  className?: string;
  onClick?: () => void;
}

export function MagneticButton({
  to,
  href,
  children,
  variant = 'primary',
  className,
  onClick,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 240, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 240, damping: 22, mass: 0.4 });
  const tx = useTransform(sx, (v) => v);
  const ty = useTransform(sy, (v) => v);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * 0.18);
    y.set((e.clientY - cy) * 0.22);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const styles = cn(
    'group relative inline-flex items-center justify-center gap-3 px-7 py-4 font-mono text-[11px] uppercase tracking-widest no-underline transition-colors duration-300',
    variant === 'primary' && 'bg-ink text-ivory hover:bg-indigo dark:bg-ivory dark:text-ink',
    variant === 'oxblood' && 'bg-oxblood text-ivory hover:bg-oxblood/90',
    variant === 'ghost' && 'border border-rule text-text hover:border-brass hover:text-brass',
    className,
  );

  const inner = (
    <motion.span
      style={{ x: tx, y: ty }}
      className="inline-flex items-center gap-3"
      data-cursor="cta"
    >
      {children}
      <motion.span
        aria-hidden
        className="inline-block"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.4 }}
      >
        →
      </motion.span>
    </motion.span>
  );

  const wrapper = (content: ReactNode) => (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-block"
      data-cursor="cta"
    >
      {content}
    </motion.div>
  );

  if (to) {
    return wrapper(
      <Link to={to} onClick={onClick} className={styles} data-cursor="cta">
        {inner}
      </Link>,
    );
  }
  if (href) {
    return wrapper(
      <a href={href} onClick={onClick} className={styles} data-cursor="cta">
        {inner}
      </a>,
    );
  }
  return wrapper(
    <button type="button" onClick={onClick} className={styles} data-cursor="cta">
      {inner}
    </button>,
  );
}
