import { useGame } from '@/providers/GameProvider';
import { useRoom } from '@/providers/RoomProvider';
import { MiniGame } from '@/types/game';
import useGameSystemNotice, {
  type DayOrNightNotice,
  type MiniGameWillStartNotice,
} from './useGameSystemNotice';

const useGameSystemNoticeHandler = ({
  enabled,
  onGameEnd: handleGameEnd,
}: {
  enabled: boolean;
  onGameEnd?: () => void;
}) => {
  const { id } = useRoom();
  const { setTime } = useGame();

  useGameSystemNotice({
    variables: { id },
    enabled,
    onDayOrNight: handleGameDayOrNight,
    onGameEnd: handleGameEnd,
    onMiniGameWillStart: handleMiniGameWillStart,
  });

  function handleGameDayOrNight(gameDayOrNightNotice: DayOrNightNotice) {
    setTime(gameDayOrNightNotice.dayOrNight);
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

export default useGameSystemNoticeHandler;
