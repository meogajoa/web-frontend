'use client';

import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { server } from '~/utils/axios';
import { serializeToUrlEncoded } from '~/utils/misc';

type SignUpForm = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation?: string;
};

export const signUpMutationFn = async (data: SignUpForm): Promise<any> => {
  const { passwordConfirmation, ...filtered } = data;

  await server.post('/auth/sign-up', serializeToUrlEncoded(filtered), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

const SignUpPage = () => {
  const { register, handleSubmit } = useForm<SignUpForm>();

  const mutate = useMutation({
    mutationFn: signUpMutationFn,
  });

  const onSubmit: SubmitHandler<SignUpForm> = (data) => {
    mutate.mutate(data);
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
    </form>
  );
};

export default SignUpPage;
