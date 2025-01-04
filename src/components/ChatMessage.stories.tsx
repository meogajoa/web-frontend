import { Meta, StoryObj } from '@storybook/react';
import ChatMessage from '~/components/ChatMessage';

const meta: Meta<typeof ChatMessage> = {
  title: 'Molecules/ChatMessage',
  component: ChatMessage,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ChatMessage>;

export const Default: Story = {
  args: {
    className: '',
  },
};
