import { expect, Page } from '@playwright/test';
import { homeUrl } from '@tests/constants/urls';
import { TestRoom } from '@tests/types/room';

export const generateRandomRoom = ({
  emptyPassword,
}: {
  emptyPassword?: boolean;
}): TestRoom => {
  return {
    name: `test${Math.random()}`,
    password: emptyPassword ? undefined : `test${Math.random()}`,
  };
};

export const createRoomAsync = async (
  page: Page,
  {
    room,
    shouldSuccess,
  }: {
    room: TestRoom;
    shouldSuccess: boolean;
  },
) => {
  // GIVEN: Go to home page
  await page.goto(homeUrl);

  // WHEN: Open create room modal
  await page.getByTestId('create-room-button').click();

  // WHEN: Fill room name and password and click create button
  await page.getByTestId('room-name-label').fill(room.name);
  await page.getByTestId('room-password-label').fill(room.password || '');
  await page.getByTestId('create-room-modal-create-button').click();

  // THEN: Check if the room is created successfully
  if (shouldSuccess) {
    await expect(page).toHaveURL(/.*rooms\/\d+$/);
  } else {
    await expect(page).toHaveURL(homeUrl);
  }
};
