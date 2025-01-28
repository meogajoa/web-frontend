import { Meta, StoryObj } from '@storybook/react';
import { Room } from '~/components/RoomItem';

const meta: Meta<typeof Room> = {
  title: 'Molecules/Room',
  component: Room,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Room title',
      control: 'text',
    },
    description: {
      description: 'Room description',
      control: 'text',
    },
    isPrivate: {
      description: 'Is room private',
      control: 'boolean',
    },
    current: {
      description: 'Current room number',
      control: {
        type: 'range',
        min: 1,
        max: 8,
        step: 1,
      },
    },
    total: {
      description: 'Total room number',
      control: {
        type: 'range',
        min: 1,
        max: 8,
        step: 1,
      },
    },
  },
  args: {
    title: 'Room Title',
    description: 'Room Description',
    isPrivate: false,
    current: 1,
    total: 8,
  },
};

export default meta;

type Story = StoryObj<typeof Room>;

export const Default: Story = {
  args: {
    className: '',
  },
};
