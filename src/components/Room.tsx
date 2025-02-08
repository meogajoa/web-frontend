import React from 'react';
import { RoomChatBar } from '~/components/ChatBar';
import RoomHeader from '~/components/RoomHeader/RoomHeader';
import RoomMessages from '~/components/RoomMessages';
import RoomUserList from '~/components/RoomUserList';
import { useUserGameInfo } from '~/hooks/game';
import { useRoomSystemNotice } from '~/hooks/room';
import { useAccount } from '~/providers/AccountProvider';
import { useGame } from '~/providers/GameProvider';
import { useRoom } from '~/providers/RoomProvider';
import { UserGameInfo } from '~/types/game';
import { cn } from '~/utils/classname';

type Props = {
  className?: string;
};

const Room: React.FC<Props> = ({ className }) => {
  const [canStartGame, setCanStartGame] = React.useState(false);

  const { id, isPlaying, setIsPlaying } = useRoom();
  const { account } = useAccount();
  const { setPlayer } = useGame();

  useRoomSystemNotice({
    variables: { id },
    onGameStart: handleGameStart,
  });

  useUserGameInfo({
    variables: {
      username: account.nickname,
    },
    enabled: canStartGame,
    onMessage: handleUserGameInfo,
  });

  return (
    <div className={cn('flex h-full flex-col', className)}>
      <RoomHeader className="shrink-0" />
      {!isPlaying && <RoomUserList />}
      <RoomMessages className="flex-1" />
      <RoomChatBar
        className="bottom-0-dynamic fixed w-full"
        renderPlaceholder
      />
    </div>
  );

  function handleGameStart() {
    setCanStartGame(true);
  }

  function handleUserGameInfo(gameInfo: UserGameInfo) {
    setIsPlaying(true);
    setPlayer({
      team: gameInfo.teamColor,
      number: gameInfo.number,
      alive: true,
      money: gameInfo.money,
      isSpy: gameInfo.isSpy,
    });
  }
};

export default Room;
