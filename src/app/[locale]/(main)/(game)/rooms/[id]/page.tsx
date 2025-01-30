'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import LoadingIndicator from '~/components/LoadingIndicator';
import Room from '~/components/Room';
import { useJoinRoomMutation } from '~/hooks/room';

type Props = {
  params: Promise<{ id: string }>;
};

const RoomPage: React.FC<Props> = ({ params }) => {
  const t = useTranslations('roomRoute');
  const { id: roomId } = React.use(params);
  const { isSuccess, isPending, previousMessages, title, ownerUsername } =
    useJoinRoomMutation({
      variables: { id: roomId },
    });

  return (
    <>
      {isPending && (
        <LoadingIndicator className="min-h-dvh" label={t('enteringRoom')} />
      )}
      {isSuccess && previousMessages && title && ownerUsername && (
        <Room
          title={title}
          ownerUsername={ownerUsername}
          previousMessages={previousMessages}
        />
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
