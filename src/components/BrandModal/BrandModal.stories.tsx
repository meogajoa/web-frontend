import { Meta, StoryObj } from '@storybook/react';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';
import { BrandModal } from '~/components/BrandModal';
import { Button } from '~/components/Button';
import PasswordInputModal from './PasswordInputModal';

const meta: Meta<typeof BrandModal> = {
  title: 'Organisms/BrandModal',
  component: BrandModal,
  tags: ['autodocs'],
  argTypes: {
    className: {
      description: 'The class name of the modal.',
      control: 'text',
    },
  },
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en">
        <Story />
      </NextIntlClientProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof BrandModal>;

export const Default: Story = {
  render: (props) => {
    const [visible, setVisible] = React.useState(false);

    return (
      <>
        <Button onClick={handleClick(true)}>모달 열기 버튼</Button>

        <BrandModal
          {...props}
          onClose={handleClick(false)}
          hasBackdropBlur
          visible={visible}
        >
          <BrandModal.Header>
            <BrandModal.Title label="Title" />
            <BrandModal.CloseButton
              position="right"
              onClose={handleClick(false)}
            />
          </BrandModal.Header>

          <BrandModal.Body>모달 내용입니다.</BrandModal.Body>

          <BrandModal.ButtonGroup>
            <BrandModal.Button kind="no" onClick={handleClick(false)}>
              나가기
            </BrandModal.Button>
            <BrandModal.Button kind="yes" onClick={handleClick(false)}>
              남아있기
            </BrandModal.Button>
          </BrandModal.ButtonGroup>
        </BrandModal>
      </>
    );

    function handleClick(visible: boolean) {
      return () => setVisible(visible);
    }
  },
};

export const PasswordInput: Story = {
  render: () => {
    const [visible, setVisible] = React.useState(false);
    return (
      <>
        <button onClick={() => setVisible(true)}>모달 열기 버튼</button>
        <PasswordInputModal
          visible={visible}
          onClose={() => setVisible(false)}
        />
      </>
    );
  },
};
