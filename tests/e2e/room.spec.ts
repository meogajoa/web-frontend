import { expect, test } from '@playwright/test';
import {
  generateRandomAccount,
  signInAsync,
  signUpAsync,
} from '@tests/e2e/utils/auth';
import { createRoomAsync, generateRandomRoom } from '@tests/e2e/utils/room';
import { range } from 'lodash-es';

const TEST_ROOM_NAME = 'test-01';

test.describe('Create room', () => {
  test('should create room successfully', async ({ page }) => {
    const account = generateRandomAccount();

    await signUpAsync(page, {
      account,
      shouldSuccess: true,
    });

    await signInAsync(page, {
      account,
      shouldSuccess: true,
    });

    const room = generateRandomRoom({
      emptyPassword: true,
    });

    await createRoomAsync(page, {
      room,
      shouldSuccess: true,
    });
  });
});

test.describe('Join room', () => {
  test('should join room with 8 accounts', async ({ page }) => {
    const accounts = range(7).map(() => generateRandomAccount());

    for (const account of accounts) {
      await signUpAsync(page, {
        account,
        shouldSuccess: true,
      });

      await signInAsync(page, {
        account,
        shouldSuccess: true,
      });

      await page.getByRole('link', { name: TEST_ROOM_NAME }).click();
      await expect(page).toHaveURL(/.*rooms/);
      await expect(page.getByTestId('room')).toBeVisible();
    }
  });
});
