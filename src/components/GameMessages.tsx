import React from 'react';
// import exampleImage from '~/assets/images/cat.png';
import { cn } from '~/utils/classname';
// import { ChatMessage } from './ChatMessage';

// const exampleMessages = [
//   {
//     username: 'hyo0joo',
//     message: '안녕하세요',
//     sentAt: '2021-09-01T12:00:00Z',
//     src: exampleImage.src,
//     position: 'left',
//   },
//   {
//     username: 'hyo0joo',
//     message: '훗.,,,',
//     sentAt: '2021-09-01T12:01:00Z',
//     src: exampleImage.src,
//     position: 'left',
//   },
//   {
//     username: 'hyo0joo',
//     message: '!!!',
//     sentAt: '2021-09-01T12:02:00Z',
//     src: exampleImage.src,
//     position: 'right',
//   },
// ].reverse();

type Props = {
  className?: React.ComponentProps<'div'>['className'];
};

const GameMessages: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('flex flex-col-reverse', className)}>
      {/* {exampleMessages.map(({ username, message, sentAt, src, position }) => (
        <ChatMessage
          position={position}
          key={sentAt}
          username={username}
          message={message}
          src={src}
        />
      ))} */}
    </div>
  );
};

export default GameMessages;
