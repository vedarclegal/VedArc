import { motion, useScroll } from 'motion/react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
      className="pointer-events-none fixed right-0 top-0 z-50 h-screen w-px bg-brass"
    />
  );
}
