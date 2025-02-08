'use client';

import { type AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useSignIn } from '~/hooks/account';
import { useRouter } from '~/i18n/routing';
import { useAccount } from '~/providers/AccountProvider';
import type { SignInForm, SignInResponse } from '~/types/account';

const SignInPage = () => {
  const { register, handleSubmit } = useForm<SignInForm>();
  const router = useRouter();
  const { setAccount } = useAccount();

  const { signIn } = useSignIn({
    onSuccess: handleSignInSuccess,
    onError: handleSignInError,
  });

  return (
    <form
      className="flex flex-col items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label htmlFor="email">Email</label>
        <input
          className="border"
          id="email"
          type="email"
          autoFocus
          {...register('email', { required: true })}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          className="border"
          id="password"
          type="password"
          {...register('password', { required: true })}
        />
      </div>

      <button className="border p-3" type="submit">
        Sign In
      </button>

      <button
        className="border p-3"
        onClick={(e) => {
          e.preventDefault();
          router.push('/account/sign-up');
        }}
      >
        Go to Sign Up page
      </button>
    </form>
  );

  function onSubmit(data: SignInForm) {
    signIn(data);
  }

  function handleSignInSuccess(data: SignInResponse) {
    localStorage.setItem('sessionId', data.sessionId);
    setAccount({ nickname: data.user.nickname });
    router.push('/home');
  }

  function handleSignInError(data: AxiosError<SignInResponse, SignInForm>) {
    console.error(data.message);
  }
};

export default SignInPage;
