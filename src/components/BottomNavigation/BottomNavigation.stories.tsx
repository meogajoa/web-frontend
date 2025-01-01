import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import BottomNavigation from '~/components/BottomNavigation/BottomNavigation';
import { MENUS } from '~/constants/navigation';
import { RemovePadding } from '../RemovePadding';

const meta: Meta<typeof BottomNavigation> = {
  title: 'Molecules/BottomNavigation',
  component: BottomNavigation,
  decorators: [
    (Story) => (
      <div className="flex h-screen flex-col justify-end">
        <Story />
        <RemovePadding />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof BottomNavigation>;

export const Default: Story = {
  render: () => {
    const [mockPath, setMockPath] = React.useState('/home');

    return (
      <BottomNavigation>
        {MENUS.map(({ label, icon, href }) => (
          <BottomNavigation.Item
            key={label}
            label={label}
            isActive={href === mockPath}
            icon={icon}
            onClick={setMockPath.bind(null, href)}
          />
        ))}
      </BottomNavigation>
    );
  },
};
