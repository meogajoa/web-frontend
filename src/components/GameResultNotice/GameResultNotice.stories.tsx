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
      defaultValue: 'game',
    },
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
        numberIcons: string[];
        prize: string;
      }[];
    };

type Story = StoryObj<typeof GameResultNotice>;

export const Default: Story = {
  render: (props) => {
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
            '/images/number-01.png',
            '/icons/number-02.png',
            '/icons/number-03.png',
          ],
          prize: '₩70',
        },
        {
          rank: 2,
          teamName: 'B',
          numberIcons: [
            '/icons/number-04.png',
            '/icons/number-05.png',
            '/icons/number-06.png',
          ],
          prize: '₩30',
        },
      ],
    };

    const result =
      props.type === 'vote'
        ? voteResultData
        : props.type === 'team'
          ? teamResultData
          : gameResultData;

    return <GameResultNotice type={props.type} result={result} />;
  },
};
