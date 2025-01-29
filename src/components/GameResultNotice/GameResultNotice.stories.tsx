import { Meta, StoryObj } from '@storybook/react';
import stamp from 'public/images/game/icons/stamp.png';
import GameResultNotice from './GameResultNotice';
import { NoticeItemProps } from './NoticeItem';
import { TeamNoticeItemProps } from './TeamNoticeItem';
import { VoteNoticeItemProps } from './VoteNoticeItem';

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
          { number: 1, team: 'black' },
          { number: 2, team: 'white' },
          { number: 3, team: 'black' },
        ],
        prize: 70,
      },
      {
        rank: 2,
        teamName: 'B',
        numberIcons: [
          { number: 4, team: 'black' },
          { number: 5, team: 'white' },
          { number: 6, team: 'black' },
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
