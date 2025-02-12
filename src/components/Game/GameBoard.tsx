import ButtonGame, { Selection } from '~/components/ButtonGame/ButtonGame';
import TopArrowIcon from '~/svgs/TopArrowIcon';
import { Team } from '~/types/game';
import { cn } from '~/utils/classname';

type Props = {
  className?: string;
  gameType: 'Button';
  gameData: {
    selectButtons: {
      prize: number;
      whoIsSelect: Selection[];
      isSelect: boolean;
      color: Team;
    }[];
  };

  onClose: () => void;
};

const GameBoard: React.FC<Props> = ({
  className,
  gameType,
  gameData,
  onClose,
}) => {
  let gameContent = null;

  if (gameType === 'Button') {
    gameContent = <ButtonGame selectButtons={gameData.selectButtons} />;
  }

  return (
    <div
      className={cn(
        'relative h-fit w-fit rounded-lg bg-white px-5.5 py-5 shadow-lg',
        className,
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <TopArrowIcon className="absolute top-6 right-3" onClick={onClose} />
      {gameContent}
    </div>
  );
};

export default GameBoard;
