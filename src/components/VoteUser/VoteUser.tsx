import ProfileImage, {
  type ProfileImageProps,
} from '@/components/ProfileImage/ProfileImage';
import { type Point } from '@/types/misc';
import { cn } from '@/utils/classname';
import { shuffle } from 'lodash-es';
import Image from 'next/image';
import React from 'react';

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
  className?: string;
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

export default VoteUser;
