import { Page } from '@playwright/test';
import { TestAccount } from '../types/auth';

export const generateRandomAccount = (): TestAccount => {
  return {
    email: `test${Math.random()}@test.com`,
    password: 'test',
    passwordConfirmation: 'test',
    nickname: `test${Math.random()}`,
  };
};

export const signUpAsync = async (page: Page, account: TestAccount) => {
  await page.goto('http://localhost:3000/kr/account/sign-up');

  await page.getByTestId('email-label').fill(account.email);
  await page.getByTestId('password-label').fill(account.password);
  await page.getByTestId('password-confirmation-label').fill(account.password);
  await page.getByTestId('nickname-label').fill(account.nickname);
  await page.getByTestId('sign-up-button').click();
};
