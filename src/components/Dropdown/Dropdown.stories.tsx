import { Meta, StoryObj } from '@storybook/react';
import { Dropdown, DropdownExample } from '~/components/Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      description: 'Dropdown Button Disabled',
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    children: 'Dropdown',
  },
  render: (props) => <DropdownExample {...props} />,
};
