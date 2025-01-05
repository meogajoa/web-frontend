import {
  Button as HeadlessButton,
  ButtonProps as HeadlessButtonProps,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Button as BrandButton } from '~/components/Button';
import { cn } from '~/utils/classname';
import Modal, { ModalProps } from '../Modal';

export type BrandModalProps = ModalProps & React.ComponentPropsWithRef<'form'>;

const BrandModal: React.FC<BrandModalProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <Modal
      className={cn('flex size-fit max-w-lg flex-col bg-gray-6', className)}
      {...props}
    >
      {children}
    </Modal>
  );
};

type HeadeProps = React.ComponentProps<'div'>;

const Header: React.FC<HeadeProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'relative flex h-16 w-full items-center justify-center bg-gray-5',
        className,
      )}
      {...props}
    />
  );
};

type TitleProps = Omit<React.ComponentProps<'h1'>, 'children'> & {
  label: string;
};

const Title: React.FC<TitleProps> = ({ label, className, ...props }) => {
  return (
    <h1 className={cn('text-2xl font-bold', className)} {...props}>
      {label}
    </h1>
  );
};

type CloseButtonProps = HeadlessButtonProps & {
  position?: 'right' | 'left';
};

const CloseButton: React.FC<CloseButtonProps> = ({
  position = 'right',
  className,
  ...props
}) => {
  return (
    <HeadlessButton
      as={XMarkIcon}
      className={cn(
        'absolute size-6 cursor-pointer fill-gray-1 stroke-2',
        position === 'right' ? 'right-4' : 'left-4',
        className,
      )}
      {...props}
    />
  );
};

type BodyProps = React.ComponentProps<'div'>;

const Body: React.FC<BodyProps> = ({ className, ...props }) => {
  return <div className={cn('p-4', className)} {...props} />;
};

type ButtonGroup = React.ComponentProps<'div'>;

const ButtonGroup: React.FC<ButtonGroup> = ({ className, ...props }) => {
  return (
    <div
      className={cn('flex items-center justify-center gap-x-8 p-5', className)}
      {...props}
    />
  );
};

type ButtonProps = React.ComponentProps<typeof BrandButton> & {
  kind: 'yes' | 'no';
};

const Button: React.FC<ButtonProps> = ({ kind, ...props }) => {
  return (
    <BrandButton
      variant={kind === 'yes' ? 'primary' : 'secondary'}
      rounded="full"
      size="lg"
      {...props}
    />
  );
};

export default Object.assign(BrandModal, {
  Header,
  Title,
  CloseButton,
  Body,
  ButtonGroup,
  Button,
});
