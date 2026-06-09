import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-warm/80 mb-2">{label}</label>
        )}
        <textarea
          ref={ref}
          className={cn(
            'w-full px-4 py-3 rounded-2xl border border-primary/15 bg-white/80 text-slate shadow-sm resize-none',
            'focus:outline-none focus:ring-4 focus:ring-primary/15 focus:border-primary/35',
            'transition-all duration-200',
            'placeholder:text-slate/30',
            error && 'border-red-400 focus:ring-red-400/20',
            className
          )}
          rows={4}
          {...props}
        />
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
export { Textarea };
