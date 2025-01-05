import {
  Button as HeadlessButton,
  ButtonProps as HeadlessButtonProps,
} from '@headlessui/react';
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/24/outline';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '~/utils/classname';

const ButtonVariant = cva(
  'inline-block text-center font-bold text-white transition duration-300 data-[hover]:scale-95 data-[disabled]:cursor-not-allowed data-[disabled]:bg-gray-5 data-[active]:opacity-70 data-[hover]:opacity-90 data-[focus]:outline-none',
  {
    variants: {
      variant: {
        primary: 'bg-red',
        secondary: 'bg-sub',
      },
      rounded: {
        full: 'rounded-full',
        md: 'rounded-lg',
      },
      size: {
        lg: 'h-12 px-4 py-2.5 text-xl',
        md: 'h-11 w-fit p-2.5 text-base',
        sm: 'h-9 py-2.5 text-base',
      },
      icon: {
        'chevron-down': 'flex items-center gap-x-1 px-4',
        plus: 'flex flex-row-reverse items-center gap-x-1 text-xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      rounded: 'md',
      size: 'lg',
    },
  },
);

type ButtonIcon = Uppercase<
  NonNullable<VariantProps<typeof ButtonVariant>['icon']>
>;

const BUTTON_ICONS: Readonly<
  Record<ButtonIcon, React.FC<React.ComponentProps<'svg'>>>
> = {
  'CHEVRON-DOWN': ChevronDownIcon,
  PLUS: PlusIcon,
};

type ButtonProps = Omit<HeadlessButtonProps, 'children'> &
  VariantProps<typeof ButtonVariant> &
  React.PropsWithChildren;

const Button: React.FC<ButtonProps> = ({
  className,
  icon,
  children,
  ...props
}) => {
  const Icon = icon ? BUTTON_ICONS[icon.toUpperCase() as ButtonIcon] : null;

  return (
    <HeadlessButton
      className={cn(ButtonVariant({ icon, ...props }), className)}
      {...props}
    >
      {children}
      {Icon && <Icon className="size-4.5 stroke-white stroke-2" />}
    </HeadlessButton>
  );
};

export default Button;
