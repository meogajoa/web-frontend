import { test } from '@playwright/test';
import {
  generateRandomAccount,
  signInAsync,
  signUpAsync,
} from '@tests/e2e/utils/auth';
import {
  createRoomAsync,
  generateRandomRoom,
  joinRoomAsync,
} from '@tests/e2e/utils/room';
import { range } from 'lodash-es';

const TEST_ROOM_NAME = 'example-name';

test.describe('Create room', () => {
  test('should create room', async ({ page }) => {
    // GIVEN
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

    // WHEN & THEN
    await createRoomAsync(page, {
      room,
      shouldSuccess: true,
    });
  });
});

test.describe
  .serial(`Create room with name "${TEST_ROOM_NAME}" and join room with 8 users`, () => {
  test('should create room', async ({ page }) => {
    // GIVEN
    const account = generateRandomAccount();

    await signUpAsync(page, {
      account,
      shouldSuccess: true,
    });

    await signInAsync(page, {
      account,
      shouldSuccess: true,
    });

    const roomItem = await page.getByTestId(`room-name-${TEST_ROOM_NAME}`);
    if ((await roomItem.count()) > 0) {
      return;
    }

    // WHEN & THEN
    await createRoomAsync(page, {
      room: {
        name: TEST_ROOM_NAME,
      },
      shouldSuccess: true,
    });
  });

  range(8).forEach((_, index) => {
    test(`should join room with user ${index + 1}`, async ({ page }) => {
      // GIVEN
      const account = generateRandomAccount();

      await signUpAsync(page, {
        account,
        shouldSuccess: true,
      });

      await signInAsync(page, {
        account,
        shouldSuccess: true,
      });

      // WHEN & THEN
      await joinRoomAsync(page, {
        room: {
          name: TEST_ROOM_NAME,
        },
        shouldSuccess: true,
      });
    });
  });
});
