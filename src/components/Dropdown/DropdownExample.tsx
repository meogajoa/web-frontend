import React from 'react';
import { Dropdown } from '~/components/Dropdown';
import { cn } from '~/utils/classname';

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

type Props = {
  className?: React.ComponentProps<'button'>['className'];
};

const DropdownExample: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  const [selectedOption, setSelectedOption] = React.useState(myOptions[0]);

  return (
    <Dropdown value={selectedOption} onOptionClick={handleOptionClick}>
      <Dropdown.Button className={cn('', className)}>
        {children}
      </Dropdown.Button>
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
};

export default DropdownExample;
