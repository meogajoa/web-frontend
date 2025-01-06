import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '~/utils/classname';

const ProfileImageVariant = cva(
  'relative flex items-center justify-center rounded-md',
  {
    variants: {
      size: {
        md: 'h-16 w-16',
        lg: 'h-24 w-24',
      },
      color: {
        gray: 'bg-gray-5',
        black: 'bg-black',
      },
    },
    defaultVariants: {
      size: 'lg',
      color: 'gray',
    },
  },
);

type ProfileImageProps = {
  imageSrc?: string; // 프로필 이미지 경로
  showNumber?: boolean; // 숫자 박스 표시 여부
  number?: number; // 숫자 값
} & React.ComponentProps<'button'> &
  VariantProps<typeof ProfileImageVariant>;

const ProfileImage: React.FC<ProfileImageProps> = ({
  imageSrc = 'https://flexible.img.hani.co.kr/flexible/normal/850/567/imgdb/original/2023/0111/20230111503366.jpg', // 기본 예시 이미지
  size = 'md',
  color = 'gray',
  className,
  showNumber = false,
  number = 0,
  onClick,
  ...props
}) => {
  const numberBoxStyles =
    size === 'lg' ? 'h-8 w-8 text-xs' : 'h-6 w-6 text-[10px]';

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(ProfileImageVariant({ size, color }), className)}
      {...props}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Profile"
          className="h-full w-full rounded-md object-cover"
        />
      )}

      {showNumber && (
        <div
          className={cn(
            'absolute right-0.5 top-0.5 flex items-center justify-center rounded-md bg-gray-4 font-bold text-black',
            numberBoxStyles,
          )}
        >
          {number}
        </div>
      )}
    </button>
  );
};

export default ProfileImage;
