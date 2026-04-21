import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

type State = 'default' | 'link' | 'cta' | 'text' | 'image' | 'drag' | 'read';

export function Cursor() {
  const reduced = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [state, setState] = useState<State>('default');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (reduced) return;
    if (typeof window === 'undefined') return;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (coarse) return;
    setEnabled(true);
    document.body.dataset.cursor = 'active';
    return () => {
      delete document.body.dataset.cursor;
    };
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let dx = window.innerWidth / 2;
    let dy = window.innerHeight / 2;
    let rx = dx;
    let ry = dy;
    let raf = 0;

    const move = (e: PointerEvent) => {
      dx = e.clientX;
      dy = e.clientY;
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const explicit = t.closest<HTMLElement>('[data-cursor]');
      const explicitVal = explicit?.dataset.cursor;
      if (explicitVal === 'cta') setState('cta');
      else if (explicitVal === 'image') setState('image');
      else if (explicitVal === 'drag') setState('drag');
      else if (explicitVal === 'read') setState('read');
      else if (explicitVal === 'link') setState('link');
      else if (t.closest('a, button, [role="button"]')) setState('link');
      else if (t.closest('p, h1, h2, h3, h4, h5, li, blockquote')) setState('text');
      else setState('default');
    };

    const tick = () => {
      const lerp = state === 'cta' || state === 'image' ? 0.25 : 0.2;
      rx += (dx - rx) * lerp;
      ry += (dy - ry) * lerp;
      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const down = () => {
      ring.style.setProperty('--press', '0.85');
    };
    const up = () => {
      ring.style.setProperty('--press', '1');
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
    };
  }, [enabled, state]);

  if (!enabled) return null;

  const ringSize =
    state === 'cta'
      ? 76
      : state === 'image'
        ? 100
        : state === 'read'
          ? 64
          : state === 'drag'
            ? 80
            : state === 'link'
              ? 52
              : state === 'text'
                ? 0
                : 30;

  const label =
    state === 'cta'
      ? 'Read →'
      : state === 'image'
        ? 'View'
        : state === 'read'
          ? 'Read'
          : state === 'drag'
            ? '← drag →'
            : '';

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        style={{
          width: state === 'text' ? 2 : 5,
          height: state === 'text' ? 18 : 5,
          background: state === 'text' ? 'rgb(var(--brass))' : 'rgb(var(--ivory))',
          borderRadius: state === 'text' ? 1 : 999,
          transition:
            'width 220ms cubic-bezier(0.22,1,0.36,1), height 220ms cubic-bezier(0.22,1,0.36,1), background 200ms',
        }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full"
        style={{
          width: ringSize,
          height: ringSize,
          border: state === 'cta' ? 'none' : '0.5px solid rgb(var(--brass))',
          background: state === 'cta' ? 'rgb(var(--brass))' : 'transparent',
          transition:
            'width 360ms cubic-bezier(0.22,1,0.36,1), height 360ms cubic-bezier(0.22,1,0.36,1), background 240ms, border-color 240ms',
          ['--press' as string]: '1',
          transform: 'scale(var(--press))',
        }}
      >
        <span
          ref={labelRef}
          className="font-mono text-[9px] uppercase tracking-widest whitespace-nowrap"
          style={{
            color: state === 'cta' ? 'rgb(var(--ink))' : 'rgb(var(--brass))',
            opacity: label ? 1 : 0,
            transition: 'opacity 200ms',
          }}
        >
          {label}
        </span>
      </div>
    </>
  );
}
