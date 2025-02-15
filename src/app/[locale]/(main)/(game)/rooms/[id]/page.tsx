'use client';

import LoadingIndicator from '@/components/LoadingIndicator';
import Room from '@/components/Room';
import useJoinRoom from '@/hooks/room/useJoinRoom';
import { GameProvider } from '@/providers/GameProvider';
import { RoomProvider } from '@/providers/RoomProvider';
import { ChatRoom } from '@/types/chat';
import { useTranslations } from 'next-intl';
import React from 'react';
type Props = {
  params: Promise<{ id: string }>;
};

const RoomPage: React.FC<Props> = ({ params }) => {
  const t = useTranslations('roomRoute');
  const { id } = React.use(params);
  const { isSuccess, isPending, data } = useJoinRoom({
    variables: { id },
  });

  return (
    <>
      {isPending && (
        <LoadingIndicator className="min-h-dvh" label={t('enteringRoom')} />
      )}
      {isSuccess && (
        <RoomProvider
          id={id}
          title={data.name}
          hostNickname={data.owner}
          isPlaying={data.playing}
          lobbyChatLogs={data.chatLogs}
          currentChatRoom={ChatRoom.Lobby}
        >
          <GameProvider>
            <Room />
          </GameProvider>
        </RoomProvider>
      )}
    </>
  );
};

export default RoomPage;
