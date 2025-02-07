import React from 'react';

export type ChatTextProps = {
  text: string;
  contentText: string;
  isError?: boolean;
  spy?: string;
};

const ChatText: React.FC<ChatTextProps> = ({
  text,
  spy,
  contentText,
  isError = false,
}) => {
  return (
    <div className="font-base flex flex-col gap-2.5 text-left">
      <div className="flex text-base">
        <div className="font-medium text-white">
          {text}
          <span> </span>
          <span className="text-red font-normal">{spy}</span>
        </div>
      </div>
      <div
        className={`${isError ? 'text-red' : 'text-gray-5'} text-[0.625rem]`}
      >
        {contentText}
      </div>
    </div>
  );
};

export default ChatText;
