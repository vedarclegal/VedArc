import { motion } from 'motion/react';
import { editorial } from '../../lib/motion';

interface Props {
  size?: number;
  animated?: boolean;
  className?: string;
}

export function Seal({ size = 48, animated = false, className = '' }: Props) {
  const draw = animated
    ? {
        initial: { pathLength: 0, opacity: 0 },
        animate: { pathLength: 1, opacity: 1 },
      }
    : {};

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <motion.rect
        x="4"
        y="4"
        width="56"
        height="56"
        stroke="rgb(var(--brass))"
        strokeWidth="0.75"
        {...draw}
        transition={{ duration: 1.4, ease: editorial }}
      />
      <motion.rect
        x="12"
        y="12"
        width="40"
        height="40"
        stroke="rgb(var(--brass))"
        strokeWidth="0.75"
        transform="rotate(45 32 32)"
        {...draw}
        transition={{ duration: 1.4, ease: editorial, delay: 0.2 }}
      />
      <motion.circle
        cx="32"
        cy="32"
        r="14"
        stroke="rgb(var(--brass))"
        strokeWidth="0.75"
        {...draw}
        transition={{ duration: 1.2, ease: editorial, delay: 0.4 }}
      />
      <motion.text
        x="32"
        y="37"
        textAnchor="middle"
        fontFamily="Fraunces Variable, serif"
        fontStyle="italic"
        fontSize="14"
        fill="rgb(var(--text))"
        initial={animated ? { opacity: 0 } : undefined}
        animate={animated ? { opacity: 1 } : undefined}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        VL
      </motion.text>
    </motion.svg>
  );
}
