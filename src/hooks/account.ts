import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { omit } from 'lodash-es';
import React from 'react';
import {
  authenticateResponse,
  signInResponse,
  type AuthenticateResponse,
  type SignInForm,
  type SignInResponse,
  type SignUpForm,
} from '~/types/account';
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
    () => localStorage.getItem('sessionId') || '',
    () => '',
  );
};

export const useAuthenticate = ({
  sleepSeconds = 1,
  onSuccess,
  onError,
}: {
  sleepSeconds?: number;
  onSuccess?: (data: AuthenticateResponse) => void;
  onError?: (error: AxiosError<AuthenticateResponse, void>) => void;
}) => {
  const sessionId = useSessionId();

  const _authenticateAsync = React.useCallback(async () => {
    const data = server
      .post<AuthenticateResponse>('/auth/test')
      .then((response) => authenticateResponse.parse(response.data));
    await sleep(sleepSeconds * A_SECOND);
    return data;
  }, []);

  const mutation = useMutation<
    AuthenticateResponse,
    AxiosError<AuthenticateResponse, void>,
    void,
    void
  >({
    mutationFn: _authenticateAsync,
    onSuccess,
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

export const useSignIn = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: SignInResponse, variables: SignInForm) => void;
  onError?: (error: AxiosError<SignInResponse, SignInForm>) => void;
}) => {
  const _signInAsync = React.useCallback(async (data: SignInForm) => {
    return server
      .post<SignInResponse>(
        '/auth/sign-in',
        new URLSearchParams(data).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .then((response) => signInResponse.parse(response.data));
  }, []);

  const mutation = useMutation<
    SignInResponse,
    AxiosError<SignInResponse, SignInForm>,
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

export const useSignUp = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: void, variables: SignUpForm) => void;
  onError?: (error: AxiosError<void, SignUpForm>) => void;
}) => {
  const _signUpAsync = React.useCallback(
    async (data: SignUpForm): Promise<void> => {
      const filtered = omit(data, ['passwordConfirmation']);

      server.post<void>(
        '/auth/sign-up',
        new URLSearchParams(filtered).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
    },
    [],
  );

  const mutation = useMutation<
    void,
    AxiosError<void, SignUpForm>,
    SignUpForm,
    void
  >({
    mutationFn: _signUpAsync,
    onSuccess,
    onError,
    retry: false,
  });

  return {
    ...mutation,
    signUp: mutation.mutate,
    signUpAsync: mutation.mutateAsync,
  };
};
