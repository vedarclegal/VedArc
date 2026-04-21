import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Seal } from './Seal';
import { editorial } from '../../lib/motion';

const SEQUENCE = 'veda';

export function EasterEgg() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let buffer = '';
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-SEQUENCE.length);
      if (buffer === SEQUENCE) {
        setActive(true);
        window.setTimeout(() => setActive(false), 1800);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: editorial }}
          className="pointer-events-none fixed inset-0 z-[110] flex items-center justify-center bg-bg/85 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.7, rotate: -8, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 1.4, opacity: 0 }}
            transition={{ duration: 1.2, ease: editorial }}
          >
            <Seal size={320} animated />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 micro text-brass"
          >
            वेद · The seal recognises you.
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
