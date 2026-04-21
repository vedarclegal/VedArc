import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface Props {
  numeral?: string;
  children: ReactNode;
  className?: string;
}

export function Eyebrow({ numeral, children, className }: Props) {
  return (
    <div className={cn('flex items-center gap-3 micro', className)}>
      {numeral && <span className="text-brass">{numeral}</span>}
      <span className="h-px w-8 bg-brass/60" />
      <span>{children}</span>
    </div>
  );
}
