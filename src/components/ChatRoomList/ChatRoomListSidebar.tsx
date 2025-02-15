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
import { type ChatRoomProps } from './ChatRoom';

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
  const { user, otherUsers, whiteTeamUsers, blackTeamUsers, eliminatedUsers } =
    useGame();
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
                ]?.content || t('chatRoom.emptyContent'),
              hasAccess: !user.eliminated,
              onClick: () => {
                onClose();
                setCurrentChatRoom(ChatRoom.General);
              },
            },
            // White Chat Room
            {
              type: 'group',
              title: t(`chatRoomType.white`),
              groupImages: range(whiteTeamUsers.length)
                .slice(0, 4)
                .map(() => Team.White),
              content:
                user.team === Team.White
                  ? messagesByRoom[ChatRoom.White][
                      messagesByRoom[ChatRoom.White].length - 1
                    ]?.content || t('chatRoom.emptyContent')
                  : t('chatRoom.noAccessToOpponentChatRoom'),
              hasAccess: user.team === Team.White && !user.eliminated,
              onClick: () => {
                if (user.team !== Team.White) {
                  return;
                }

                onClose();
                setCurrentChatRoom(ChatRoom.White);
              },
            },
            // Black Chat Room
            {
              type: 'group',
              title: t(`chatRoomType.black`),
              groupImages: range(blackTeamUsers.length)
                .slice(0, 4)
                .map(() => Team.Black),
              content:
                user.team === Team.Black
                  ? messagesByRoom[ChatRoom.Black][
                      messagesByRoom[ChatRoom.Black].length - 1
                    ]?.content || t('chatRoom.emptyContent')
                  : t('chatRoom.noAccessToOpponentChatRoom'),
              hasAccess: user.team === Team.Black && !user.eliminated,
              onClick: () => {
                if (user.team !== Team.Black) {
                  return;
                }

                onClose();
                setCurrentChatRoom(ChatRoom.Black);
              },
            },
            // Personal Chat Room (Other Users)
            ...Object.values(UserNumber)
              .filter(
                (number) =>
                  typeof number === 'number' &&
                  number >= 1 &&
                  number <= 8 &&
                  user.number !== number &&
                  user.team === otherUsers[number].team,
              )
              .map<ChatRoomProps>((number) => {
                const messages = messagesByRoom[number as ChatRoom];
                const hasAccess =
                  !user.eliminated &&
                  user.team === otherUsers[number as UserNumber].team;

                return {
                  type: 'personal',
                  title: t(`chatRoomType.${number}`),
                  content:
                    messages[messages.length - 1]?.content ||
                    t('chatRoom.emptyContent'),
                  isSpy: otherUsers[number as UserNumber].isSpy,
                  image: otherUsers[number as UserNumber].team,
                  hasAccess,
                  onClick: () => {
                    if (!hasAccess) {
                      return;
                    }

                    onClose();
                    setCurrentChatRoom(number as ChatRoom);
                  },
                };
              }),
            // Eliminated User Chat Room
            {
              type: 'group',
              title: t(`chatRoomType.eliminated`),
              groupImages: eliminatedUsers.map(
                (number) => otherUsers[number].team,
              ),
              content: user.eliminated
                ? messagesByRoom[ChatRoom.Eliminated][
                    messagesByRoom[ChatRoom.Eliminated].length - 1
                  ]?.content || t('chatRoom.emptyContent')
                : t('chatRoom.noAccessToEliminatedChatRoom'),
              hasAccess: user.eliminated,
              onClick: () => {
                if (!user.eliminated) {
                  return;
                }

                onClose();
                setCurrentChatRoom(ChatRoom.Eliminated);
              },
            } as ChatRoomProps,
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
