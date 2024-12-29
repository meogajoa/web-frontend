'use client';

import { useMutation } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { redirect, useRouter } from '~/i18n/routing';
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
  const locale = useLocale();
  const router = useRouter();

  const mutate = useMutation({
    mutationFn: signInMutationFn,
  });

  const onSubmit: SubmitHandler<SignUpForm> = (data) => {
    mutate.mutate(data);
    redirect({ locale, href: '/' });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center"
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
        onClick={() => router.push('/account/sign-up')}
      >
        Go to Sign Up page
      </button>
    </form>
  );
};

export default SignInPage;
