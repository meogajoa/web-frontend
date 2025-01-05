import { Meta, StoryObj } from '@storybook/react';
import { ChatBar } from '~/components/ChatBar';
import { RemovePadding } from '../../utils/storybook';

const meta: Meta<typeof ChatBar> = {
  title: 'Organisms/ChatBar',
  component: ChatBar,
  decorators: [
    (Story) => (
      <>
        <RemovePadding />
        <Story />
      </>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ChatBar>;

export const Default: Story = {};
