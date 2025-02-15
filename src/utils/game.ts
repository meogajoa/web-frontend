import { UserNumber } from '~/types/game';
import type { Maybe } from '~/types/misc';

export const convertUserNumber = (
  input: Maybe<UserNumber | string | number>,
) => {
  const number = Number(input);
  if (Number.isNaN(number) || number < 1 || number > 9) {
    return UserNumber.Invalid;
  }

  return number as UserNumber;
};
