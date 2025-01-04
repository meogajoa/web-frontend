import { cva, VariantProps } from 'class-variance-authority';
import cn from 'classnames';
import React from 'react';

type NoticeProps = Readonly<
  React.ComponentProps<'div'> &
    VariantProps<typeof NoticeVariant> & {
      children: React.ReactNode;
    }
>;

const NoticeVariant = cva(
  'inline-flex items-center justify-center rounded-[50px] px-4 py-2.5 text-center text-white',
  {
    variants: {
      variant: {
        primary: 'bg-gray-1',
        secondary: 'bg-gray-4',
        danger: 'bg-gray-2',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

const Notice: React.FC<NoticeProps> = ({
  children,
  className,
  variant,
  ...props
}) => {
  return (
    <div>
      <div
        className={cn(
          NoticeVariant({ variant }),
          className,
          'font-pretendard max-w-72 break-words text-center text-[12px] font-normal leading-normal text-white',
        )}
        {...props}
      >
        <p>{children}</p>
      </div>
    </div>
  );
};

export default Notice;
