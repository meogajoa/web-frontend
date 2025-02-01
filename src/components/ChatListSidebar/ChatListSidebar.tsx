import {
  ArrowLeftIcon,
  ArrowRightStartOnRectangleIcon,
  BellIcon,
} from '@heroicons/react/24/outline';
import React from 'react';
import { cn } from '~/utils/classname';
import { ChatItemProps } from '../ChatListSidebar/ChatItem';
import ChatList from '../ChatListSidebar/ChatList';

export interface ChatListSidebarProps {
  chats: ChatItemProps[];
  isOpen: boolean;
  onClose: () => void;
  onExit: () => void;
  onNotification: () => void;
  className?: string;
}

const ChatListSidebar: React.FC<ChatListSidebarProps> = ({
  chats,
  isOpen,
  onClose,
  onExit,
  onNotification,
  className,
}) => {
  return (
    <div
      className={cn(
        'bg-gray-1 h-full w-full transform pt-4 pr-4.5 pb-3.5 pl-4 shadow-lg transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        className,
      )}
    >
      <header className="mb-6 flex items-center justify-start text-white">
        <button onClick={onClose} aria-label="뒤로가기">
          <ArrowLeftIcon className="mr-2 size-6" />
        </button>
        <div className="font-base text-2xl font-semibold">채팅방 이동</div>
      </header>

      <div className="scrollbar-hide flex-1 overflow-y-auto">
        <ChatList chats={chats} className="" />
      </div>

      <footer className="mt-11.5 flex items-center justify-between text-white">
        <button onClick={onExit} className="" aria-label="나가기">
          <ArrowRightStartOnRectangleIcon className="size-6" />
        </button>
        <button onClick={onNotification} className="" aria-label="알림">
          <BellIcon className="size-6" />
        </button>
      </footer>
    </div>
  );
};

export default ChatListSidebar;
