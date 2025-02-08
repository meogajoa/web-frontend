import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import img from '~/assets/images/cat.png';
import ChatListSidebar from '~/components/ChatListSidebar/ChatListSidebar';
import { Team } from '~/types/game';

const meta: Meta<typeof ChatListSidebar> = {
  title: 'Organisms/ChatListSidebar',
  component: ChatListSidebar,
};

export default meta;

type Story = StoryObj<typeof ChatListSidebar>;

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
          chatRooms={[
            {
              type: 'personal',
              roomData: {
                title: '김철수',
                content: '안녕하세요',
              },
              image: img.src,
            },
            {
              type: 'group',
              roomData: {
                title: '그룹채팅방',
                content: '안녕하세요',
              },
              groupImages: [img.src, Team.White, img.src, Team.Black],
            },
            {
              type: 'personal',
              roomData: {
                title: '김철수',
                content: '(상대팀 채팅방을 볼 수 없습니다)',
                isSpy: true,
                isAccessable: true,
              },
              image: Team.Black,
            },
            {
              type: 'personal',
              roomData: {
                title: '김철수',
                content: '안녕하세요',
              },
              notice: 3,
              image: img.src,
            },
            {
              type: 'personal',
              roomData: {
                title: '김철수',
                content: '안녕하세요',
              },
              image: img.src,
            },
            {
              type: 'personal',
              roomData: {
                title: '김철수',
                content: '안녕하세요',
              },
              notice: 99,
              image: img.src,
            },
          ]}
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
