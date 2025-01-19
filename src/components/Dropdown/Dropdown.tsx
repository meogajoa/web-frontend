import {
  Listbox as _Listbox,
  ListboxButton as _ListboxButton,
  ListboxOption as _ListboxOption,
  ListboxOptions as _ListboxOptions,
} from '@headlessui/react';
import React from 'react';
import { Button } from '~/components/Button';
import { cn } from '~/utils/classname';

type DropdownGroupProps<T> = {
  className?: React.ComponentProps<'div'>['className'];
  value: T;
  onOptionClick: (value: T) => void;
  disabled?: boolean;
  compareBy?: (originalValue: T, compareValue: T) => boolean;
};

export const DropdownGroup = <T,>({
  className,
  onOptionClick: handleTabChange,
  compareBy,
  children,
}: React.PropsWithChildren<DropdownGroupProps<T>>) => {
  return (
    <_Listbox
      className={cn('relative w-fit', className)}
      as="div"
      onChange={handleTabChange}
      by={compareBy}
    >
      {children}
    </_Listbox>
  );
};

type DropdownButtonProps = {
  className?: React.ComponentProps<'button'>['className'];
};

const DropdownButton: React.FC<
  React.PropsWithChildren<DropdownButtonProps>
> = ({ className, children }) => {
  return (
    <_ListboxButton
      className={cn('w-full', className)}
      as={Button}
      size="sm"
      rounded="full"
      icon="chevron-down"
    >
      {children}
    </_ListboxButton>
  );
};

type DropdownOptions = {
  className?: React.ComponentProps<'div'>['className'];
};

export const DropdownOptions: React.FC<
  React.PropsWithChildren<DropdownOptions>
> = ({ className, children }) => {
  return (
    <_ListboxOptions
      className={cn(
        'absolute mt-4 inline-block w-full origin-top rounded-lg bg-white px-2.5 py-4 shadow transition duration-200 ease-out [--anchor-gap:1rem] data-[closed]:scale-95 data-[closed]:opacity-0',
        className,
      )}
      as="div"
      transition
      modal={false}
      portal={false}
    >
      {children}
    </_ListboxOptions>
  );
};

type DropdownOptionProps<T> = {
  className?: React.ComponentProps<'div'>['className'];
  value: T;
};

const DropdownOption = <T,>({
  className,
  value,
  children,
}: React.PropsWithChildren<DropdownOptionProps<T>>) => {
  return (
    <_ListboxOption
      className={cn(
        'cursor-pointer border-b border-gray-6 py-2 text-sm text-black transition-colors duration-300 first:pt-0 last:border-b-0 last:pb-0 data-[focus]:bg-gray-5 data-[selected]:bg-gray-4',
        className,
      )}
      value={value}
    >
      {children}
    </_ListboxOption>
  );
};

export default Object.assign(DropdownGroup, {
  Button: DropdownButton,
  Options: DropdownOptions,
  Option: DropdownOption,
});
