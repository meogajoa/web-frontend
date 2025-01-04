import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import BrandModal from '~/components/BrandModal';
import { Button } from '~/components/Button';

const meta: Meta<typeof BrandModal> = {
  title: 'Oranisms/BrandModal',
  component: BrandModal,
  tags: ['autodocs'],
  args: {
    className: '',
  },
  argTypes: {
    className: {
      description: 'The class name of the modal.',
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof BrandModal>;

export const Default: Story = {
  args: {
    className: '',
  },
  render: (props) => {
    const [visible, setVisible] = React.useState(false);

    return (
      <>
        <Button onClick={() => setVisible(true)}>모달 열기 버튼</Button>

        <BrandModal
          {...props}
          onClose={() => setVisible(false)}
          hasBackdropBlur
          visible={visible}
        >
          <BrandModal.Header>
            <BrandModal.Title label="Title" />
            <BrandModal.CloseButton position="right" />
          </BrandModal.Header>

          <BrandModal.Body>모달 내용입니다.</BrandModal.Body>

          <BrandModal.ButtonGroup>
            <BrandModal.Button kind="no">나가기</BrandModal.Button>
            <BrandModal.Button kind="yes">남아있기</BrandModal.Button>
          </BrandModal.ButtonGroup>
        </BrandModal>
      </>
    );
  },
};
