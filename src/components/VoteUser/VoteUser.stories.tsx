import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import VoteUser from '~/components/VoteUser/VoteUser';

const meta: Meta<typeof VoteUser> = {
  title: 'Organisms/VoteUser',
  component: VoteUser,
  tags: ['autodocs'],
  argTypes: {
    size: {
      description: '프로필 이미지와 버튼 크기',
      control: 'select',
      options: ['lg', 'md'],
    },
    color: {
      description: '버튼 색상',
      control: 'select',
      options: ['primary', 'secondary'],
    },
    isAlive: {
      description: '생존 여부',
      control: 'boolean',
    },
    nickname: {
      description: '닉네임 텍스트',
      control: 'text',
    },
    totalVotes: {
      description: '지금까지 투표 수',
      control: { type: 'number', min: 0, max: 7 },
    },
    imageSrc: {
      description: '프로필 이미지 경로',
      control: 'text',
    },
    number: {
      description: '숫자 박스 값',
      control: { type: 'number', min: 0 },
    },
  },
  args: {
    size: 'md',
    color: 'primary',
    isAlive: true,
    nickname: '닉네임 01',
    totalVotes: 1,
    imageSrc:
      'https://flexible.img.hani.co.kr/flexible/normal/850/567/imgdb/original/2023/0111/20230111503366.jpg',
    number: 3,
  },
};

export default meta;

type Story = StoryObj<typeof VoteUser>;

export const VotingWithCounts: Story = {
  render: (args) => {
    const [isVote, setIsVote] = useState(false);
    const [voteCount, setVoteCount] = useState<number>(args.totalVotes ?? 0);

    const handleVote = (newIsVote: boolean, newVoteCount: number) => {
      setIsVote(newIsVote);
      setVoteCount(newVoteCount);
    };

    return (
      <div className="flex flex-col items-center">
        <VoteUser
          {...args}
          isVote={isVote}
          voteCount={voteCount}
          onVote={handleVote}
        />
        <p className="mt-2 text-sm">
          현재 상태: {isVote ? '투표됨' : '미투표'}, 투표 횟수: {voteCount}
        </p>
      </div>
    );
  },
};
