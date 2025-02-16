import { RoomChatBar } from '@/components/ChatBar';
import RoomHeaderGame from '@/containers/room/RoomHeaderGame';
import RoomHeaderLobby from '@/containers/room/RoomHeaderLobby';
import RoomMessages from '@/containers/room/RoomMessages';
import RoomUserList from '@/containers/room/RoomUserList';
import useGamePlayersNotice, {
  type GameUsersNotice,
} from '@/hooks/game/useGamePlayersNotice';
import useGameSystemNotice, {
  type DayOrNightNotice,
} from '@/hooks/game/useGameSystemNotice';
import usePlayerGameInfo, {
  type PlayerGameInfo,
} from '@/hooks/game/usePlayerGameInfo';
import useBodyBgColor from '@/hooks/misc/useBodyBgColor';
import useRoomSystemNotice from '@/hooks/room/useRoomSystemNotice';
import { useGame } from '@/providers/GameProvider';
import { useRoom } from '@/providers/RoomProvider';
import { useUser } from '@/providers/UserProvider';
import { ChatMessageType, ChatRoom } from '@/types/chat';
import { PlayerNumber, PlayerStatus, Team } from '@/types/game';
import { getMyTeamChatRoom } from '@/utils/chat';
import { cn } from '@/utils/classname';
import { isValidPlayerNumber } from '@/utils/game';
import { useTranslations } from 'next-intl';
import React from 'react';

type Props = {
  className?: string;
  rejoin?: () => void;
};

const Room: React.FC<Props> = ({ className, rejoin }) => {
  const {
    id,
    isPlaying,
    setIsPlaying,
    setCurrentChatRoom,
    broadcastMessage,
    addMessage,
  } = useRoom();
  const [canStartGame, setCanStartGame] = React.useState(isPlaying);
  const t = useTranslations('roomRoute.chatMessage');
  const { user } = useUser();

  const {
    player,
    setPlayer,
    setPlayerByPlayerNumber,
    setTime,
    setWhitePlayerNumbers,
    setBlackPlayerNumbers,
    setEliminatedPlayerNumbers,
    setRedPlayerNumbers,
  } = useGame();

  useBodyBgColor(
    player.team === Team.Black
      ? 'var(--color-gray-3)'
      : player.team === Team.Red
        ? 'var(--color-white)'
        : 'var(--color-gray-6)',
  );

  useRoomSystemNotice({
    variables: { id },
    onGameStart: handleGameStart,
  });

  usePlayerGameInfo({
    variables: {
      username: user.name,
    },
    enabled: canStartGame,
    onPlayerInfo: handlePlayerGameInfo,
  });

  useGameSystemNotice({
    variables: { id },
    enabled: canStartGame,
    onDayOrNight: handleGameDayOrNight,
    onGameEnd: handleGameEnd,
  });

  useGamePlayersNotice({
    variables: { id },
    enabled: canStartGame,
    onMessage: handleGamePlayersNotice,
  });

  return (
    <div
      className={cn(
        'bg-gray-6 flex h-full flex-col',
        player.team === Team.Black && 'bg-gray-3',
        player.team === Team.Red && 'bg-red/15',
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

  function handlePlayerGameInfo({ id, player, sendTime }: PlayerGameInfo) {
    setIsPlaying(true);
    setCurrentChatRoom(ChatRoom.General);
    setPlayer({
      team: player.teamColor,
      number: player.number,
      status: player.eliminated ? PlayerStatus.Eliminated : PlayerStatus.Alive,
      money: player.money,
      isSpy: player.spy,
    });

    const myTeamRoom = getMyTeamChatRoom(player.teamColor);

    broadcastMessage([ChatRoom.General, ChatRoom.Personal, myTeamRoom], {
      id,
      sendTime: sendTime,
      type: ChatMessageType.System,
      sender: ChatMessageType.System,
      content: t('teamColorSystemMessage', {
        teamColor: player.teamColor,
      }),
    });
  }

  function handleGameDayOrNight(gameDayOrNightNotice: DayOrNightNotice) {
    setTime(gameDayOrNightNotice.dayOrNight);
  }

  function handleGameEnd() {
    rejoin?.();
  }

  function handleGamePlayersNotice(gameUsersNotice: GameUsersNotice) {
    Object.values(PlayerNumber).forEach((_number) => {
      const number = Number(_number);
      if (!isValidPlayerNumber(number)) {
        return;
      }

      const isBlack = gameUsersNotice.blackTeam.includes(number);
      const isEliminated = gameUsersNotice.eliminated.includes(number);

      setPlayerByPlayerNumber(number, {
        status: isEliminated ? PlayerStatus.Eliminated : PlayerStatus.Alive,
        team: isBlack ? Team.Black : Team.White,
        number,
      });
    });

    setWhitePlayerNumbers(gameUsersNotice.whiteTeam);
    setBlackPlayerNumbers(gameUsersNotice.blackTeam);
    setRedPlayerNumbers(gameUsersNotice.redTeam);
    setEliminatedPlayerNumbers(gameUsersNotice.eliminated);

    const myTeamPlayerNumbers =
      player.team === Team.White
        ? gameUsersNotice.whiteTeam
        : player.team === Team.Black
          ? gameUsersNotice.blackTeam
          : gameUsersNotice.redTeam;

    addMessage(getMyTeamChatRoom(player.team), {
      id: gameUsersNotice.id,
      sendTime: new Date(),
      type: ChatMessageType.System,
      sender: ChatMessageType.System,
      content: t('teamChatStartSystemMessage', {
        userNames: myTeamPlayerNumbers
          .map((playerNumber) => t('inGameUsername', { playerNumber }))
          .join(', '),
      }),
    });
  }
};

export default Room;
