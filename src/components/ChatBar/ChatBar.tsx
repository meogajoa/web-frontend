'use client';

import { Button as HeadlessuiButton } from '@headlessui/react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import MessageSendIcon from '~/svgs/MessageSendIcon';
import { Nullable } from '~/types/misc';
import { cn } from '~/utils/classname';

export type TextareaHandle = {
  clear: () => void;
  focus: () => void;
  setValue: (value: string) => void;
  getValue: () => string;
};

type Props = Omit<React.ComponentProps<'textarea'>, 'ref'> & {
  ref: React.Ref<Nullable<TextareaHandle>>;
};

const ChatBar: React.FC<Props> = ({ className, ref }) => {
  const hiddenTextArea = React.useRef<HTMLTextAreaElement>(null);
  const textArea = React.useRef<HTMLTextAreaElement>(null);
  const placeholderRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    adjustHeight();
    window.addEventListener('resize', adjustHeight);
    return () => window.removeEventListener('resize', adjustHeight);
  }, []);

  React.useImperativeHandle(ref, () => ({
    clear: () => {
      if (!textArea.current) {
        return;
      }

      textArea.current.value = '';
      adjustHeight();
    },
    focus: () => {
      if (!textArea.current) {
        return;
      }

      textArea.current.focus();
    },
    setValue: (value: string) => {
      if (!textArea.current) {
        return;
      }

      textArea.current.value = value;
      adjustHeight();
    },
    getValue: () => {
      if (!textArea.current) {
        return '';
      }

      return textArea.current.value;
    },
  }));

  return (
    <>
      <form
        className={cn(
          'bottom-0-dynamic fixed flex w-full items-center gap-x-3 bg-white px-4 py-1 shadow-top',
          className,
        )}
        onSubmit={() => console.log('asd')}
      >
        <HeadlessuiButton
          as={PlusCircleIcon}
          className="size-6 cursor-pointer stroke-gray-1"
        />
        <textarea
          ref={textArea}
          onChange={adjustHeight}
          rows={1}
          className="scrollbar-primary w-full resize-none rounded-lg border border-gray-6 p-2.5 text-xl text-gray-1 transition-all duration-300 placeholder:text-gray-5 focus:outline-none"
        />
        <HeadlessuiButton
          as={MessageSendIcon}
          className="size-5.5 cursor-pointer stroke-gray-1 transition-transform duration-300 hover:rotate-45"
        />
      </form>

      {/* Placeholder div for visual adjustment of the chat bar */}
      {/* Mirrors the height of the visible textarea for consistent layout. */}
      <div
        ref={placeholderRef}
        aria-hidden
        className="transition-all duration-300"
      />

      {/* Hidden textarea for calculating height */}
      <div
        aria-hidden
        className="invisible absolute flex w-full gap-x-3 px-4 py-1"
      >
        <PlusCircleIcon className="size-6" />
        <textarea
          ref={hiddenTextArea}
          rows={1}
          className="scrollbar-primary w-full resize-none p-2.5 text-xl"
        />
        <MessageSendIcon className="size-5.5" />
      </div>
    </>
  );

  function adjustHeight() {
    if (
      !hiddenTextArea.current ||
      !textArea.current ||
      !placeholderRef.current
    ) {
      return;
    }

    hiddenTextArea.current.value = textArea.current.value;
    hiddenTextArea.current.style.height = 'auto';
    textArea.current.style.height =
      Math.min(hiddenTextArea.current.scrollHeight, 150) + 'px';
    placeholderRef.current.style.height = textArea.current.style.height;
  }
};

export default ChatBar;
