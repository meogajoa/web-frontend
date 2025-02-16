import { RoomChatBar } from '@/components/ChatBar';
import RoomHeaderGame from '@/containers/room/RoomHeaderGame';
import RoomHeaderLobby from '@/containers/room/RoomHeaderLobby';
import RoomMessages from '@/containers/room/RoomMessages';
import RoomUserList from '@/containers/room/RoomUserList';
import useUserGameInfo, { type UserGameInfo } from '@/hooks/game/useGameInfo';
import useGameSystemNotice, {
  type GameDayOrNightSystemNotice,
  type GameEndSystemNotice,
} from '@/hooks/game/useGameSystemNotice';
import useGameUsersNotice, {
  type GameUsersNotice,
} from '@/hooks/game/useGameUsersNotice';
import useBodyBgColor from '@/hooks/misc/useBodyBgColor';
import useRoomSystemNotice from '@/hooks/room/useRoomSystemNotice';
import { useAccount } from '@/providers/AccountProvider';
import { useGame } from '@/providers/GameProvider';
import { useRoom } from '@/providers/RoomProvider';
import { ChatRoom } from '@/types/chat';
import { Team, UserNumber, UserStatus } from '@/types/game';
import { cn } from '@/utils/classname';
import React from 'react';

type Props = {
  className?: string;
};

const Room: React.FC<Props> = ({ className }) => {
  const {
    id,
    isPlaying,
    setIsPlaying,
    setCurrentChatRoom,
    clearInGameMessages,
  } = useRoom();
  const [canStartGame, setCanStartGame] = React.useState(isPlaying);
  const { account } = useAccount();
  const {
    user,
    setUser,
    setUserByNumber,
    setTime,
    setWhiteTeamUsers,
    setBlackTeamUsers,
    setEliminatedUsers,
    setRedTeamUsers,
    clear: clearGame,
  } = useGame();

  useBodyBgColor(
    user.team === Team.Black
      ? 'var(--color-gray-3)'
      : user.team === Team.Red
        ? 'var(--color-white)'
        : 'var(--color-gray-6)',
  );

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
        user.team === Team.Red && 'bg-red/15',
        className,
      )}
      data-testid="room"
    >
      {!isPlaying ? (
        <RoomHeaderLobby className="shrink-0" />
      ) : (
        <RoomHeaderGame className="shrink-0" />
      )}
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
      status: gameInfo.eliminated ? UserStatus.Eliminated : UserStatus.Alive,
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
    setCurrentChatRoom(ChatRoom.Lobby);
    setIsPlaying(false);
    clearGame();
    clearInGameMessages();
  }

  function handleGameUsersNotice(gameUsersNotice: GameUsersNotice) {
    Object.values(UserNumber).forEach((_number) => {
      const number = Number(_number);
      if (number === UserNumber.Invalid || number <= 0 || number >= 9) {
        return;
      }

      const isBlack = gameUsersNotice.blackTeam.includes(number);
      const isEliminated = gameUsersNotice.eliminated.includes(number);

      setUserByNumber(number, {
        status: isEliminated ? UserStatus.Eliminated : UserStatus.Alive,
        team: isBlack ? Team.Black : Team.White,
        number,
      });
    });

    setWhiteTeamUsers(gameUsersNotice.whiteTeam);
    setBlackTeamUsers(gameUsersNotice.blackTeam);
    setRedTeamUsers(gameUsersNotice.redTeam);
    setEliminatedUsers(gameUsersNotice.eliminated);
  }
};

export default Room;
