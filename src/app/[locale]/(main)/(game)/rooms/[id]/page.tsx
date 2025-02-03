'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import LoadingIndicator from '~/components/LoadingIndicator';
import Room from '~/components/Room';
import { useJoinRoomMutation } from '~/hooks/room';
import { GameProvider } from '~/providers/GameProvider';
import { RoomProvider } from '~/providers/RoomProvider';

type Props = {
  params: Promise<{ id: string }>;
};

const RoomPage: React.FC<Props> = ({ params }) => {
  const t = useTranslations('roomRoute');
  const { id: roomId } = React.use(params);
  const { isSuccess, isPending, data } = useJoinRoomMutation({
    variables: { id: roomId },
  });

  return (
    <>
      {isPending && (
        <LoadingIndicator className="min-h-dvh" label={t('enteringRoom')} />
      )}
      {isSuccess && (
        <RoomProvider
          title={data.name}
          hostNickname={data.owner}
          chatLogs={data.chatLogs}
        >
          <GameProvider>
            <Room />
          </GameProvider>
        </RoomProvider>
      )}

      <style>{`
        body {
          background-color: var(--color-gray-6);
        }
      `}</style>
    </>
  );
};

export default RoomPage;
