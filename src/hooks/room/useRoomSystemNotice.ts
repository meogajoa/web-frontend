import { useSubscription } from 'react-stomp-hooks';
import { z } from 'zod';

enum RoomSystemNoticeType {
  GameStart = 'GAME_START',
}
const roomSystemNoticeType = z.nativeEnum(RoomSystemNoticeType);

const roomSystemNotice = z.object({
  type: roomSystemNoticeType,
  content: z.string(),
});

const useRoomSystemNotice = ({
  variables: { id },
  onGameStart,
}: {
  variables: { id: string };
  onGameStart?: () => void;
}) => {
  useSubscription(`/topic/room/${id}/notice/system`, ({ body }) => {
    const jsonBody = JSON.parse(body);
    const notice = roomSystemNotice.parse(jsonBody);

    console.debug(`/topic/room/${id}/notice/system: `, notice);

    switch (notice.type) {
      case RoomSystemNoticeType.GameStart:
        onGameStart?.();
        break;
    }
  });
};

export default useRoomSystemNotice;
