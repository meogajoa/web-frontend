import { Transition } from '@headlessui/react';
import React from 'react';
import BellIcon from '~/svgs/BellIcon';
import LeftArrowIcon from '~/svgs/LeftArrowIcon';
import OutIcon from '~/svgs/OutIcon';
import { cn } from '~/utils/classname';
import ChatRoom, { ChatRoomProps } from './ChatRoom';

export type ChatListSidebarProps = {
  className?: string;
  chatRooms: ChatRoomProps[];
  isOpen: boolean;
  onClose: () => void;
  onExit: () => void;
  onNotificationClick?: () => void;
};

const ChatListSidebar: React.FC<ChatListSidebarProps> = ({
  chatRooms,
  isOpen,
  onClose,
  onExit,
  onNotificationClick,
  className,
}) => {
  return (
    <Transition
      className={cn(
        'bg-gray-1 flex size-full max-w-1/3 min-w-xs flex-col p-4 shadow-lg transition-transform duration-300 ease-in-out',
        className,
      )}
      as="div"
      show={isOpen}
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
    >
      <button
        className="flex w-fit cursor-pointer items-center justify-start gap-x-2"
        onClick={onClose}
      >
        <LeftArrowIcon className="size-4" />
        <div className="text-2xl font-semibold text-white">채팅방 이동</div>
      </button>

      <div className="scrollbar-hide mt-6 flex-1 divide-y divide-white/10 overflow-y-auto">
        {chatRooms.map((chat, index) => {
          if (chat.type === 'group' && 'groupImages' in chat) {
            return (
              <ChatRoom
                key={index}
                type={chat.type}
                roomData={chat.roomData}
                groupImages={chat.groupImages as string[]}
                notice={chat.notice}
              />
            );
          } else if (chat.type === 'personal' && 'image' in chat) {
            return (
              <ChatRoom
                key={index}
                type={chat.type}
                roomData={chat.roomData}
                image={chat.image as string}
                notice={chat.notice}
              />
            );
          }
        })}
      </div>

      <section className="flex items-center justify-between">
        <button className="size-6 cursor-pointer fill-white" onClick={onExit}>
          <OutIcon />
        </button>
        <button
          className="h-5.5 w-4.5 cursor-pointer fill-white"
          onClick={onNotificationClick}
        >
          <BellIcon />
        </button>
      </section>
    </Transition>
  );
};

export default ChatListSidebar;
