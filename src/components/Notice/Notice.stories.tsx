import { Meta, StoryObj } from '@storybook/react';
import { Notice } from '~/components/Notice';

const meta: Meta<typeof Notice> = {
  title: 'Atoms/Notice',
  component: Notice,
  tags: ['autodocs'],

  argTypes: {
    children: {
      description: '알림 내용',
      control: 'text',
    },
    variant: {
      description: '배경색',
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
    },
  },
  args: {
    children: '알림 내용',
    variant: 'primary',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[500px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Notice>;

export const Color1: Story = {
  args: {
    children: '당신은 백팀입니다.',
    variant: 'primary',
  },
};

export const Color2: Story = {
  args: {
    children:
      '팀원 닉네임 01, 닉네임 02, 닉네임 03, 닉네임 04님과 팀 채팅을 시작합니다.',
    variant: 'secondary',
  },
};

export const Color3: Story = {
  args: {
    children:
      '오늘의 미니게임은 “신뢰게임” 입니다. 20초 후 게임 시작하겠습니다.',
    variant: 'danger',
  },
};
