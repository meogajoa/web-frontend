import React from 'react';
import { ProfileImage, ProfileImageProps } from '~/components/ProfileImage';
import { cn } from '~/utils/classname';

type Props = {
  className?: string;
  position: 'left' | 'right';
  username: string;
  message: string;
  isCumulative?: boolean;
  color?: ProfileImageProps['color'];
  src?: ProfileImageProps['src'];
};

const ChatMessage = React.memo<Props>(
  ({ className, position, username, message, isCumulative, color, src }) => {
    return (
      <li
        className={cn(
          'flex gap-x-1',
          position === 'right' && 'justify-end',
          className,
        )}
      >
        {position === 'left' && (
          <ProfileImage
            className={cn('shrink-0', isCumulative && 'invisible')}
            size="md"
            color={color}
            src={src}
          />
        )}

        <div className="text-gray-1 flex flex-col gap-y-2.5 text-sm">
          {position === 'left' && !isCumulative && <p>{username}</p>}
          <div
            className={cn(
              'max-w-[60vw] rounded-[0.93rem] bg-white p-2.5 break-all',
              position === 'left' && 'rounded-tl-[0.15rem]',
              position === 'right' && 'rounded-br-[0.15rem]',
            )}
          >
            {message}
          </div>
        </div>
      </li>
    );
  },
);
ChatMessage.displayName = 'ChatMessage';

export default ChatMessage;
