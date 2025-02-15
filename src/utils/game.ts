import { UserNumber } from '@/types/game';
import type { Maybe } from '@/types/misc';

export const convertToUserNumber = (
  input: Maybe<UserNumber | string | number>,
) => {
  const number = Number(input);
  if (!isValidUserNumber(number)) {
    return UserNumber.Invalid;
  }

  return number as UserNumber;
};

export const isValidUserNumber = (number: number) => {
  return (
    !Number.isNaN(number) &&
    Number.isInteger(number) &&
    number >= UserNumber.One &&
    number <= UserNumber.Nine
  );
};
