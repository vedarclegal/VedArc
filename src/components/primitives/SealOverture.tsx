import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BrandLogo } from './BrandLogo';
import { editorial } from '../../lib/motion';

const KEY = 'vedarc-seen-seal-v1';
const AUTO_CLOSE_MS = 2200;
// StrictMode runs effects twice in dev. Persisting this deadline at module scope
// lets the second mount re-schedule the remaining time instead of getting stuck.
let closeDeadline = 0;

export function SealOverture() {
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      return !sessionStorage.getItem(KEY);
    } catch {
      return true;
    }
  });

  const dismiss = () => {
    closeDeadline = 0;
    setShow(false);
  };

  useEffect(() => {
    if (!show) return;
    if (!closeDeadline) {
      closeDeadline = Date.now() + AUTO_CLOSE_MS;
    }
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      // ignore
    }
    const remaining = Math.max(0, closeDeadline - Date.now());
    const t = window.setTimeout(dismiss, remaining);
    return () => window.clearTimeout(t);
  }, [show]);

  // Escape hatch: clicking or pressing any key dismisses immediately.
  useEffect(() => {
    if (!show) return;
    window.addEventListener('keydown', dismiss, { once: true });
    window.addEventListener('pointerdown', dismiss, { once: true });
    return () => {
      window.removeEventListener('keydown', dismiss);
      window.removeEventListener('pointerdown', dismiss);
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: editorial }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg cursor-pointer"
          onClick={dismiss}
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.4, y: -200, x: -400, opacity: 0 }}
            transition={{ duration: 0.8, ease: editorial }}
          >
            <BrandLogo className="h-auto w-[280px] max-w-[72vw] drop-shadow-[0_10px_24px_rgba(14,15,18,0.12)]" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 micro"
          >
            VedArc Legal · 2026
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.4, duration: 0.4 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 micro text-text/40"
          >
            Click anywhere to enter
          </motion.div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-rule/50">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: AUTO_CLOSE_MS / 1000, ease: 'linear' }}
              className="h-full origin-left bg-brass"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
