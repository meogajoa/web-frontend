import React from 'react';
import ChatText, { ChatTextProps } from '~/components/ChatListSidebar/ChatText';
import GroupChatImage from '~/components/ChatListSidebar/GroupChatImage';
import NoticeIcon from '~/components/ChatListSidebar/NoticeIcon';
import { cn } from '~/utils/classname';
import { ProfileImage, ProfileImageProps } from '../ProfileImage';

const ChatImage = ProfileImage;
ChatImage.displayName = 'ChatImage';

export type ChatItemProps = ProfileImageProps & {
  image?: ProfileImageProps;
  groupImages?: {
    src: string;
    alt?: string;
  }[];
  text: ChatTextProps;
  notice?: number;
  onClick?: () => void;
  className?: string;
};

const ChatItem: React.FC<ChatItemProps> = ({
  image,
  groupImages,
  text,
  notice = 0,
  onClick,
  className,
}) => {
  return (
    <div
      className={cn('flex cursor-pointer items-center py-2.5', className)}
      onClick={onClick}
    >
      <div className="flex flex-shrink-0 items-center justify-center">
        {groupImages && groupImages.length > 0 ? (
          <GroupChatImage images={groupImages} size={46} />
        ) : image ? (
          <ChatImage {...image} />
        ) : null}
      </div>

      <div className="ml-3 flex-1">
        <ChatText {...text} />
      </div>

      {notice > 0 && <NoticeIcon notice={notice} />}
    </div>
  );
};

export default ChatItem;
