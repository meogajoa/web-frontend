'use client';

import React from 'react';
import { StompSessionProvider } from 'react-stomp-hooks';
import TanstackQueryProvider from '~/providers/TanstackQueryProvider';

type RootProviderProps = React.PropsWithChildren;

const RootProvider: React.FC<RootProviderProps> = ({ children }) => {
  return (
    <TanstackQueryProvider>
      <StompSessionProvider url={'https://stream.elite12.de/api/sock'}>
        {children}
      </StompSessionProvider>
    </TanstackQueryProvider>
  );
};

export default RootProvider;
