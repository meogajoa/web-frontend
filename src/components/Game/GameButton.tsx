import { useState } from 'react';
import { Selection } from '~/components/ButtonGame/ButtonGame';
import GameBoard from '~/components/Game/GameBoard';
import GameIcon from '~/svgs/GameIcon';
import { Team } from '~/types/game';
import { cn } from '~/utils/classname';

export type Props = {
  className?: string;
  isNoticed?: boolean;
  gameType: 'Button';
  gameData: {
    selectButtons: {
      prize: number;
      whoIsSelect: Selection[];
      isSelect: boolean;
      color: Team;
    }[];
  };
};

const GameButton: React.FC<Props> = ({
  className,
  isNoticed,
  gameType,
  gameData,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={cn(
        'bg-gray-1 relative size-9.5 cursor-pointer rounded-full',
        className,
      )}
      onClick={() => setIsOpen(true)}
    >
      {isNoticed && (
        <div className="bg-red absolute top-[0.313rem] right-[0.313rem] size-2.5 -translate-y-1/2 translate-x-1/2 rounded-full" />
      )}
      <GameIcon />
      {isOpen && (
        <GameBoard
          gameType={gameType}
          gameData={gameData}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default GameButton;
