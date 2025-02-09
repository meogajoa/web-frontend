import { Transition } from '@headlessui/react';
import { compact, noop, range } from 'lodash-es';
import { useTranslations } from 'next-intl';
import React from 'react';
import { ChatRoomList } from '~/components/ChatRoomList';
import { useGame } from '~/providers/GameProvider';
import { useRoom } from '~/providers/RoomProvider';
import { ChatRoom } from '~/types/chat';
import { Team, UserNumber } from '~/types/game';
import { cn } from '~/utils/classname';
import { ChatRoomProps } from './ChatRoom';

type Props = {
  className?: string;
  isVisible: boolean;
  overlayClassName?: string;
  onClose: () => void;
};

const ChatRoomListSidebar: React.FC<Props> = ({
  className,
  overlayClassName,
  isVisible,
  onClose,
}) => {
  const t = useTranslations('roomRoute');
  const { user, otherUsers, whiteTeamUsers, blackTeamUsers } = useGame();
  const { messagesByRoom, setCurrentChatRoom } = useRoom();

  return (
    <>
      <Transition
        className={cn(
          'absolute top-0 right-0 z-40 size-full max-w-1/3 min-w-xs transition-transform duration-300 ease-in-out',
          className,
        )}
        as="div"
        show={isVisible}
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <ChatRoomList
          onClose={onClose}
          rooms={compact<ChatRoomProps>([
            // General Chat Room
            {
              type: 'group',
              title: t(`chatRoomType.general`),
              groupImages: [Team.White, Team.Black, Team.Black, Team.White],
              content:
                messagesByRoom[ChatRoom.General][
                  messagesByRoom[ChatRoom.General].length - 1
                ]?.content || t('chatRoomList.emptyContent'),
              onClick: () => setCurrentChatRoom(ChatRoom.General),
            },
            // Team Chat Room (White or Black)
            {
              type: 'group',
              title: t(`chatRoomType.general`),
              groupImages: range(
                user.team === Team.White
                  ? whiteTeamUsers.length
                  : blackTeamUsers.length,
              ).map(() => user.team),
              content:
                messagesByRoom[ChatRoom.General][
                  messagesByRoom[ChatRoom.General].length - 1
                ]?.content || t('chatRoomList.emptyContent'),
              onClick: () =>
                setCurrentChatRoom(
                  user.team === Team.Black ? ChatRoom.Black : ChatRoom.White,
                ),
            },
            // Personal Chat Room (Other Users)
            ...Object.values(UserNumber)
              .filter(
                (number) =>
                  typeof number === 'number' &&
                  number >= 1 &&
                  number <= 8 &&
                  user.number !== number,
              )
              .map<ChatRoomProps>((number) => {
                const messages = messagesByRoom[number as ChatRoom];
                return {
                  type: 'personal',
                  title: t(`chatRoomType.${number}`),
                  content:
                    messages[messages.length - 1]?.content ||
                    t('chatRoomList.emptyContent'),
                  isSpy: otherUsers[number as UserNumber].isSpy,
                  image: otherUsers[number as UserNumber].team,
                  onClick: () => setCurrentChatRoom(number as ChatRoom),
                };
              }),
          ])}
          onExit={noop}
          onNotificationClick={noop}
        />
      </Transition>

      <div
        className={cn(
          'bg-gray-1/50 pointer-events-none absolute inset-0 z-30 opacity-0 transition-opacity duration-300',
          isVisible && 'pointer-events-auto opacity-100',
          overlayClassName,
        )}
        onClick={onClose}
      />
    </>
  );
};

export default ChatRoomListSidebar;
