import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'; // Heroicon 사용
import { cva, VariantProps } from 'class-variance-authority';
import React, { useState } from 'react';
import { cn } from '~/utils/classname';

type InputProps = Readonly<
  React.ComponentProps<'div'> & // div props 상속
    VariantProps<typeof InputVariant> & {
      type?: 'text' | 'password' | 'email' | 'textarea';
      error?: string;
      placeholder?: string;
    }
>;

const InputVariant = cva(
  'w-full text-left font-bold focus:border focus:border-red focus:outline-none',
  {
    variants: {
      variant: {
        primary: 'bg-white font-normal text-gray-1',
      },
      rounded: {
        full: 'rounded-full',
        lg: 'rounded-lg',
        md: 'rounded-md',
      },
      size: {
        lg: 'h-11 px-4 py-3.5 text-base',
        md: 'h-10 px-3 py-2.5 text-sm',
        sm: 'h-8 px-2 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      rounded: 'lg',
      size: 'md',
    },
  },
);

const Input: React.FC<InputProps> = ({
  type = 'text',
  className,
  placeholder,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputClassName = cn(InputVariant(props), className);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className={cn('w-full', className)} {...props}>
      <div className="relative">
        {type === 'textarea' ? (
          <textarea
            placeholder={placeholder}
            className={cn(inputClassName, 'resize-none')}
          />
        ) : (
          <input
            type={type === 'password' && showPassword ? 'text' : type}
            placeholder={placeholder}
            className={inputClassName}
          />
        )}
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeIcon className="size-5" />
            ) : (
              <EyeSlashIcon className="size-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
export type { InputProps };
