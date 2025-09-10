import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'wide' | 'narrow';
  noPadding?: boolean;
}

export function PageContainer({ 
  children, 
  className,
  size = 'default',
  noPadding = false 
}: PageContainerProps) {
  const sizeClasses = {
    default: 'max-w-7xl',  // 1280px
    wide: 'max-w-screen-2xl',  // 1536px
    narrow: 'max-w-4xl'   // 768px
  };

  return (
    <div 
      className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8',
        sizeClasses[size],
        !noPadding && 'py-6 sm:py-8',
        className
      )}
    >
      {children}
    </div>
  );
}
