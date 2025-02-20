import React from 'react';

type Props = React.ComponentProps<'svg'>;

const ChatIcon: React.FC<Props> = (props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M1.84418 10.5006C1.84418 5.93826 5.54269 2.23975 10.105 2.23975L13.895 2.23999C18.4573 2.23999 22.1558 5.93851 22.1558 10.5009C22.1558 15.0632 18.4573 18.7617 13.895 18.7617L10.105 18.7615C5.54269 18.7615 1.84418 15.063 1.84418 10.5006Z" />
      <path d="M13.6137 13.5439C14.0984 13.5439 14.2996 14.1644 13.9071 14.4488L5.63757 21.6647C5.30699 21.9042 4.84418 21.668 4.84418 21.2598L4.84418 14.0439C4.84418 13.7678 5.06803 13.5439 5.34416 13.5439H13.6137Z" />
    </svg>
  );
};

export default ChatIcon;
