import useGameSystemNotice, {
  type DayOrNightNotice,
  type MiniGameWillStartNotice,
} from '@/hooks/game/useGameSystemNotice';
import { useGame } from '@/providers/GameProvider';
import { useRoom } from '@/providers/RoomProvider';
import { MiniGame } from '@/types/game';
import { dayjs } from '@/utils/date';

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
    const scheduledTime = dayjs.utc(miniGameWillStartNotice.scheduledTime);
    const currentTime = dayjs.utc();
    const delay = Math.max(0, scheduledTime.diff(currentTime));
    console.debug('Schedule time delay', delay);

    setTimeout(() => {
      console.debug('delay end!! should start mini game');

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
    }, delay);
  }
};

export default useGameSystemNoticeHandler;
