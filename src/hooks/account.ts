import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { server } from '~/utils/axios';
import { A_SECOND } from '~/utils/constants';
import { sleep } from '~/utils/misc';

export const useSessionId = () => {
  return React.useSyncExternalStore(
    (onStoreChange) => {
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === 'sessionId') {
          onStoreChange();
        }
      };
      window.addEventListener('storage', handleStorageChange);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    },
    () => localStorage.getItem('sessionId'),
    () => '',
  );
};

export const useAuthenticateMutation = ({
  sleepSeconds = 1,
}: {
  sleepSeconds?: number;
}) => {
  const sessionId = useSessionId();

  const _authenticateAsync = React.useCallback(async () => {
    server.post<void>('/auth/test');
    await sleep(sleepSeconds * A_SECOND);
  }, []);

  const mutation = useMutation({
    mutationFn: _authenticateAsync,
  });

  React.useEffect(() => {
    mutation.mutate();
  }, [sessionId]);

  return {
    ...mutation,
    authenticate: mutation.mutate,
    authenticateAsync: mutation.mutateAsync,
  };
};
