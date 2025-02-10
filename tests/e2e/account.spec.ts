import { expect, test } from '@playwright/test';
import { signInUrl, signUpUrl } from '@tests/constants/urls';
import {
  generateRandomAccount,
  signInAsync,
  signUpAsync,
} from '@tests/e2e/utils/auth';

test.describe('Sign up', () => {
  test('should sign up successfully', async ({ page }) => {
    const account = generateRandomAccount();

    await signUpAsync(page, {
      account,
      shouldSuccess: true,
    });
  });

  test('should fail to sign up', async ({ page }) => {
    const account = generateRandomAccount();
    account.passwordConfirmation = 'wrong-password';

    await signUpAsync(page, {
      account,
      shouldSuccess: false,
    });
  });

  test('should go to sign in page', async ({ page }) => {
    await page.goto(signUpUrl);
    await page.getByTestId('go-to-sign-in-button').click();
    await expect(page).toHaveURL(signInUrl);
  });
});

test.describe('Sign in', () => {
  test('should sign in successfully', async ({ page }) => {
    const account = generateRandomAccount();

    await signUpAsync(page, {
      account,
      shouldSuccess: true,
    });

    await signInAsync(page, {
      account,
      shouldSuccess: true,
    });
  });

  test('should fail to sign in', async ({ page }) => {
    const account = generateRandomAccount();

    await signUpAsync(page, {
      account,
      shouldSuccess: false,
    });

    account.password = 'wrong-password';
    await signInAsync(page, {
      account,
      shouldSuccess: false,
    });
  });
});
