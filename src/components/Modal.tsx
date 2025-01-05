'use client';

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import React from 'react';
import { cn } from '~/utils/classname';

export type ModalProps = {
  overlayClassName?: React.ComponentProps<'div'>['className'];
  visible: boolean;
  onClose: () => void;
  hasBackdropBlur?: boolean;
  verticalAlignment?: 'top' | 'center' | 'bottom';
  horizontalAlignment?: 'left' | 'center' | 'right';
} & React.ComponentProps<'form'>;

const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({
  overlayClassName,
  className,
  visible,
  onClose,
  hasBackdropBlur,
  verticalAlignment = 'center',
  horizontalAlignment = 'center',
  onSubmit,
  children,
}) => {
  return (
    <Dialog
      className="fixed inset-0 z-50 flex size-full items-center justify-center"
      transition
      open={visible}
      onClose={onClose}
    >
      <DialogBackdrop
        className={cn(
          'fixed inset-0 bg-black/60 duration-300 ease-in-out data-[closed]:opacity-0',
          overlayClassName,
        )}
        transition
      />
      {/* NOTE: backdrop-blur with opacity transition makes rendering slow */}
      {hasBackdropBlur && (
        <DialogBackdrop className="fixed inset-0 backdrop-blur-xl" />
      )}

      <DialogPanel
        as="form"
        className={cn(
          'relative flex size-full overflow-y-auto duration-300 ease-in-out data-[closed]:opacity-0',
          verticalAlignment === 'top' && 'items-start',
          verticalAlignment === 'center' && 'items-center',
          verticalAlignment === 'bottom' && 'items-end',
          horizontalAlignment === 'left' && 'mr-auto',
          horizontalAlignment === 'center' && 'mx-auto',
          horizontalAlignment === 'right' && 'ml-auto',
          className,
        )}
        transition
        onSubmit={onSubmit}
      >
        {children}
      </DialogPanel>
    </Dialog>
  );
};

export default Modal;
