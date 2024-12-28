'use client';

import { cn } from '../../utils/class-name';
import { Button } from './button';
import { PercentageButtonProps } from './types';

export function PercentageButton({
  value,
  isSelected,
  onClick,
  className,
}: PercentageButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        'flex-1 transition-colors font-medium rounded-lg text-[13px]',
        isSelected && 'border-blue-500 text-blue-500',
        className,
      )}
      onClick={onClick}
    >
      {value === 100 ? 'MAX' : `${value}%`}
    </Button>
  );
}
