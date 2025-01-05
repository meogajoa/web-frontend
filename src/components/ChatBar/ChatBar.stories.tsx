import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ChatBar } from '~/components/ChatBar';
import { TextareaHandle } from '~/components/CustomTextarea';
import { RemovePadding } from '~/utils/storybook';

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

export const Default: Story = {
  render: () => {
    const textareaRef = React.useRef<TextareaHandle>(null);

    return (
      <ChatBar>
        <ChatBar.MenuButton />
        <ChatBar.Textarea ref={textareaRef} />
        <ChatBar.SendButton />
      </ChatBar>
    );
  },
};
