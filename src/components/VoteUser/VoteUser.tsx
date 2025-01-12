import { shuffle } from 'lodash-es';
import React from 'react';
import ProfileImage, {
  ProfileImageProps,
} from '~/components/ProfileImage/ProfileImage';
import VoteIcon from '~/svgs/VoteIcon';
import { type Point } from '~/types/misc';
import { cn } from '~/utils/classname';

const stompPositions: Readonly<Point[]> = [
  { x: '20%', y: '25%' },
  { x: '15%', y: '75%' },
  { x: '75%', y: '75%' },
  { x: '45%', y: '25%' },
  { x: '28%', y: '50%' },
  { x: '80%', y: '50%' },
  { x: '43%', y: '75%' },
];

type VoteUserProps = Pick<
  ProfileImageProps,
  'color' | 'onProfileClick' | 'userNumber' | 'src'
> & {
  className?: React.ComponentProps<'div'>['className'];
  username: string;
  voteCount: number;
  hasVoted: boolean;
  onVote: () => void;
};

const VoteUser: React.FC<VoteUserProps> = ({
  className,
  color,
  userNumber,
  src,
  username,
  voteCount,
  hasVoted,
  onVote: handleVote,
}) => {
  const randomStampPosition = React.useMemo(() => shuffle(stompPositions), []);

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
        userNumber={userNumber}
        src={src}
      >
        {hasVoted && (
          <VoteIcon className="absolute inset-1/2 size-10 -translate-x-1/2 -translate-y-1/2" />
        )}

        {Array.from({ length: voteCount }).map((_, index) => (
          <VoteIcon
            key={index}
            className="absolute size-5 -translate-x-1/2 -translate-y-1/2 opacity-65"
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

export default VoteUser;
