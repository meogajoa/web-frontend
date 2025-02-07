import React from 'react';
import ProfileImage, {
  ProfileImageProps,
} from '~/components/ProfileImage/ProfileImage';
import { cn } from '~/utils/classname';

export type GroupChatImageProps = {
  images: Omit<ProfileImageProps, 'userNumber'>[];
  size?: number;
  className?: string;
};

const GroupChatImage: React.FC<GroupChatImageProps> = ({
  images,
  size = 46,
  className,
}) => {
  return (
    <div
      className={cn(
        'grid grid-cols-2 grid-rows-2 gap-[1px] overflow-hidden',
        className,
      )}
      style={{ width: size, height: size }}
    >
      {images.slice(0, 4).map((img, index) => (
        <div key={index} className="h-full w-full">
          <ProfileImage {...img} size="sm" />
        </div>
      ))}
    </div>
  );
};

export default GroupChatImage;
