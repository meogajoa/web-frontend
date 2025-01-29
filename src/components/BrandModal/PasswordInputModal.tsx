import { useTranslations } from 'next-intl';
import React from 'react';
import { useForm } from 'react-hook-form';
import { BrandModal, BrandModalProps } from '~/components/BrandModal';
import { Input } from '~/components/Input';

type Props = BrandModalProps;

const PasswordInputModal: React.FC<Props> = ({ onClose, visible }) => {
  const messages = useTranslations('passwordInputModal');
  const { register, handleSubmit } = useForm();
  const [password, setPassword] = React.useState('');

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
        <div className="mb-5.5 flex flex-col items-center justify-center">
          <label htmlFor="roomPassword" className="mb-1 mt-3 text-red">
            {messages('roomPasswordLabel')}
          </label>
          <Input
            type="password"
            value={password}
            onValueChange={(value) => setPassword(value)}
            {...register('roomPassword')}
          />
        </div>
      </BrandModal.Body>

      <BrandModal.ButtonGroup>
        <BrandModal.Button kind="no" onClick={onClose}>
          {messages('cancelButton')}
        </BrandModal.Button>

        <BrandModal.Button kind="yes" type="submit">
          {messages('completeButton')}
        </BrandModal.Button>
      </BrandModal.ButtonGroup>
    </BrandModal>
  );
};

export default PasswordInputModal;
