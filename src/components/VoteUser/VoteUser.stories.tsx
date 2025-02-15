import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import VoteUser from '~/components/VoteUser/VoteUser';

const meta: Meta<typeof VoteUser> = {
  title: 'Molecules/VoteUser',
  component: VoteUser,
  tags: ['autodocs'],
  argTypes: {
    color: {
      description: '버튼 색상',
      control: 'select',
      options: ['gray', 'light-gray'],
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

type Story = StoryObj<typeof VoteUser>;

export const VotingWithCounts: Story = {
  args: {
    color: 'gray',
    userNumber: 1,
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
      <VoteUser
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
