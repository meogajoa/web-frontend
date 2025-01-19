import React from 'react';
import { StompSessionProvider } from 'react-stomp-hooks';
import { useAccount } from '~/hooks/account';

const StompProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { sessionId } = useAccount();

  return (
    <StompSessionProvider
      url={'ws://localhost:8080/ws'}
      connectHeaders={{
        Authorization: sessionId || '',
      }}
    >
      {children}
    </StompSessionProvider>
  );
};

export default StompProvider;
