import { RoomChatBar } from '@/components/ChatBar';
import RoomHeaderGame from '@/containers/room/RoomHeaderGame';
import RoomHeaderLobby from '@/containers/room/RoomHeaderLobby';
import RoomMessages from '@/containers/room/RoomMessages';
import RoomUserList from '@/containers/room/RoomUserList';
import useUserGameInfo, { type UserGameInfo } from '@/hooks/game/useGameInfo';
import useGameSystemNotice, {
  type DayOrNightNotice,
} from '@/hooks/game/useGameSystemNotice';
import useGameUsersNotice, {
  type GameUsersNotice,
} from '@/hooks/game/useGameUsersNotice';
import useBodyBgColor from '@/hooks/misc/useBodyBgColor';
import useRoomSystemNotice from '@/hooks/room/useRoomSystemNotice';
import { useAccount } from '@/providers/AccountProvider';
import { useGame } from '@/providers/GameProvider';
import { useRoom } from '@/providers/RoomProvider';
import { ChatMessageType, ChatRoom } from '@/types/chat';
import { Team, UserNumber, UserStatus } from '@/types/game';
import { cn } from '@/utils/classname';
import { isValidUserNumber } from '@/utils/game';
import { uniqueId } from 'lodash-es';
import { useTranslations } from 'next-intl';
import React from 'react';

type Props = {
  className?: string;
  rejoin?: () => void;
};

const Room: React.FC<Props> = ({ className, rejoin }) => {
  const { id, isPlaying, setIsPlaying, setCurrentChatRoom, addMessage } =
    useRoom();
  const [canStartGame, setCanStartGame] = React.useState(isPlaying);
  const t = useTranslations('roomRoute.chatMessage');
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
    onDayOrNight: handleGameDayOrNight,
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
    const systemMessage = {
      type: ChatMessageType.System,
      sender: ChatMessageType.System,
      content: t('teamColorSystemMessage', {
        teamColor: gameInfo.teamColor,
      }),
      id: uniqueId(),
      sendTime: new Date(), // FIXME: replace with server time
    };
    addMessage(ChatRoom.General, systemMessage);
  }

  function handleGameDayOrNight(gameDayOrNightNotice: DayOrNightNotice) {
    setTime(gameDayOrNightNotice.dayOrNight);
  }

  function handleGameEnd() {
    rejoin?.();
  }

  function handleGameUsersNotice(gameUsersNotice: GameUsersNotice) {
    Object.values(UserNumber).forEach((_number) => {
      const number = Number(_number);
      if (!isValidUserNumber(number)) {
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
