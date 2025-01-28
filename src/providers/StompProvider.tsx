import React, { PropsWithChildren } from 'react';
import { StompSessionProvider } from 'react-stomp-hooks';
import { useSessionId } from '~/hooks/account';

type Props = {
  onConnect?: () => void;
  onError?: (error: Error) => void;
};

const StompProvider = React.memo<PropsWithChildren<Props>>(
  ({ onConnect: handleConnect, onError, children }) => {
    const sessionId = useSessionId();

    return (
      <StompSessionProvider
        url={'ws://localhost:8080/ws'}
        connectHeaders={{
          Authorization: sessionId,
        }}
        onConnect={handleConnect}
        onWebSocketError={handleError}
      >
        {children}
      </StompSessionProvider>
    );

    function handleError(error: Error) {
      console.error(error);
      onError?.(error);
    }
  },
);
StompProvider.displayName = 'StompProvider';

export default StompProvider;
