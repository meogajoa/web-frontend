import React from 'react';

type Props = React.ComponentProps<'svg'>;

const HomeFillIcon: React.FC<Props> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path d="M16.167 16.997V22H19.5a2.5 2.5 0 0 0 2.5-2.502v-7.605c0-.433-.168-.85-.47-1.16l-7.08-7.661a3.33 3.33 0 0 0-4.897 0L2.484 10.73c-.31.312-.484.735-.484 1.175v7.593A2.5 2.5 0 0 0 4.5 22h3.333v-5.003c.016-2.274 1.85-4.13 4.066-4.184 2.289-.055 4.25 1.833 4.268 4.184" />
      <path d="M12 14.325a2.56 2.56 0 0 0-2.558 2.558V22h5.117v-5.116A2.56 2.56 0 0 0 12 14.325" />
    </svg>
  );
};

export default HomeFillIcon;
