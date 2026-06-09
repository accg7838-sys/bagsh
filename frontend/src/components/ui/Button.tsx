import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const base = cn(
    'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 cursor-pointer',
    'focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  );

  const variants: Record<string, string> = {
    primary: 'bg-rose-500 text-white hover:bg-rose-600 shadow-md hover:shadow-lg',
    secondary: 'bg-gold-400 text-brown hover:bg-gold-500 shadow-md hover:shadow-lg',
    outline: 'border-2 border-rose-300 text-rose-500 hover:bg-rose-50',
    ghost: 'text-rose-500 hover:bg-rose-50',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  const sizes: Record<string, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
