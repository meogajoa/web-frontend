import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { Team, UserNumber } from '~/types/game';
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

export type Props = VariantProps<typeof variants> & {
  className?: string;
  as?: React.ElementType;
  src?: string;
  userNumber?: UserNumber;
  onProfileClick?: () => void;
};

const ProfileImage: React.FC<React.PropsWithChildren<Props>> = ({
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
