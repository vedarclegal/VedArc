import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { BrandLogo } from '../primitives/BrandLogo';
import { useTheme } from '../../hooks/useTheme';
import { editorial, wipe } from '../../lib/motion';
import { cn } from '../../lib/cn';
import site from '../../content/site.json';

export function Nav() {
  const { theme, toggleAt } = useTheme();
  const themeBtnRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();

  // Magnetic seal
  const sealRef = useRef<HTMLAnchorElement>(null);
  const sx = useMotionValue(0);
  const sy = useMotionValue(0);
  const ssx = useSpring(sx, { stiffness: 220, damping: 18, mass: 0.4 });
  const ssy = useSpring(sy, { stiffness: 220, damping: 18, mass: 0.4 });
  useEffect(() => setOpen(false), [loc.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-all duration-500',
          scrolled
            ? 'border-b border-rule/60 bg-bg/85 backdrop-blur-md'
            : 'border-b border-transparent',
        )}
      >
        <div className="container-editorial flex items-center justify-between py-3.5 md:py-4">
          <Link
            ref={sealRef}
            to="/"
            className="flex items-center gap-3"
            data-cursor="link"
            aria-label="VedArc Legal home"
            onMouseMove={(e) => {
              const r = sealRef.current?.getBoundingClientRect();
              if (!r) return;
              sx.set((e.clientX - (r.left + r.width / 2)) * 0.25);
              sy.set((e.clientY - (r.top + r.height / 2)) * 0.25);
            }}
            onMouseLeave={() => {
              sx.set(0);
              sy.set(0);
            }}
          >
            <motion.span style={{ x: ssx, y: ssy, display: 'inline-block' }}>
              <BrandLogo className="h-14 w-auto brightness-105 contrast-110 saturate-110 drop-shadow-[0_6px_14px_rgba(181,137,74,0.16)] md:h-16" />
            </motion.span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {site.nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'group relative font-mono text-[11px] uppercase tracking-widest transition-colors',
                    isActive ? 'text-text' : 'text-muted hover:text-text',
                  )
                }
              >
                {({ isActive }) => (
                  <span className="relative inline-flex items-center gap-2">
                    <span>{item.label}</span>
                    <span
                      className={cn(
                        'absolute -bottom-1 left-0 h-px bg-brass transition-transform duration-500',
                        isActive ? 'w-full scale-x-100' : 'w-full scale-x-0 group-hover:scale-x-100',
                      )}
                      style={{ transformOrigin: isActive ? 'left' : 'right' }}
                    />
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              ref={themeBtnRef}
              type="button"
              onClick={() => {
                const r = themeBtnRef.current?.getBoundingClientRect();
                toggleAt(r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : undefined);
              }}
              aria-label={theme === 'dark' ? 'Switch to day reading' : 'Switch to night reading'}
              className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full border border-rule text-muted hover:text-brass hover:border-brass transition-colors"
              data-cursor="link"
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.4, ease: editorial }}
                  >
                    <Sun size={15} strokeWidth={1.25} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.4, ease: editorial }}
                  >
                    <Moon size={15} strokeWidth={1.25} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden flex h-10 w-10 items-center justify-center text-text"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X size={20} strokeWidth={1.25} /> : <Menu size={20} strokeWidth={1.25} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.62, ease: wipe }}
            className="fixed inset-0 z-30 flex flex-col bg-bg pt-24 md:hidden"
          >
            <div className="container-editorial flex flex-1 flex-col justify-between pb-12 pt-8">
              <nav className="flex flex-col gap-3">
                {site.nav.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 + i * 0.07, duration: 0.6, ease: editorial }}
                  >
                    <NavLink to={item.to} end={item.to === '/'} className="group flex items-baseline gap-5">
                      <span className="font-display text-[44px] leading-[1.05] italic transition-colors group-hover:text-brass">
                        {item.label}
                      </span>
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => toggleAt()}
                  className="flex items-center gap-2 micro"
                >
                  {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                  {theme === 'dark' ? 'Day Reading' : 'Night Reading'}
                </button>
                <span className="micro">hello@vedarclegal.in</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
