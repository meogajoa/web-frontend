import { cva, VariantProps } from 'class-variance-authority';
import React, { useEffect, useState } from 'react';
import VoteImage from '~/assets/images/VoteImage.png';
import ProfileImage from '~/components/ProfileImage/ProfileImage';
import { cn } from '~/utils/classname';

interface StampPosition {
  x: string;
  y: string;
}

const MAX_VOTES = 7;

const VoteUserVariant = cva(
  'relative inline-flex items-center justify-center rounded-md font-bold text-white transition duration-300',
  {
    variants: {
      size: {
        lg: 'h-24 w-24',
        md: 'h-16 w-16',
      },
      color: {
        primary: 'bg-gray-5',
        secondary: 'bg-black',
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'primary',
    },
  },
);

type VoteUserProps = Readonly<
  React.ComponentProps<'button'> &
    VariantProps<typeof VoteUserVariant> & {
      isAlive?: boolean;
      nickname?: string;
      isVote: boolean;
      voteCount: number;
      onVote: (isVote: boolean, voteCount: number) => void;
      totalVotes?: number;
      imageSrc?: string;
      number?: number;
    }
>;

const VoteUser: React.FC<VoteUserProps> = ({
  size = 'md',
  color = 'primary',
  isAlive = true,
  nickname = '닉네임',
  isVote,
  voteCount,
  onVote,
  imageSrc,
  number = voteCount,
  className,
  ...props
}) => {
  const profileColor = color === 'primary' ? 'gray' : 'black';
  const [stamps, setStamps] = useState<StampPosition[]>([]);

  const handleVote = () => {
    if (!isAlive) {
      return;
    }

    const newIsVote = isVote ? false : true;
    const newVoteCount = isVote ? Math.max(voteCount - 1, 0) : voteCount + 1;

    onVote(newIsVote, newVoteCount);
  };

  useEffect(() => {
    const newStamps: StampPosition[] = [];
    const positions = [
      { x: '20%', y: '25%' },
      { x: '15%', y: '75%' },
      { x: '75%', y: '75%' },
      { x: '45%', y: '25%' },
      //{ x: '75%', y: '25%' },
      { x: '28%', y: '50%' },
      { x: '80%', y: '50%' },
      { x: '43%', y: '75%' },
    ];

    if (voteCount > 0) {
      for (let i = 0; i < Math.min(voteCount - 1, MAX_VOTES); i++) {
        newStamps.push(positions[i]);
      }
    }

    setStamps(newStamps);
  }, [voteCount]);

  return (
    <div
      className={cn(
        'flex flex-col items-center space-y-2',
        !isAlive && 'pointer-events-none opacity-30',
      )}
      onClick={handleVote}
    >
      <button
        className={cn(VoteUserVariant({ size, color }), className)}
        disabled={!isAlive}
        {...props}
      >
        <ProfileImage
          size={size}
          color={profileColor}
          imageSrc={imageSrc}
          showNumber
          number={number}
        />
        {voteCount > 0 && (
          <img
            src={VoteImage.src}
            alt="Vote Icon"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
            style={{
              width: size === 'lg' ? '70%' : '60%',
              height: size === 'lg' ? '70%' : '60%',
              objectFit: 'contain',
              zIndex: 10,
            }}
          />
        )}
        {stamps.map((stamp, index) => (
          <img
            key={index}
            src={VoteImage.src}
            alt={`Stamp ${index + 1}`}
            className="absolute"
            style={{
              width: '20px',
              height: '20px',
              top: stamp.y,
              left: stamp.x,
              transform: 'translate(-50%, -50%)',
              zIndex: 5,
            }}
          />
        ))}
      </button>
      <span className={cn('text-sm font-medium', !isAlive && 'line-through')}>
        {nickname}
      </span>
    </div>
  );
};

export default VoteUser;
