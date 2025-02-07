import React from 'react';
import BellIcon from '~/svgs/BellIcon';
import LeftArrowIcon from '~/svgs/LeftArrowIcon';
import OutIcon from '~/svgs/OutIcon';
import { cn } from '~/utils/classname';
import { ChatItemProps } from '../ChatListSidebar/ChatItem';
import ChatList from '../ChatListSidebar/ChatList';

export type ChatListSidebarProps = {
  chats: ChatItemProps[];
  isOpen: boolean;
  onClose: () => void;
  onExit: () => void;
  onNotification: () => void;
  className?: string;
};

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
      <div className="flex items-center justify-start">
        <button
          onClick={onClose}
          className="mr-2 flex size-6 items-center justify-center"
          aria-label="뒤로가기"
        >
          <LeftArrowIcon className="size-4" />
        </button>
        <div className="font-base text-2xl font-semibold text-white">
          채팅방 이동
        </div>
      </div>

      <ChatList
        chats={chats}
        className="scrollbar-hide mt-6 flex-1 overflow-y-auto"
      />

      <div className="mt-11.5 flex items-center justify-between">
        <button
          onClick={onExit}
          className="flex size-6 items-center justify-center"
          aria-label="나가기"
        >
          <OutIcon className="size-5" />
        </button>
        <button
          onClick={onNotification}
          className="flex size-6 items-center justify-center"
          aria-label="알림"
        >
          <BellIcon className="h-5.5 w-4.5" />
        </button>
      </div>
    </div>
  );
};

export default ChatListSidebar;
