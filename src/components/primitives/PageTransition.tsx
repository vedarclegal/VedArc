import { AnimatePresence, motion } from 'motion/react';
import { useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { wipe } from '../../lib/motion';

export function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.5, ease: wipe }}
      >
        {children}
      </motion.div>

      <motion.div
        key={`wipe-${location.pathname}`}
        className="pointer-events-none fixed inset-0 z-[80] origin-left bg-bg"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.62, ease: wipe }}
      >
        <div className="absolute right-0 top-0 h-full w-px bg-brass" />
      </motion.div>
    </AnimatePresence>
  );
}
