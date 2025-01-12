import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Dropdown } from '~/components/Dropdown';

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

const myOptions = [
  {
    id: 1,
    value: 'Option 1',
    label: 'Option 1',
  },
  {
    id: 2,
    value: 'Option 2',
    label: 'Option 2',
  },
  {
    id: 3,
    value: 'Option 3',
    label: 'Option 3',
  },
];

export const Default: Story = {
  render: (props) => {
    const [selectedOption, setSelectedOption] = React.useState(myOptions[0]);

    return (
      <Dropdown
        {...props}
        value={selectedOption}
        onOptionClick={handleOptionClick}
      >
        <Dropdown.Button>Dropdown</Dropdown.Button>
        <Dropdown.Options>
          {myOptions.map((option) => (
            <Dropdown.Option key={option.id} value={option}>
              {option.label}
            </Dropdown.Option>
          ))}
        </Dropdown.Options>
      </Dropdown>
    );

    function handleOptionClick(value: any) {
      setSelectedOption(value);
      console.log(`Selected Option: ${value.label}`);
      alert(`Selected Option: ${value.label}`);
    }
  },
};
