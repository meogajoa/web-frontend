import {
  Button as HeadlessButton,
  ButtonProps as HeadlessButtonProps,
} from '@headlessui/react';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '~/utils/classname';

const ButtonVariant = cva(
  'inline-block w-full text-center font-bold text-white transition duration-300 data-[hover]:scale-95 data-[disabled]:cursor-not-allowed data-[disabled]:bg-gray-5 data-[active]:opacity-70 data-[hover]:opacity-90 data-[focus]:outline-none',
  {
    variants: {
      variant: {
        primary: 'bg-red',
      },
      rounded: {
        full: 'rounded-full',
        md: 'rounded-lg',
      },
      size: {
        lg: 'h-12 px-4 py-2.5 text-base',
        md: 'h-11 w-fit p-2.5 [font-size:_0.75rem]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      rounded: 'md',
      size: 'lg',
    },
  },
);

type ButtonProps = Readonly<
  HeadlessButtonProps & VariantProps<typeof ButtonVariant>
>;

const Button: React.FC<ButtonProps> = ({ className, ...props }) => {
  return (
    <HeadlessButton
      className={cn(ButtonVariant(props), className)}
      {...props}
    />
  );
};

export default Button;
