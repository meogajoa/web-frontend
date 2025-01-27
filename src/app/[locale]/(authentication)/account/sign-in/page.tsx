'use client';

import { useForm } from 'react-hook-form';
import { useSignInMutation } from '~/hooks/account';
import { useRouter } from '~/i18n/routing';
import type { SignInForm, SignInResponse } from '~/types/account';

const SignInPage = () => {
  const { register, handleSubmit } = useForm<SignInForm>();
  const router = useRouter();

  const { signIn } = useSignInMutation({
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
          type="email"
          {...register('email', { required: true })}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          className="border"
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
    router.push('/home');
  }

  function handleSignInError() {
    alert('Sign in failed');
  }
};

export default SignInPage;
