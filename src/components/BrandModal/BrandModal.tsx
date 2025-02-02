import {
  Button as HeadlessButton,
  type ButtonProps as HeadlessButtonProps,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Button } from '~/components/Button';
import { cn } from '~/utils/classname';
import Modal, { ModalProps } from '../Modal';

export type BrandModalProps = ModalProps & {
  className?: React.ComponentProps<'div'>['className'];
};

const BrandModal: React.FC<BrandModalProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <Modal
      className={cn('bg-gray-6 flex size-fit max-w-lg flex-col', className)}
      {...props}
    >
      {children}
    </Modal>
  );
};

type HeadeProps = {
  className?: React.ComponentProps<'div'>['className'];
};

const Header: React.FC<React.PropsWithChildren<HeadeProps>> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        'bg-gray-5 relative flex h-16 w-full items-center justify-center',
        className,
      )}
    >
      {children}
    </div>
  );
};

type TitleProps = {
  className?: React.ComponentProps<'h1'>['className'];
  label: string;
};

const Title: React.FC<TitleProps> = ({ className, label }) => {
  return <h1 className={cn('text-2xl font-bold', className)}>{label}</h1>;
};

type CloseButtonProps = HeadlessButtonProps & {
  className?: React.ComponentProps<'button'>['className'];
  position?: 'right' | 'left';
  onClose: () => void;
};

const CloseButton: React.FC<CloseButtonProps> = ({
  className,
  position = 'right',
  onClose: handleClose,
  ...props
}) => {
  return (
    <HeadlessButton
      className={cn(
        'fill-gray-1 absolute size-6 cursor-pointer stroke-2',
        position === 'right' ? 'right-4' : 'left-4',
        className,
      )}
      as={XMarkIcon}
      onClick={handleClose}
      {...props}
    />
  );
};

type BodyProps = {
  className?: React.ComponentProps<'div'>['className'];
};

const Body: React.FC<React.PropsWithChildren<BodyProps>> = ({
  className,
  children,
}) => {
  return <div className={cn('p-4', className)}>{children}</div>;
};

type ButtonGroup = {
  className?: React.ComponentProps<'div'>['className'];
};

const ButtonGroup: React.FC<React.PropsWithChildren<ButtonGroup>> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn('flex items-center justify-center gap-x-8 p-5', className)}
    >
      {children}
    </div>
  );
};

type ModalButtonProps = {
  className?: React.ComponentProps<'button'>['className'];
  kind: 'yes' | 'no';
  type?: React.ComponentProps<'button'>['type'];
  onClick?: () => void;
};

const ModalButton: React.FC<React.PropsWithChildren<ModalButtonProps>> = ({
  className,
  kind,
  type,
  onClick: handleClick,
  children,
}) => {
  return (
    <Button
      className={cn('', className)}
      rounded="full"
      size="lg"
      variant={kind === 'yes' ? 'primary' : 'secondary'}
      type={type}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

export default Object.assign(BrandModal, {
  Header,
  Title,
  CloseButton,
  Body,
  ButtonGroup,
  Button: ModalButton,
});
