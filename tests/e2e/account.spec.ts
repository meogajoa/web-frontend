import { expect, test } from '@playwright/test';
import { generateRandomAccount, signUpAsync } from './utils/auth';

test.describe('Sign up', () => {
  test('should sign up successfully', async ({ page }) => {
    const account = generateRandomAccount();
    await signUpAsync(page, account);
    await expect(page).toHaveURL(/.*sign-in/);
  });

  test('should fail to sign up', async ({ page }) => {
    const account = generateRandomAccount();
    account.passwordConfirmation = 'wrong-password';
    await signUpAsync(page, account);
    await expect(page).toHaveURL(/.*sign-up/);
  });
});
