import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface Props {
  items: string[];
  speed?: number;
  className?: string;
  separator?: ReactNode;
}

export function Marquee({ items, speed = 32, className, separator }: Props) {
  const sep = separator ?? <span className="mx-8 text-brass">◆</span>;
  const track = (
    <div className="flex shrink-0 items-center whitespace-nowrap pr-8">
      {items.map((item, i) => (
        <span key={i} className="flex items-center font-display italic text-display-md text-text">
          {item}
          {sep}
        </span>
      ))}
    </div>
  );
  return (
    <div
      className={cn('group relative overflow-hidden border-y border-rule py-6', className)}
      data-cursor="drag"
    >
      <div
        className="flex animate-marquee group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s` }}
      >
        {track}
        {track}
      </div>
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee linear infinite; will-change: transform; }
      `}</style>
    </div>
  );
}
