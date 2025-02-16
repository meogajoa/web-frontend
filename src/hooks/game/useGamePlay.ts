import { MiniGame, Team } from '@/types/game';

import { ChatMessageType } from '@/types/chat';

import useGamePlayersNotice, {
  type GameUsersNotice,
} from '@/hooks/game/useGamePlayersNotice';
import useGameSystemNotice, {
  type DayOrNightNotice,
  type MiniGameWillStartNotice,
} from '@/hooks/game/useGameSystemNotice';
import usePlayerGameInfo, {
  type PlayerGameInfo,
} from '@/hooks/game/usePlayerGameInfo';
import { useGame } from '@/providers/GameProvider';
import { useRoom } from '@/providers/RoomProvider';
import { useUser } from '@/providers/UserProvider';
import { ChatRoom } from '@/types/chat';
import { PlayerNumber, PlayerStatus } from '@/types/game';
import { getMyTeamChatRoom } from '@/utils/chat';
import { isValidPlayerNumber } from '@/utils/game';
import { useTranslations } from 'next-intl';

const useGamePlay = ({
  canStartGame,
  onGameEnd: handleGameEnd,
}: {
  canStartGame: boolean;
  onGameEnd?: () => void;
}) => {
  const { user } = useUser();
  const t = useTranslations('roomRoute.chatMessage');

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

  const { id, setIsPlaying, setCurrentChatRoom, broadcastMessage, addMessage } =
    useRoom();

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
    onMiniGameWillStart: handleMiniGameWillStart,
  });

  useGamePlayersNotice({
    variables: { id },
    enabled: canStartGame,
    onMessage: handleGamePlayersNotice,
  });

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

  function handleMiniGameWillStart(
    miniGameWillStartNotice: MiniGameWillStartNotice,
  ) {
    switch (miniGameWillStartNotice.miniGameType) {
      case MiniGame.ButtonClick:
        // FIXME: Implement button click mini game
        break;
      case MiniGame.Vote:
        // FIXME: Implement vote mini game
        break;
      default:
        break;
    }
  }
};

export default useGamePlay;
