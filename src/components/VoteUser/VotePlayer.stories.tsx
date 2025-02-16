import VotePlayer from '@/components/VoteUser/VotePlayer';
import { Team } from '@/types/game';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta<typeof VotePlayer> = {
  title: 'Molecules/VotePlayer',
  component: VotePlayer,
  tags: ['autodocs'],
  argTypes: {
    color: {
      description: '버튼 색상',
      control: 'select',
      options: [Team.Black, Team.White, Team.Red],
    },
    voteCount: {
      description: '투표 수',
      control: {
        type: 'range',
        min: 0,
        max: 7,
        step: 1,
      },
    },
    username: {
      description: '유저 이름',
      control: 'text',
    },
    hasVoted: {
      description: '내가 한 투표 여부',
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof VotePlayer>;

export const VotingWithCounts: Story = {
  args: {
    color: Team.Black,
    playerNumber: 1,
    hasVoted: false,
    voteCount: 0,
    username: 'username',
  },
  render: ({ hasVoted: _hasVoted, voteCount: _voteCount, ...props }) => {
    const [isAlive] = React.useState(true);
    const [hasVoted, setHasVoted] = React.useState(_hasVoted);
    const [voteCount, setVoteCount] = React.useState(_voteCount);

    React.useEffect(() => {
      setVoteCount(_voteCount);
      setHasVoted(_hasVoted);
    }, [_voteCount, _hasVoted]);

    return (
      <VotePlayer
        {...props}
        hasVoted={hasVoted}
        voteCount={voteCount}
        onVote={handleVote}
      />
    );

    function handleVote() {
      if (!isAlive) {
        return;
      }

      if (hasVoted) {
        setVoteCount((prev) => prev - 1);
        setHasVoted(false);
      } else {
        setVoteCount((prev) => prev + 1);
        setHasVoted(true);
      }
    }
  },
};
