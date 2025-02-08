import React from 'react';
import ProfileImage from '~/components/ProfileImage/ProfileImage';
import { Team } from '~/types/game';
import { isTeam } from '~/utils/chat';
import { cn } from '~/utils/classname';

export type GroupChatImageProps = {
  className?: string;
  images: string[] | Team[];
};

const GroupChatImage: React.FC<GroupChatImageProps> = ({
  className,
  images,
}) => {
  return (
    <div
      className={cn(
        'grid grid-cols-2 grid-rows-2 gap-0.5 overflow-hidden',
        className,
      )}
    >
      {images.slice(0, 4).map((img, index) => (
        <ProfileImage
          key={index}
          src={isTeam(img) ? undefined : img}
          color={
            isTeam(img)
              ? img === Team.Black
                ? 'gray'
                : 'light-gray'
              : undefined
          }
          size="sm"
        />
      ))}
    </div>
  );
};

export default GroupChatImage;
