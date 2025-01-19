'use client';

import React from 'react';
import TanstackQueryProvider from '~/providers/TanstackQueryProvider';

type Props = {};

const RootProvider: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  return <TanstackQueryProvider>{children}</TanstackQueryProvider>;
};

export default RootProvider;
