import React from 'react';
import TanstackQueryProvider from '~/providers/TanstackQueryProvider';

type RootProviderProps = Readonly<React.PropsWithChildren>;

const RootProvider: React.FC<RootProviderProps> = ({ children }) => {
  return <TanstackQueryProvider>{children}</TanstackQueryProvider>;
};

export default RootProvider;
