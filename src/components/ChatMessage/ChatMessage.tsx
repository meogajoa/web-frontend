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
      <div
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

        <div className="flex flex-col gap-y-2.5 text-sm text-gray-1">
          {position === 'left' && !isCumulative && <p>{username}</p>}
          <div
            className={cn(
              'max-w-[60vw] break-all rounded-[0.93rem] bg-white p-2.5',
              position === 'left' && 'rounded-tl-[0.15rem]',
              position === 'right' && 'rounded-br-[0.15rem]',
            )}
          >
            {message}
          </div>
        </div>
      </div>
    );
  },
);
ChatMessage.displayName = 'ChatMessage';

export default ChatMessage;
