import React from 'react';

export const useDotsString = (maxLength: number) => {
  const [dots, setDots] = React.useState('');

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDots((dots) => (dots.length >= maxLength ? '' : dots + '.'));
    }, 500);

    return () => clearInterval(interval);
  }, [maxLength]);

  return dots;
};
