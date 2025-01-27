import { useMutation } from '@tanstack/react-query';
import { type AxiosError, type AxiosResponse } from 'axios';
import React from 'react';
import type { SignInForm, SignInResponse, SignUpForm } from '~/types/account';
import { server } from '~/utils/axios';
import { A_SECOND } from '~/utils/constants';
import { serializeToUrlEncoded, sleep } from '~/utils/misc';

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
  onError,
}: {
  sleepSeconds?: number;
  onError?: (error: AxiosError<void, void>) => void;
}) => {
  const sessionId = useSessionId();

  const _authenticateAsync = React.useCallback(async () => {
    const response = server.post<void>('/auth/test');
    await sleep(sleepSeconds * A_SECOND);
    return response;
  }, []);

  const mutation = useMutation<
    AxiosResponse<void, void>,
    AxiosError<void, void>
  >({
    mutationFn: _authenticateAsync,
    onError,
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

export const useSignInMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: SignInResponse, variables: SignInForm) => void;
  onError?: (error: AxiosError<SignInResponse, SignInResponse>) => void;
}) => {
  const _signInAsync = React.useCallback(async (data: SignInForm) => {
    return server
      .post<SignInResponse>('/auth/sign-in', serializeToUrlEncoded(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((response) => response.data);
  }, []);

  const mutation = useMutation<
    SignInResponse,
    AxiosError<SignInResponse, SignInResponse>,
    SignInForm,
    void
  >({
    mutationFn: _signInAsync,
    onSuccess,
    onError,
  });

  return {
    ...mutation,
    signIn: mutation.mutate,
    signInAsync: mutation.mutateAsync,
  };
};

export const useSignUpMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: void, variables: SignUpForm) => void;
  onError?: (error: AxiosError<void, void>) => void;
}) => {
  const _signUpAsync = React.useCallback(
    async (data: SignUpForm): Promise<void> => {
      const { passwordConfirmation, ...filtered } = data;

      server.post<void>('/auth/sign-up', serializeToUrlEncoded(filtered), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
    },
    [],
  );

  const mutation = useMutation<void, AxiosError<void, void>, SignUpForm, void>({
    mutationFn: _signUpAsync,
    onSuccess,
    onError,
  });

  return {
    ...mutation,
    signUp: mutation.mutate,
    signUpAsync: mutation.mutateAsync,
  };
};
