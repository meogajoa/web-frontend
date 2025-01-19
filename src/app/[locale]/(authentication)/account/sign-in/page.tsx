'use client';

import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from '~/i18n/routing';
import { server } from '~/utils/axios';
import { serializeToUrlEncoded } from '~/utils/misc';

type SignUpForm = {
  email: string;
  password: string;
};

const signInMutationFn = async (data: SignUpForm): Promise<any> => {
  const response = await server.post(
    '/auth/sign-in',
    serializeToUrlEncoded(data),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  localStorage.setItem('sessionId', response.data.sessionId);
};

const SignInPage = () => {
  const { register, handleSubmit } = useForm<SignUpForm>();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: signInMutationFn,
  });

  const onSubmit: SubmitHandler<SignUpForm> = (data) => {
    mutate(data);
    router.push('/');
  };

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
};

export default SignInPage;
