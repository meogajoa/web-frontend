import {
  Listbox as _Listbox,
  ListboxButton as _ListboxButton,
  ListboxOption as _ListboxOption,
  ListboxOptions as _ListboxOptions,
} from '@headlessui/react';
import React from 'react';
import { Button } from '~/components/Button';
import { cn } from '~/utils/classname';

type DropdownGroupProps = {
  className?: React.ComponentProps<'div'>['className'];
  value: unknown;
  onOptionClick: (value: unknown) => void;
  disabled?: boolean;
  compareBy?: (originalValue: unknown, compareValue: unknown) => boolean;
};

export const DropdownGroup: React.FC<
  React.PropsWithChildren<DropdownGroupProps>
> = ({ className, onOptionClick: handleTabChange, compareBy, children }) => {
  return (
    <_Listbox
      className={cn('', className)}
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
      className={cn('', className)}
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
        'inline-block w-[var(--button-width)] origin-top rounded-lg bg-white px-2.5 py-4 shadow transition duration-200 ease-out [--anchor-gap:1rem] data-[closed]:scale-95 data-[closed]:opacity-0',
        className,
      )}
      as="div"
      anchor="bottom start"
      transition
    >
      {children}
    </_ListboxOptions>
  );
};

type DropdownOptionProps = {
  className?: React.ComponentProps<'div'>['className'];
  value: unknown;
};

const DropdownOption: React.FC<
  React.PropsWithChildren<DropdownOptionProps>
> = ({ className, value, children }) => {
  return (
    <_ListboxOption
      className={cn(
        'cursor-pointer border-b-[0.06rem] border-gray-6 py-2 text-sm text-black transition-colors duration-300 first:pt-0 last:border-b-0 last:pb-0 data-[focus]:bg-gray-5 data-[selected]:bg-gray-4',
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
