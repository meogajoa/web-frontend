import { ChatRoomList } from '@/components/ChatRoomList';
import { type ChatRoomProps } from '@/components/ChatRoomList/ChatRoom';
import { useGame } from '@/providers/GameProvider';
import { useRoom } from '@/providers/RoomProvider';
import { ChatRoom } from '@/types/chat';
import { Team, UserNumber } from '@/types/game';
import { convertToPersonalChatRoom } from '@/utils/chat';
import { cn } from '@/utils/classname';
import { convertToUserNumber, isValidUserNumber } from '@/utils/game';
import { Transition } from '@headlessui/react';
import { compact, noop, shuffle } from 'lodash-es';
import { useTranslations } from 'next-intl';
import React from 'react';

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
  const {
    user,
    otherUsers,
    whiteTeamUsers,
    blackTeamUsers,
    redTeamUsers,
    eliminatedUsers,
  } = useGame();
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
              groupImages: shuffle(otherUsers).map((user) => user.team),
              content:
                messagesByRoom[ChatRoom.General][
                  messagesByRoom[ChatRoom.General].length - 1
                ]?.content || t('chatRoom.emptyContent'),
              hasAccess: true,
              onClick: () => {
                onClose();
                setCurrentChatRoom(ChatRoom.General);
              },
            },
            // White Chat Room
            {
              type: 'group',
              title: t(`chatRoomType.white`),
              groupImages: whiteTeamUsers.map(() => Team.White),
              content:
                user.team === Team.White
                  ? messagesByRoom[ChatRoom.White][
                      messagesByRoom[ChatRoom.White].length - 1
                    ]?.content || t('chatRoom.emptyContent')
                  : t('chatRoom.noAccessToOpponentChatRoom'),
              hasAccess: user.team === Team.White || user.eliminated,
              onClick: () => {
                if (!user.eliminated && user.team !== Team.White) {
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
              groupImages: blackTeamUsers.map(() => Team.Black),
              content:
                user.team === Team.Black
                  ? messagesByRoom[ChatRoom.Black][
                      messagesByRoom[ChatRoom.Black].length - 1
                    ]?.content || t('chatRoom.emptyContent')
                  : t('chatRoom.noAccessToOpponentChatRoom'),
              hasAccess: user.team === Team.Black || user.eliminated,
              onClick: () => {
                if (!user.eliminated && user.team !== Team.Black) {
                  return;
                }

                onClose();
                setCurrentChatRoom(ChatRoom.Black);
              },
            },
            // Red Chat Room
            {
              type: 'group',
              title: t(`chatRoomType.red`),
              groupImages: redTeamUsers.map(() => Team.Red),
              content:
                user.team === Team.Red
                  ? messagesByRoom[ChatRoom.Red][
                      messagesByRoom[ChatRoom.Red].length - 1
                    ]?.content || t('chatRoom.emptyContent')
                  : t('chatRoom.noAccessToOpponentChatRoom'),
              hasAccess: user.team === Team.Red || user.eliminated,
              onClick: () => {
                if (!user.eliminated && user.team !== Team.Red) {
                  return;
                }

                onClose();
                setCurrentChatRoom(ChatRoom.Red);
              },
            },
            // Personal Chat Room (Other Users)
            ...Object.values(UserNumber)
              .filter(
                (number) =>
                  isValidUserNumber(Number(number)) && user.number !== number,
              )
              .map<ChatRoomProps>((_userNumber) => {
                const userNumber = convertToUserNumber(_userNumber);
                const messages =
                  messagesByRoom[convertToPersonalChatRoom(userNumber)];
                const hasAccess = !user.eliminated;

                return {
                  type: 'personal',
                  title: t(`chatRoomType.${userNumber}`),
                  content:
                    messages[messages.length - 1]?.content ||
                    t('chatRoom.emptyContent'),
                  isSpy: otherUsers[userNumber].isSpy,
                  image: otherUsers[userNumber].team,
                  hasAccess,
                  onClick: () => {
                    if (!hasAccess) {
                      return;
                    }

                    onClose();
                    setCurrentChatRoom(convertToPersonalChatRoom(userNumber));
                  },
                };
              }),
            // Eliminated User Chat Room
            {
              type: 'group',
              title: t(`chatRoomType.eliminated`),
              groupImages: eliminatedUsers.map(
                (userNumber) =>
                  otherUsers[convertToUserNumber(userNumber)].team,
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
