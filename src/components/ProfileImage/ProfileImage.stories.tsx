import { Meta, StoryObj } from '@storybook/react';
import ProfileImage from '~/components/ProfileImage/ProfileImage';

const meta: Meta<typeof ProfileImage> = {
  title: 'Atoms/ProfileImage',
  component: ProfileImage,
  tags: ['autodocs'],
  argTypes: {
    size: {
      description: '박스 크기',
      control: 'select',
      options: ['md', 'lg'],
    },
    color: {
      description: '배경색',
      control: 'select',
      options: ['gray', 'black'],
    },
    imageSrc: {
      description: '프로필 이미지 경로',
      control: 'text',
    },
    showNumber: {
      description: '숫자 박스 표시 여부',
      control: 'boolean',
    },
    number: {
      description: '숫자 값',
      control: 'number',
    },
    onClick: {
      description: '클릭 이벤트 핸들러',
      action: '클릭됨',
    },
  },
  args: {
    size: 'md',
    color: 'gray',
    showNumber: false,
    number: 0,
  },
};

export default meta;

type Story = StoryObj<typeof ProfileImage>;

export const Default: Story = {
  args: {
    size: 'lg',
    color: 'gray',
  },
};
