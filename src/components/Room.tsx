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
import { ChatRoom } from '~/types/chat';
import { Team, UserGameInfo } from '~/types/game';
import { cn } from '~/utils/classname';

type Props = {
  className?: string;
};

const Room: React.FC<Props> = ({ className }) => {
  const { id, isPlaying, setIsPlaying, setCurrentChatRoom } = useRoom();
  const [canStartGame, setCanStartGame] = React.useState(isPlaying);
  const { account } = useAccount();
  const { player, setPlayer } = useGame();

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
    <div
      className={cn(
        'bg-gray-6 flex h-full flex-col',
        player.team === Team.Black && 'bg-gray-3',
        className,
      )}
    >
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
    setCurrentChatRoom(ChatRoom.General);
    setPlayer({
      team: gameInfo.teamColor,
      number: gameInfo.number,
      eliminated: gameInfo.eliminated,
      money: gameInfo.money,
      isSpy: gameInfo.spy,
    });
  }
};

export default Room;
