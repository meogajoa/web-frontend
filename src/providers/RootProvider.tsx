'use client';

import React from 'react';
import { AccountStoreProvider } from '~/providers/AccountProvider';
import TanstackQueryProvider from '~/providers/TanstackQueryProvider';

type Props = {};

const RootProvider: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  return (
    <AccountStoreProvider>
      <TanstackQueryProvider>{children}</TanstackQueryProvider>;
    </AccountStoreProvider>
  );
};

export default RootProvider;
