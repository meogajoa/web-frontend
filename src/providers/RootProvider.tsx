'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';
import { AccountStoreProvider } from '~/providers/AccountProvider';
import TanstackQueryProvider from '~/providers/TanstackQueryProvider';
import { ThemeProvider } from '~/providers/ThemeProvider';

type Props = {};

const RootProvider: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  return (
    <>
      <ThemeProvider bgColor="var(--color-white)">
        <AccountStoreProvider>
          <TanstackQueryProvider>{children}</TanstackQueryProvider>
        </AccountStoreProvider>
      </ThemeProvider>

      {/**
       * TODO: Customize the toast style
       * https://react-hot-toast.com/docs/toast-bar
       */}
      <Toaster position="top-right" />
    </>
  );
};

export default RootProvider;
