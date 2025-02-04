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
      gray: 'bg-gray-1',
      'light-gray': 'bg-gray-5',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'gray',
  },
});

export type ProfileImageProps = VariantProps<typeof variants> & {
  className?: string;
  as?: React.ElementType;
  src?: string;
  userNumber?: number;
  onProfileClick?: () => void;
};

const ProfileImage: React.FC<React.PropsWithChildren<ProfileImageProps>> = ({
  className,
  size,
  color,
  as = 'button',
  src,
  userNumber = 0,
  onProfileClick: handleProfileClick,
  children,
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
      {userNumber > 0 && (
        <mark className="bg-gray-4 absolute top-0.5 right-0.5 flex size-6 items-center justify-center rounded-lg text-[0.625rem] font-bold text-black">
          {userNumber}
        </mark>
      )}

      {children}
    </Component>
  );
};

export default ProfileImage;
