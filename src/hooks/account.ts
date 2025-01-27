import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import React from 'react';
import {
  authenticateResponse,
  type AuthenticateResponse,
  type SignInForm,
  type SignInResponse,
  type SignUpForm,
} from '~/types/account';
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
  onSuccess,
  onError,
}: {
  sleepSeconds?: number;
  onSuccess?: (data: AuthenticateResponse) => void;
  onError?: (
    error: AxiosError<AuthenticateResponse, AuthenticateResponse>,
  ) => void;
}) => {
  const sessionId = useSessionId();

  const _authenticateAsync = React.useCallback(async () => {
    const data = server
      .post<AuthenticateResponse>('/auth/test')
      .then((response) => {
        const parseResult = authenticateResponse.safeParse(response.data);
        if (parseResult.error) {
          throw new Error(parseResult.error.message);
        }

        return parseResult.data;
      });
    await sleep(sleepSeconds * A_SECOND);
    return data;
  }, []);

  const mutation = useMutation<
    AuthenticateResponse,
    AxiosError<AuthenticateResponse, AuthenticateResponse>,
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
