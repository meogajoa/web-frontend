import { Button as HeadlessuiButton } from '@headlessui/react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import CustomTextarea, { TextareaHandle } from '~/components/CustomTextarea';
import MessageSendIcon from '~/svgs/MessageSendIcon';
import { cn } from '~/utils/classname';

type Props = {
  className?: React.ComponentProps<'div'>['className'];
};

const ChatBar: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        'flex items-center gap-x-3 bg-white px-4 pb-4 pt-1 shadow-top',
        className,
      )}
    >
      {children}
    </div>
  );
};

type MenuButtonProps = {
  className?: React.ComponentProps<'button'>['className'];
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
      <PlusCircleIcon className="size-full stroke-gray-1" />
    </HeadlessuiButton>
  );
};

type TextareaProps = {
  className?: React.ComponentProps<'textarea'>['className'];
  ref: React.RefObject<TextareaHandle>;
  onKeyDown?: React.ComponentProps<'textarea'>['onKeyDown'];
};

const Textarea: React.FC<TextareaProps> = ({ className, ref, onKeyDown }) => {
  return (
    <CustomTextarea
      className={cn(
        'scrollbar-hide scrollbar-primary rounded-lg border border-gray-6 p-2.5 text-xl text-gray-1 outline-none transition-all duration-300 placeholder:text-gray-5',
        className,
      )}
      ref={ref}
      onKeyDown={onKeyDown}
    />
  );
};

type SendButtonProps = {
  className?: React.ComponentProps<'button'>['className'];
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
      <MessageSendIcon className="size-full stroke-gray-1" />
    </HeadlessuiButton>
  );
};

export default Object.assign(ChatBar, {
  MenuButton,
  Textarea,
  SendButton,
});
