import { useCallback, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem('vedarc-theme') as Theme | null;
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('vedarc-theme', theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0E0F12' : '#F4EEE2');
  }, [theme]);

  // Brass-iris reveal animation when toggling
  const toggleAt = useCallback((origin?: { x: number; y: number }) => {
    const from = origin ?? { x: window.innerWidth - 80, y: 60 };
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    const targetBg = next === 'dark' ? '#0E0F12' : '#F4EEE2';

    if (typeof document === 'undefined' || !('ViewTransition' in document.body) === false) {
      // best-effort iris with a fixed div
      const iris = document.createElement('div');
      iris.style.cssText = `position:fixed;inset:0;z-index:9000;pointer-events:none;background:${targetBg};clip-path:circle(0px at ${from.x}px ${from.y}px);transition:clip-path 720ms cubic-bezier(0.7,0,0.2,1);`;
      document.body.appendChild(iris);
      requestAnimationFrame(() => {
        const r = Math.hypot(
          Math.max(from.x, window.innerWidth - from.x),
          Math.max(from.y, window.innerHeight - from.y),
        );
        iris.style.clipPath = `circle(${r}px at ${from.x}px ${from.y}px)`;
      });
      setTimeout(() => {
        setTheme(next);
        setTimeout(() => iris.remove(), 60);
      }, 360);
      return;
    }
    setTheme(next);
  }, [theme]);

  return {
    theme,
    toggle: () => toggleAt(),
    toggleAt,
    setTheme,
  };
}
