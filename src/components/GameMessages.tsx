import React from 'react';
import { useSubscription } from 'react-stomp-hooks';
import exampleImage from '~/assets/images/cat.png';
import { cn } from '~/utils/classname';

const exampleMessages = [
  {
    username: 'hyo0joo',
    message: '안녕하세요1',
    src: exampleImage.src,
    position: 'left',
  },
  {
    username: 'jeheecheon',
    message: '안녕하세요2',
    src: exampleImage.src,
    position: 'right',
  },
  {
    username: 'hyo0joo',
    message: '안녕하세요3',
    src: exampleImage.src,
    position: 'left',
  },
];

type Props = {
  className?: React.ComponentProps<'div'>['className'];
  roomId: string;
};

const GameMessages: React.FC<Props> = ({ className, roomId }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  useSubscription(`/topic/roon/${roomId}`, (message) => console.log(message));

  return (
    <div className={cn('space-y-3 overflow-y-auto', className)}>
      {/* {messages.map(({ username, message, src, position }, index) => (
        <ChatMessage
          position={position}
          key={index}
          username={username}
          message={message}
          src={src}
        />
      ))} */}
    </div>
  );
};

export default GameMessages;
