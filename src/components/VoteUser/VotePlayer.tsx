import ProfileImage, {
  type ProfileImageProps,
} from '@/components/ProfileImage/ProfileImage';
import { type Username } from '@/types/account';
import { type Point } from '@/types/misc';
import { cn } from '@/utils/classname';
import { shuffle } from 'lodash-es';
import Image from 'next/image';
import React from 'react';

const stampPositions: Readonly<Point[]> = [
  { x: '20%', y: '25%' },
  { x: '15%', y: '75%' },
  { x: '75%', y: '75%' },
  { x: '45%', y: '25%' },
  { x: '28%', y: '50%' },
  { x: '80%', y: '50%' },
  { x: '43%', y: '75%' },
];

type Props = Pick<
  ProfileImageProps,
  'color' | 'onProfileClick' | 'playerNumber' | 'src'
> & {
  className?: string;
  username: Username;
  voteCount: number;
  hasVoted: boolean;
  onVote: () => void;
};

const VotePlayer: React.FC<Props> = ({
  className,
  color,
  playerNumber,
  src,
  username,
  voteCount,
  hasVoted,
  onVote: handleVote,
}) => {
  const randomStampPosition = React.useMemo(() => shuffle(stampPositions), []);

  return (
    <div
      className={cn('flex flex-col items-center gap-y-2', className)}
      onClick={handleVote}
    >
      <ProfileImage
        className="relative"
        as="div"
        size="xl"
        color={color}
        playerNumber={playerNumber}
        src={src}
      >
        {hasVoted && (
          <Image
            className="absolute inset-1/2 size-10 -translate-x-1/2 -translate-y-1/2"
            src="/images/icons/stamp.png"
            alt="vote"
          />
        )}

        {Array.from({ length: voteCount }).map((_, index) => (
          <Image
            className="absolute size-5 -translate-x-1/2 -translate-y-1/2 opacity-65"
            key={index}
            src="/images/icons/stamp.png"
            alt="stamp"
            style={{
              left: randomStampPosition[index].x,
              top: randomStampPosition[index].y,
            }}
          />
        ))}
      </ProfileImage>

      <p>{username}</p>
    </div>
  );
};

export default VotePlayer;
