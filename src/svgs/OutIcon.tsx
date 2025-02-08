import React from 'react';
import { cn } from '~/utils/classname';

type Props = React.ComponentProps<'svg'>;

const OutIcon: React.FC<Props> = ({ className, ...props }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('fill-none', className)}
      {...props}
    >
      <path
        d="M21.0272 9.64183L17.7942 6.40881C17.4631 6.08903 16.9354 6.09821 16.6157 6.42932C16.3037 6.7523 16.3037 7.26438 16.6157 7.58736L19.8487 10.8204C19.9448 10.9183 20.0287 11.0275 20.0987 11.1454C20.0862 11.1454 20.0762 11.1388 20.0637 11.1388L6.99162 11.1654C6.53131 11.1654 6.15816 11.5386 6.15816 11.9989C6.15816 12.4592 6.53131 12.8323 6.99162 12.8323L20.0587 12.8057C20.082 12.8057 20.1012 12.794 20.1237 12.7923C20.0498 12.9333 19.956 13.063 19.8454 13.1774L16.6123 16.4104C16.2812 16.7302 16.2721 17.2578 16.5918 17.5889C16.9116 17.92 17.4392 17.9292 17.7703 17.6094C17.7773 17.6027 17.7841 17.5959 17.7909 17.5889L21.0239 14.3559C22.3254 13.054 22.3254 10.9437 21.0239 9.64183H21.0272Z"
        fill="white"
      />
      <path
        d="M12.9051 20.3343H6.16731C4.78639 20.3343 3.66691 19.2148 3.66691 17.8339V6.1654C3.66691 4.78447 4.78639 3.66499 6.16731 3.66499H12.9051C13.3654 3.66499 13.7386 3.29185 13.7386 2.83154C13.7386 2.37123 13.3655 1.99805 12.9051 1.99805H6.16731C3.86694 2.00082 2.00277 3.86499 2 6.1654V17.834C2.00277 20.1343 3.86694 21.9985 6.16735 22.0013H12.9052C13.3655 22.0013 13.7386 21.6281 13.7386 21.1678C13.7386 20.7075 13.3655 20.3343 12.9051 20.3343Z"
        fill="white"
      />
    </svg>
  );
};

export default OutIcon;
