import { Button as HeadlessuiButton } from '@headlessui/react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import CustomTextarea, { TextareaHandle } from '~/components/CustomTextarea';
import MessageSendIcon from '~/svgs/MessageSendIcon';
import { cn } from '~/utils/classname';

type Props = {
  className?: string;
};

const ChatBar: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        'shadow-top flex items-center gap-x-3 bg-white px-4 pt-1 pb-4',
        className,
      )}
    >
      {children}
    </div>
  );
};

type MenuButtonProps = {
  className?: string;
  onMenuClick: () => void;
};

const MenuButton: React.FC<MenuButtonProps> = ({
  className,
  onMenuClick: handleMenuClick,
}) => {
  return (
    <HeadlessuiButton
      className={cn('size-6 cursor-pointer', className)}
      onClick={handleMenuClick}
    >
      <PlusCircleIcon className="stroke-gray-1 size-full" />
    </HeadlessuiButton>
  );
};

type TextareaProps = {
  className?: string;
  ref: React.RefObject<TextareaHandle>;
  onKeyDown?: React.ComponentProps<'textarea'>['onKeyDown'];
};

const Textarea: React.FC<TextareaProps> = ({ className, ref, onKeyDown }) => {
  return (
    <CustomTextarea
      className={cn(
        'scrollbar-hide scrollbar-primary border-gray-6 text-gray-1 placeholder:text-gray-5 rounded-lg border p-2.5 text-xl outline-hidden transition-all duration-300',
        className,
      )}
      ref={ref}
      onKeyDown={onKeyDown}
    />
  );
};

type SendButtonProps = {
  className?: string;
  onSendClick: () => void;
};

const SendButton: React.FC<SendButtonProps> = ({
  className,
  onSendClick: handleSend,
}) => {
  return (
    <HeadlessuiButton
      className={cn(
        'size-5.5 cursor-pointer transition-transform duration-300 hover:rotate-45',
        className,
      )}
      onClick={handleSend}
    >
      <MessageSendIcon className="stroke-gray-1 size-full" />
    </HeadlessuiButton>
  );
};

export default Object.assign(ChatBar, {
  MenuButton,
  Textarea,
  SendButton,
});
