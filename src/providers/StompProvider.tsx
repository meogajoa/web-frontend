import React, { PropsWithChildren } from 'react';
import { StompSessionProvider } from 'react-stomp-hooks';
import { useSessionId } from '~/hooks/account';
import { CONFIGS } from '~/utils/config';

type Props = {
  onConnect?: () => void;
  onError?: (error: Error) => void;
};

const StompProvider = React.memo<PropsWithChildren<Props>>(
  ({ onConnect, onError, children }) => {
    const sessionId = useSessionId();

    return (
      <StompSessionProvider
        url={CONFIGS.WS_URL}
        connectHeaders={{
          Authorization: sessionId,
        }}
        onConnect={onConnect}
        onWebSocketError={onError}
      >
        {children}
      </StompSessionProvider>
    );
  },
);
StompProvider.displayName = 'StompProvider';

export default StompProvider;
