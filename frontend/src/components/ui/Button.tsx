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
    'inline-flex items-center justify-center gap-2 rounded-2xl font-semibold tracking-[-0.01em] transition-all duration-300 cursor-pointer',
    'focus:outline-none focus:ring-4 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-cream',
    'disabled:opacity-55 disabled:cursor-not-allowed disabled:hover:translate-y-0',
    'active:scale-[0.98]'
  );

  const variants: Record<string, string> = {
    primary:
      'bg-gradient-to-r from-primary to-primary-dark text-white shadow-[0_16px_35px_rgba(217,70,126,0.28)] hover:shadow-[0_20px_45px_rgba(217,70,126,0.36)] hover:-translate-y-0.5',
    secondary:
      'bg-gradient-to-r from-accent to-primary text-white shadow-[0_16px_34px_rgba(139,92,246,0.24)] hover:shadow-[0_20px_45px_rgba(139,92,246,0.32)] hover:-translate-y-0.5',
    outline:
      'border border-primary/25 bg-white/70 text-primary-dark shadow-sm hover:bg-primary/10 hover:border-primary/40 hover:-translate-y-0.5',
    ghost:
      'text-primary-dark bg-white/0 hover:bg-white/65 hover:shadow-sm',
    danger:
      'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-[0_16px_35px_rgba(225,29,72,0.22)] hover:-translate-y-0.5',
  };

  const sizes: Record<string, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
