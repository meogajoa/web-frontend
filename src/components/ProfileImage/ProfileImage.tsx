import { Button as HeadlessuiButton } from '@headlessui/react';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '~/utils/classname';

const variants = cva('relative rounded-[0.625rem]', {
  variants: {
    size: {
      sm: 'size-5.5 rounded-[0.3rem]',
      md: 'size-9',
      lg: 'size-[2.875rem]',
      xl: 'size-[3.625rem]',
    },
    color: {
      gray: 'bg-gray-5',
      'light-gray': 'bg-gray-2',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'gray',
  },
});

type ProfileImageProps = VariantProps<typeof variants> & {
  className?: React.ComponentProps<'button'>['className'];
  as?: React.ElementType;
  src?: string;
  number?: number;
  onProfileClick?: () => void;
};

const ProfileImage: React.FC<ProfileImageProps> = ({
  className,
  size,
  color,
  as = 'button',
  src,
  number = 0,
  onProfileClick: handleProfileClick,
  ...props
}) => {
  const Component = as === 'button' ? HeadlessuiButton : as;

  return (
    <Component
      className={cn(variants({ size, color }), 'bg-cover bg-center', className)}
      style={{
        backgroundImage: `url(${src})`,
      }}
      onClick={handleProfileClick}
      {...props}
    >
      {number > 0 && (
        <mark className="absolute right-0.5 top-0.5 flex size-6 items-center justify-center rounded-lg bg-gray-4 text-[0.625rem] font-bold text-black">
          {number}
        </mark>
      )}
    </Component>
  );
};

export default ProfileImage;
