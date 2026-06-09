import { forwardRef, type SelectHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-warm/80 mb-2">{label}</label>
        )}
        <select
          ref={ref}
          className={cn(
            'w-full px-4 py-3 rounded-2xl border border-primary/15 bg-white/80 text-slate shadow-sm',
            'focus:outline-none focus:ring-4 focus:ring-primary/15 focus:border-primary/35',
            'transition-all duration-200',
            error && 'border-red-400 focus:ring-red-400/20',
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
export { Select };
