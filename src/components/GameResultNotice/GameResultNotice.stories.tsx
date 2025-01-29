import { Meta, StoryObj } from '@storybook/react';
import vote from '~/assets/images/vote.png';
import GameResultNotice from './GameResultNotice';

const meta: Meta<typeof GameResultNotice> = {
  title: 'Organisms/GameResultNotice',
  component: GameResultNotice,
  tags: ['autodocs'],
  argTypes: {
    type: {
      description: '결과 타입 (game | vote | team)',
      control: 'select',
      options: ['game', 'vote', 'team'],
    },
  },
  args: {
    type: 'game',
  },
};

export default meta;

type ResultData =
  | {
      type: 'game';
      data: {
        rank: number;
        nickname: string;
        score: number;
        calculation: string;
        prize: string;
      }[];
    }
  | {
      type: 'vote';
      data: {
        nickname: string;
        voteIcon: string;
        votes: number;
        variant?: 'default' | 'dark';
      }[];
    }
  | {
      type: 'team';
      data: {
        rank: number;
        teamName: string;
        numberIcons: { number: number; team: '흑' | '백' }[];
        prize: string;
      }[];
    };

type Story = StoryObj<typeof GameResultNotice>;

export const Default: Story = {
  render: ({ type = 'game' }) => {
    const gameResultData: ResultData = {
      type: 'game',
      data: [
        {
          rank: 1,
          nickname: '닉네임 01',
          score: 49,
          calculation: '8 + 4 = 12',
          prize: '₩40',
        },
        {
          rank: 2,
          nickname: '닉네임 02',
          score: 48,
          calculation: '7 + 3 = 10',
          prize: '₩35',
        },
      ],
    };

    const voteResultData: ResultData = {
      type: 'vote',
      data: [
        {
          nickname: '닉네임 01',
          voteIcon: vote.src,
          votes: 2,
        },
        {
          nickname: '닉네임 02',
          voteIcon: vote.src,
          votes: 4,
        },
      ],
    };

    const teamResultData: ResultData = {
      type: 'team',
      data: [
        {
          rank: 1,
          teamName: 'A',
          numberIcons: [
            { number: 1, team: '흑' },
            { number: 2, team: '백' },
            { number: 3, team: '흑' },
          ],
          prize: '₩70',
        },
        {
          rank: 2,
          teamName: 'B',
          numberIcons: [
            { number: 4, team: '흑' },
            { number: 5, team: '백' },
            { number: 6, team: '흑' },
          ],
          prize: '₩30',
        },
      ],
    };

    const result =
      type === 'vote'
        ? voteResultData
        : type === 'team'
          ? teamResultData
          : gameResultData;

    return <GameResultNotice type={type} result={result} />;
  },
};
