import { useTranslations } from 'next-intl';
import React from 'react';
import { useForm } from 'react-hook-form';
import { BrandModal, BrandModalProps } from '~/components/BrandModal';
// import Input from '../../components/Input';

type Props = BrandModalProps;

const PasswordInputModal: React.FC<Props> = ({ onClose, visible }) => {
  const messages = useTranslations('passwordInputModal');
  const { register, handleSubmit } = useForm();

  return (
    <BrandModal
      onClose={onClose}
      hasBackdropBlur
      visible={visible}
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <BrandModal.Header>
        <BrandModal.Title label={messages('title')} />
        <BrandModal.CloseButton onClose={onClose} position="right" />
      </BrandModal.Header>

      <BrandModal.Body>
        <div>
          <label htmlFor="roomPassword">{messages('roomPasswordLabel')}</label>
          <input
            type="password"
            {...register('roomPassword', { required: true })}
          />
        </div>
      </BrandModal.Body>

      <BrandModal.ButtonGroup>
        <BrandModal.Button kind="no" onClick={onClose}>
          {messages('cancelButton')}
        </BrandModal.Button>

        <BrandModal.Button kind="yes" type="submit">
          {messages('createButton')}
        </BrandModal.Button>
      </BrandModal.ButtonGroup>
    </BrandModal>
  );
};

export default PasswordInputModal;
