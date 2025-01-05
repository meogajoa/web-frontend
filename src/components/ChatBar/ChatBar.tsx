import {
  Button as HeadlessuiButton,
  ButtonProps as HeadlessuiButtonProps,
} from '@headlessui/react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import CustomTextarea from '~/components/CustomTextarea';
import MessageSendIcon from '~/svgs/MessageSendIcon';
import { cn } from '~/utils/classname';

type Props = React.ComponentProps<'form'>;

const ChatBar: React.FC<Props> = ({ className, ...props }) => {
  return (
    <form
      className={cn(
        'bottom-0-dynamic fixed flex w-full items-center gap-x-3 bg-white px-4 py-1 shadow-top',
        className,
      )}
      {...props}
    />
  );
};

type MenuButtonProps = HeadlessuiButtonProps;

const MenuButton: React.FC<MenuButtonProps> = ({ className, ...props }) => {
  return (
    <HeadlessuiButton
      as={PlusCircleIcon}
      className={cn('size-6 cursor-pointer stroke-gray-1', className)}
      {...props}
    />
  );
};

type TextareaProps = React.ComponentPropsWithRef<typeof CustomTextarea>;

const Textarea: React.FC<TextareaProps> = ({ className, ...props }) => {
  return (
    <CustomTextarea
      className={cn(
        'scrollbar-primary rounded-lg border border-gray-6 p-2.5 text-xl text-gray-1 transition-all duration-300 placeholder:text-gray-5 focus:outline-none',
        className,
      )}
      {...props}
    />
  );
};

type SendButtonProps = HeadlessuiButtonProps;

const SendButton: React.FC<SendButtonProps> = ({ className, ...props }) => {
  return (
    <HeadlessuiButton
      as={MessageSendIcon}
      className={cn(
        'size-5.5 cursor-pointer stroke-gray-1 transition-transform duration-300 hover:rotate-45',
        className,
      )}
      {...props}
    />
  );
};

export default Object.assign(ChatBar, {
  MenuButton,
  Textarea,
  SendButton,
});
