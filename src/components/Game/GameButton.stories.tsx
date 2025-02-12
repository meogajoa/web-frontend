import { Meta, StoryObj } from '@storybook/react';
import { Team } from '~/types/game';
import GameButton from './GameButton';

const meta: Meta<typeof GameButton> = {
  title: 'Game/GameButton',
  component: GameButton,
  argTypes: {
    gameType: { control: 'radio', options: ['Button'] },
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export default meta;

type Story = StoryObj<typeof GameButton>;

export const Default: Story = {
  args: {
    gameType: 'Button',
    isNoticed: false,
    gameData: {
      selectButtons: [
        {
          prize: 10,
          whoIsSelect: [
            { number: 1, team: Team.Black },
            { number: 5, team: Team.White },
            { number: 8, team: Team.Black },
          ],
          isSelect: false,
          color: Team.Black,
        },
        {
          prize: 20,
          whoIsSelect: [
            { number: 2, team: Team.White },
            { number: 4, team: Team.Black },
          ],
          isSelect: false,
          color: Team.White,
        },
        {
          prize: 30,
          whoIsSelect: [
            { number: 3, team: Team.White },
            { number: 6, team: Team.White },
            { number: 7, team: Team.Black },
          ],
          isSelect: true,
          color: Team.Black,
        },
      ],
    },
  },
  render: (args) => <GameButton {...args} />,
};
