import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-warm/80 mb-2">{label}</label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-3 rounded-2xl border border-primary/15 bg-white/80 text-slate shadow-sm',
            'focus:outline-none focus:ring-4 focus:ring-primary/15 focus:border-primary/35',
            'transition-all duration-200',
            'placeholder:text-slate/30',
            error && 'border-red-400 focus:ring-red-400/20',
            className
          )}
          {...props}
        />
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export { Input };
