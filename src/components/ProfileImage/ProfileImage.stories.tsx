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
      options: ['sm', 'md', 'lg', 'xl'],
    },
    color: {
      description: '배경색',
      control: 'select',
      options: ['gray', 'light-gray'],
    },
    userNumber: {
      description: '숫자 박스 값',
      control: {
        type: 'range',
        min: 0,
        max: 8,
        step: 1,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProfileImage>;

export const Default: Story = {
  args: {
    size: 'xl',
    color: 'gray',
    userNumber: 1,
    src: 'https://flexible.img.hani.co.kr/flexible/normal/850/567/imgdb/original/2023/0111/20230111503366.jpg',
  },
};
