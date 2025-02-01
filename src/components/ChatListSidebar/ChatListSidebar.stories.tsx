import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ChatItemProps } from '~/components/ChatListSidebar/ChatItem';
import ChatListSidebar from '~/components/ChatListSidebar/ChatListSidebar';
import img from '../../assets/images/cat.png';

const meta: Meta<typeof ChatListSidebar> = {
  title: 'Organisms/ChatListSidebar',
  component: ChatListSidebar,
};

export default meta;

type Story = StoryObj<typeof ChatListSidebar>;

const sampleChats: ChatItemProps[] = [
  {
    groupImages: [
      { src: img.src, alt: 'User 1' },
      { src: img.src, alt: 'User 2' },
      { src: img.src, alt: 'User 3' },
      { src: img.src, alt: 'User 4' },
    ],
    text: {
      text: '그룹 채팅방',
      contentText: '새 메시지가 도착했습니다.',
      isError: false,
    },
    notice: 5,
  },
  {
    image: {
      src: img.src,
      alt: 'User 2',
      size: 'lg',
    },
    text: {
      text: '닉네임 02',
      contentText: '읽은 메시지입니다.',
      isError: false,
    },
    notice: 0,
  },
  {
    image: {
      src: img.src,
      alt: 'User 3',
      size: 'lg',
    },
    text: {
      text: '닉네임 03',
      contentText: '읽은 메시지입니다.',
      isError: false,
    },
    notice: 0,
  },
  {
    image: {
      src: img.src,
      alt: 'User 4',
      size: 'lg',
    },
    text: {
      text: '닉네임 04',
      contentText: '읽은 메시지입니다.',
      isError: false,
    },
    notice: 0,
  },
  {
    image: {
      src: img.src,
      alt: 'User 5',
      size: 'lg',
    },
    text: {
      text: '닉네임 05',
      contentText: '(밤에는 대화할 수 없습니다.)',
      isError: true,
    },
    notice: 0,
  },
  {
    image: {
      src: img.src,
      alt: 'User 6',
      size: 'lg',
    },
    text: {
      text: '닉네임 06',
      contentText: '읽은 메시지입니다.',
      isError: false,
    },
    notice: 33,
  },
  {
    image: {
      src: img.src,
      alt: 'User 7',
      size: 'lg',
    },
    text: {
      text: '닉네임 07',
      contentText: '읽은 메시지입니다.',
      isError: false,
    },
    notice: 0,
  },
];

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div className="relative min-h-screen bg-gray-100">
        {/* 토글 버튼 */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="m-4 rounded bg-blue-500 p-2 text-white"
        >
          {isOpen ? 'Sidebar 닫기' : 'Sidebar 열기'}
        </button>
        <ChatListSidebar
          chats={sampleChats}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onExit={() => alert('나가기 클릭')}
          onNotification={() => alert('알림 클릭')}
          className="w-73"
        />
      </div>
    );
  },
};
