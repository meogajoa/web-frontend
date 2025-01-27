import { debounce } from 'lodash-es';
import React from 'react';
import { A_SECOND } from '~/utils/constants';

export const useDotsString = ({ maxLength = 3 }: { maxLength?: number }) => {
  const [dots, setDots] = React.useState('');

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDots((dots) => (dots.length >= maxLength ? '' : dots + '.'));
    }, 500);

    debounce(() => {
      clearInterval(interval);
    }, 30 * A_SECOND)();

    return () => clearInterval(interval);
  }, []);

  return dots;
};
