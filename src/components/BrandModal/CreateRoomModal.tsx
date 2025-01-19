import { useTranslations } from 'next-intl';
import React from 'react';
import { useForm } from 'react-hook-form';
import { BrandModal, BrandModalProps } from '~/components/BrandModal';
import { useCreateRoomMutation } from '~/hooks/room';
import { useRouter } from '~/i18n/routing';
import type { CreateRoomForm, CreateRoomResponse } from '~/types/room';

type Props = BrandModalProps;

const CreateRoomModal: React.FC<Props> = ({ onClose, visible }) => {
  const t = useTranslations('createRoomModal');
  const router = useRouter();
  const { register, handleSubmit } = useForm<CreateRoomForm>();
  const { createRoom } = useCreateRoomMutation({
    onSuccess: handleRedirectOnSuccess,
  });

  return (
    <BrandModal
      onClose={handleClose}
      hasBackdropBlur
      visible={visible}
      onSubmit={handleSubmit(onSubmit)}
    >
      <BrandModal.Header>
        <BrandModal.Title label={t('title')} />
        <BrandModal.CloseButton onClose={handleClose} position="right" />
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
        <BrandModal.Button kind="no" onClick={handleClose}>
          {t('cancelButton')}
        </BrandModal.Button>

        <BrandModal.Button kind="yes" type="submit">
          {t('createButton')}
        </BrandModal.Button>
      </BrandModal.ButtonGroup>
    </BrandModal>
  );

  function onSubmit(data: CreateRoomForm): void {
    createRoom(data);
  }

  function handleClose() {
    onClose();
  }

  function handleRedirectOnSuccess({ id }: CreateRoomResponse) {
    router.push(`/room/${id}`);
  }
};

export default CreateRoomModal;
