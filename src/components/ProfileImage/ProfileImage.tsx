import { Team, UserNumber } from '@/types/game';
import { cn } from '@/utils/classname';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

const variants = cva('relative rounded-[0.625rem]', {
  variants: {
    size: {
      sm: 'size-5.5 rounded-[0.3rem]',
      md: 'size-9',
      lg: 'size-12',
      xl: 'size-15',
    },
    color: {
      [Team.Black]: 'bg-gray-2',
      [Team.White]: 'bg-gray-5',
      [Team.Red]: 'bg-red',
      [Team.Invalid]: 'bg-gray-2',
    },
  },
  defaultVariants: {
    size: 'md',
    color: Team.Black,
  },
});

export type ProfileImageProps = VariantProps<typeof variants> & {
  className?: string;
  as?: React.ElementType;
  src?: string;
  userNumber?: UserNumber;
  onProfileClick?: () => void;
};

const ProfileImage: React.FC<React.PropsWithChildren<ProfileImageProps>> = ({
  className,
  size,
  color,
  as: Component = 'button',
  src,
  userNumber = UserNumber.Invalid,
  onProfileClick: handleProfileClick,
  children,
  ...props
}) => {
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
