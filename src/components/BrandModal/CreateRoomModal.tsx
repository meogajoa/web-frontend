import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BrandModal, BrandModalProps } from '~/components/BrandModal';
import { server } from '~/utils/axios';

type CreateRoomForm = {
  name: string;
  password: string;
};

const createRoomMutationFn = async (data: CreateRoomForm): Promise<unknown> => {
  return server.post('/room/create', data);
};

type Props = BrandModalProps;

const CreateRoomModal: React.FC<Props> = ({ onClose, visible }) => {
  const t = useTranslations('createRoomModal');
  const { register, handleSubmit } = useForm<CreateRoomForm>();

  const { mutate } = useMutation({
    mutationFn: createRoomMutationFn,
    onSuccess: () => {
      onClose();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit: SubmitHandler<CreateRoomForm> = (data) => {
    mutate(data);
  };

  return (
    <BrandModal
      onClose={onClose}
      hasBackdropBlur
      visible={visible}
      onSubmit={handleSubmit(onSubmit)}
    >
      <BrandModal.Header>
        <BrandModal.Title label={t('title')} />
        <BrandModal.CloseButton onClose={onClose} position="right" />
      </BrandModal.Header>

      <BrandModal.Body>
        <div>
          <label htmlFor="name">{t('roomNameLabel')}</label>
          <input type="text" {...register('name', { required: true })} />
        </div>
        <div>
          <label htmlFor="password">{t('roomPasswordLabel')}</label>
          <input
            type="password"
            {...register('password', { required: true })}
          />
        </div>
      </BrandModal.Body>

      <BrandModal.ButtonGroup>
        <BrandModal.Button kind="no" onClick={onClose}>
          {t('cancelButton')}
        </BrandModal.Button>

        <BrandModal.Button kind="yes" type="submit">
          {t('createButton')}
        </BrandModal.Button>
      </BrandModal.ButtonGroup>
    </BrandModal>
  );
};

export default CreateRoomModal;
