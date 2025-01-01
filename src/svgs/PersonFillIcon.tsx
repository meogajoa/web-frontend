import React from 'react';

type Props = React.ComponentProps<'svg'>;

const PersonFillIcon: React.FC<Props> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10M12 12a9.01 9.01 0 0 0-9 9 1 1 0 0 0 1 1h16a1 1 0 0 0 1-1 9.01 9.01 0 0 0-9-9" />
    </svg>
  );
};

export default PersonFillIcon;
