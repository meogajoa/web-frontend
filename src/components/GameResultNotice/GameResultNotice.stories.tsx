import { Team } from '@/types/game';
import type { Meta, StoryObj } from '@storybook/react';
import stamp from 'public/images/game/icons/stamp.png';
import GameResultNotice from './GameResultNotice';
import { type Props as NoticeItemProps } from './NoticeItem';
import { type Props as TeamNoticeItemProps } from './TeamNoticeItem';
import { type Props as VoteNoticeItemProps } from './VoteNoticeItem';

const meta: Meta<typeof GameResultNotice> = {
  title: 'Molecules/GameResultNotice',
  component: GameResultNotice,
  tags: ['autodocs'],
  argTypes: {
    resultType: {
      description: '결과 타입 (game | vote | team)',
      control: 'select',
      options: ['game', 'vote', 'team'],
    },
  },
  args: {
    resultType: 'game',
  },
};

export default meta;

type Story = StoryObj<typeof GameResultNotice>;

export const Default: Story = {
  render: ({ resultType = 'game' }) => {
    const noticeItemData: NoticeItemProps[] = [
      {
        rank: 1,
        nickname: '닉네임 01',
        score: 49,
        calculation: '8 + 4 = 12',
        prize: 40,
      },
      {
        rank: 2,
        nickname: '닉네임 02',
        score: 48,
        calculation: '7 + 3 = 10',
        prize: 35,
      },
    ];

    const voteNoticeItemData: VoteNoticeItemProps[] = [
      {
        nickname: '닉네임 01',
        voteIcon: stamp.src,
        profileColor: 'light-gray',
        votes: 2,
      },
      {
        nickname: '닉네임 02',
        voteIcon: stamp.src,
        profileColor: 'gray',
        votes: 4,
      },
    ];

    const teamNoticeItemData: TeamNoticeItemProps[] = [
      {
        rank: 1,
        teamName: 'A',
        numberIcons: [
          { number: 1, team: Team.Black },
          { number: 2, team: Team.White },
          { number: 3, team: Team.Black },
        ],
        prize: 70,
      },
      {
        rank: 2,
        teamName: 'B',
        numberIcons: [
          { number: 4, team: Team.Black },
          { number: 5, team: Team.White },
          { number: 6, team: Team.Black },
        ],
        prize: 30,
      },
    ];

    return (
      <GameResultNotice
        resultType={resultType}
        noticeItemData={noticeItemData}
        voteNoticeItemData={voteNoticeItemData}
        teamNoticeItemData={teamNoticeItemData}
      />
    );
  },
};
