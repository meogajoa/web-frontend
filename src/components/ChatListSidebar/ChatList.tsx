import React from 'react';
import ChatItem, { ChatItemProps } from '../ChatListSidebar/ChatItem';

export type ChatListProps = {
  chats: ChatItemProps[];
  className?: string;
};

const ChatList: React.FC<ChatListProps> = ({ chats, className }) => {
  return (
    <div className={`flex flex-col divide-y divide-white/10 ${className}`}>
      {chats.map((chat, index) => (
        <ChatItem key={index} {...chat} />
      ))}
    </div>
  );
};

export default ChatList;
