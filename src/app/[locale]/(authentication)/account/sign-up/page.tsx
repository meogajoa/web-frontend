'use client';

import { useForm } from 'react-hook-form';
import { useSignUpMutation } from '~/hooks/account';
import { useRouter } from '~/i18n/routing';
import { SignUpForm } from '~/types/account';

const SignUpPage = () => {
  const { register, handleSubmit } = useForm<SignUpForm>();
  const router = useRouter();

  const { signUp } = useSignUpMutation({
    onSuccess: handleSignUpSuccess,
    onError: handleSignUpError,
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

      <div>
        <label htmlFor="passwordConfirmation">Password Confirmation</label>
        <input
          className="border"
          type="password"
          {...register('passwordConfirmation', { required: true })}
        />
      </div>

      <div>
        <label htmlFor="nickname">Nickname</label>
        <input
          className="border"
          type="text"
          {...register('nickname', { required: true })}
        />
      </div>

      <button className="border p-3" type="submit">
        Sign Up
      </button>

      <button
        className="border p-3"
        onClick={() => router.push('/account/sign-in')}
      >
        Go to Sign In oage
      </button>
    </form>
  );

  function onSubmit(data: SignUpForm) {
    signUp(data);
  }

  function handleSignUpSuccess() {
    router.push('/account/sign-in');
  }

  function handleSignUpError() {
    alert('Failed to sign up');
  }
};

export default SignUpPage;
