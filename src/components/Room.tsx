import React from 'react';
import { RoomChatBar } from '~/components/ChatBar';
import RoomHeader from '~/components/RoomHeader/RoomHeader';
import RoomMessages from '~/components/RoomMessages';
import RoomUserList from '~/components/RoomUserList';
import {
  useGameSystemNotice,
  useGameUsersNotice,
  useUserGameInfo,
} from '~/hooks/game';
import { useRoomSystemNotice } from '~/hooks/room';
import { useAccount } from '~/providers/AccountProvider';
import { useGame } from '~/providers/GameProvider';
import { useRoom } from '~/providers/RoomProvider';
import { ChatRoom } from '~/types/chat';
import {
  GameDayOrNightSystemNotice,
  GameEndSystemNotice,
  GameUsersNotice,
  Team,
  UserGameInfo,
} from '~/types/game';
import { cn } from '~/utils/classname';

type Props = {
  className?: string;
};

const Room: React.FC<Props> = ({ className }) => {
  const { id, isPlaying, setIsPlaying, setCurrentChatRoom } = useRoom();
  const [canStartGame, setCanStartGame] = React.useState(isPlaying);
  const { account } = useAccount();
  const { user, setUser, setTime } = useGame();

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

  useGameSystemNotice({
    variables: { id },
    enabled: canStartGame,
    onGameDayOrNight: handleGameDayOrNight,
    onGameEnd: handleGameEnd,
  });

  useGameUsersNotice({
    variables: { id },
    enabled: canStartGame,
    onMessage: handleGameUsersNotice,
  });

  return (
    <div
      className={cn(
        'bg-gray-6 flex h-full flex-col',
        user.team === Team.Black && 'bg-gray-3',
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
    setUser({
      team: gameInfo.teamColor,
      number: gameInfo.number,
      eliminated: gameInfo.eliminated,
      money: gameInfo.money,
      isSpy: gameInfo.spy,
    });
  }

  function handleGameDayOrNight(
    gameDayOrNightNotice: GameDayOrNightSystemNotice,
  ) {
    setTime(gameDayOrNightNotice.dayOrNight);
  }

  function handleGameEnd(gameEndNotice: GameEndSystemNotice) {
    // TODO: add mini game end logic
  }

  function handleGameUsersNotice(gameUsersNotice: GameUsersNotice) {
    // TODO: update user list
  }
};

export default Room;
