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

export const useAuthentication = () => {
  const sessionId = useSessionId();

  const authenticate = React.useCallback(async () => {
    const response = server.post('/auth/test');
    await sleep(A_SECOND);
    return response;
  }, []);

  const mutation = useMutation({
    mutationFn: authenticate,
  });

  React.useEffect(() => {
    mutation.mutate();
  }, [sessionId]);

  return mutation;
};
