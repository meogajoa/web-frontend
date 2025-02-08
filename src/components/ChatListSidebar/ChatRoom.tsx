import React from 'react';
import ChatText, { ChatTextProps } from '~/components/ChatListSidebar/ChatText';
import NoticeIcon from '~/components/ChatListSidebar/NoticeIcon';
import { Team } from '~/types/game';
import { isTeam } from '~/utils/chat';
import { cn } from '~/utils/classname';
import { ProfileImage } from '../ProfileImage';
import GroupChatImage from './GroupChatImage';

export type ChatRoomProps = {
  className?: string;
  roomData: Omit<ChatTextProps, 'className'>;
  notice?: number;
  onClick?: () => void;
} & (
  | {
      type: 'personal';
      image?: string | Team;
    }
  | {
      type: 'group';
      groupImages?: string[] | Team[];
    }
);

const ChatRoom: React.FC<ChatRoomProps> = ({
  className,
  roomData,
  notice = 0,
  onClick,
  type,
  ...props
}) => {
  return (
    <button
      className={cn('flex w-full items-center py-2.5', className)}
      onClick={onClick}
    >
      <div className="flex flex-shrink-0 items-center justify-center">
        {type === 'personal' && 'image' in props && props.image && (
          <ProfileImage
            src={isTeam(props.image) ? undefined : props.image}
            color={
              isTeam(props.image)
                ? props.image === Team.Black
                  ? 'gray'
                  : 'light-gray'
                : undefined
            }
            size="lg"
          />
        )}
        {type === 'group' && 'groupImages' in props && props.groupImages && (
          <GroupChatImage images={props.groupImages} />
        )}
      </div>

      <ChatText {...roomData} className="ml-3 flex-1" />

      {notice > 0 && <NoticeIcon notice={notice} />}
    </button>
  );
};

export default ChatRoom;
