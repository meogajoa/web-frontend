import { Meta, StoryObj } from '@storybook/react';
import stamp from 'public/images/game/icons/stamp.png';
import GameResultNotice from './GameResultNotice';
import { ResultData } from './types';

const meta: Meta<typeof GameResultNotice> = {
  title: 'Organisms/GameResultNotice',
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
    const result: ResultData = (() => {
      switch (resultType) {
        case 'vote':
          return {
            type: 'vote',
            data: [
              {
                nickname: '닉네임 01',
                voteIcon: stamp.src,
                profileColor: 'light-gray',
                votes: 2,
                className: 'w-[22.56rem]',
              },
              {
                nickname: '닉네임 02',
                voteIcon: stamp.src,
                profileColor: 'gray',
                votes: 4,
                className: 'w-[22.56rem]',
              },
            ],
          };
        case 'team':
          return {
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
                className: 'w-[22.56rem]',
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
                className: 'w-[22.56rem]',
              },
            ],
          };
        case 'game':
        default:
          return {
            type: 'game',
            data: [
              {
                rank: 1,
                nickname: '닉네임 01',
                score: 49,
                calculation: '8 + 4 = 12',
                prize: '₩40',
                className: 'w-[22.56rem]',
              },
              {
                rank: 2,
                nickname: '닉네임 02',
                score: 48,
                calculation: '7 + 3 = 10',
                prize: '₩35',
                className: 'w-[22.56rem]',
              },
            ],
          };
      }
    })();

    return <GameResultNotice result={result} />;
  },
};
