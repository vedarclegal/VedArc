import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface Props {
  children: ReactNode;
  className?: string;
}

export function Eyebrow({ children, className }: Props) {
  return (
    <div className={cn('flex items-center gap-3 micro', className)}>
      <span className="h-px w-8 bg-brass/60" />
      <span>{children}</span>
    </div>
  );
}
