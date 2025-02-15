import { username } from '@/types/account';
import { chatMessage } from '@/types/chat';
import { server } from '@/utils/axios';
import { A_SECOND } from '@/utils/constants';
import { sleep } from '@/utils/misc';
import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import React from 'react';
import { z } from 'zod';

export type JoinRoomRequest = {
  id: string;
};

const joinRoomResponse = z.object({
  chatLogs: z.array(chatMessage),
  name: z.string(),
  owner: username,
  playing: z.boolean(),
});
export type JoinRoomResponse = z.infer<typeof joinRoomResponse>;

const useJoinRoom = ({
  variables: { id },
  onError,
}: {
  variables: JoinRoomRequest;
  onError?: (error: AxiosError<JoinRoomResponse, JoinRoomRequest>) => void;
}) => {
  const _joinRoomAsync = React.useCallback(
    async ({ id: _id }: JoinRoomRequest) => {
      const data = server
        .post<JoinRoomResponse>('/room/join', { id: _id })
        .then((response) => joinRoomResponse.parse(response.data));
      await sleep(A_SECOND);
      return data;
    },
    [],
  );

  const mutation = useMutation<
    JoinRoomResponse,
    AxiosError<JoinRoomResponse, JoinRoomRequest>,
    JoinRoomRequest,
    void
  >({
    mutationFn: _joinRoomAsync,
    onError,
  });

  React.useEffect(() => {
    mutation.mutate({ id });
  }, [id]);

  return {
    ...mutation,
    joinRoom: mutation.mutate,
    joinRoomAsync: mutation.mutateAsync,
  };
};

export default useJoinRoom;
