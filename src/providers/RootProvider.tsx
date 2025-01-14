'use client';

import React from 'react';
import { StompSessionProvider } from 'react-stomp-hooks';
import TanstackQueryProvider from '~/providers/TanstackQueryProvider';

type Props = {};

const RootProvider: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  return (
    <TanstackQueryProvider>
      <StompSessionProvider url={'http://localhost:8080/topic/alert'}>
        {children}
      </StompSessionProvider>
    </TanstackQueryProvider>
  );
};

export default RootProvider;
