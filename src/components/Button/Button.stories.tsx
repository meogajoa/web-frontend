import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from '~/components/Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    children: {
      description: '버튼 텍스트',
      control: 'text',
    },
    size: {
      description: '버튼 크기',
      control: 'select',
      options: ['lg', 'md'],
    },
    disabled: {
      description: '버튼 비활성화 여부',
      control: 'boolean',
    },
  },
  args: {
    children: 'Button',
    onClick: fn(),
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[15rem]">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const PrimaryLarge: Story = {
  args: {
    children: '계속하기',
    variant: 'primary',
    size: 'lg',
  },
};

export const PrimaryMedium: Story = {
  args: {
    children: '계속하기',
    variant: 'primary',
    size: 'md',
  },
};
