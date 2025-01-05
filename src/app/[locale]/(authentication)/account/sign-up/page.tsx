'use client';

import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from '~/i18n/routing';
import { server } from '~/utils/axios';
import { serializeToUrlEncoded } from '~/utils/misc';

type SignUpForm = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation?: string;
};

const signUpMutationFn = async (data: SignUpForm): Promise<any> => {
  const { passwordConfirmation, ...filtered } = data;

  await server.post('/auth/sign-up', serializeToUrlEncoded(filtered), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

const SignUpPage = () => {
  const { register, handleSubmit } = useForm<SignUpForm>();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: signUpMutationFn,
  });

  const onSubmit: SubmitHandler<SignUpForm> = (data) => {
    mutate(data);
    router.push('/account/sign-in');
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
};

export default SignUpPage;
