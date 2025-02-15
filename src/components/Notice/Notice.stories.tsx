import { Notice } from '@/components/Notice';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Notice> = {
  title: 'Atoms/Notice',
  component: Notice,
  tags: ['autodocs'],
  argTypes: {
    type: {
      description: '공지 종류',
      control: 'select',
      options: ['gameStart', 'gameInfo', 'teamInfo'],
    },
    variant: {
      description: '배경색 (공지 스타일)',
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
    },
    time: {
      description: '게임 시작까지 남은 시간 (gameStart에서만 사용)',
      control: 'number',
    },
    team: {
      description: '팀 정보 (teamInfo에서만 사용)',
      control: 'select',
      options: ['흑', '백'],
    },
    children: {
      description: '기본 공지 내용',
      control: 'text',
    },
  },
  args: {
    type: 'teamInfo',
    variant: 'primary',
    time: 10,
    team: '백',
    children: '당신은 백팀입니다.',
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

export const GameStart: Story = {
  args: {
    type: 'gameStart',
    variant: 'danger',
    time: 20,
    children:
      '오늘의 미니게임은 “신뢰게임” 입니다. 20초 후 게임 시작하겠습니다.',
  },
};

export const GameInfo: Story = {
  args: {
    type: 'gameInfo',
    variant: 'secondary',
    children:
      '팀원 닉네임 01, 닉네임 02, 닉네임 03, 닉네임 04님과 팀 채팅을 시작합니다.',
  },
};

export const TeamInfo: Story = {
  args: {
    type: 'teamInfo',
    variant: 'primary',
    team: '흑',
    children: '당신은 흑팀입니다.',
  },
};

export const CustomNotice: Story = {
  args: {
    type: 'teamInfo',
    variant: 'secondary',
    children: '커스텀 알림 내용입니다.',
  },
};
