import React, { PropsWithChildren } from 'react';
import { StompSessionProvider } from 'react-stomp-hooks';
import { useSessionId } from '~/hooks/account';

const StompProvider = React.memo(({ children }: PropsWithChildren) => {
  const sessionId = useSessionId();

  return (
    <StompSessionProvider
      url={'ws://localhost:8080/ws'}
      connectHeaders={{
        Authorization: sessionId,
      }}
      onConnect={handleConnected}
    >
      {children}
    </StompSessionProvider>
  );

  function handleConnected() {
    console.log('Connected to WebSocket');
  }
});
StompProvider.displayName = 'StompProvider';

export default StompProvider;
