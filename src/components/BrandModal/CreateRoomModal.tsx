import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BrandModal, BrandModalProps } from '~/components/BrandModal';
import { server } from '~/utils/axios';
type Props = BrandModalProps;

type CreateRoomForm = {
  roomName: string;
  password: string;
};

const createRoomMutationFn = async (data: CreateRoomForm): Promise<any> => {
  return server.post('/room/create', { ...data, roomMaxUser: 8 });
};

const CreateRoomModal: React.FC<Props> = ({ onClose, visible }) => {
  const messages = useTranslations('createRoomModal');
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
        <BrandModal.Title label={messages('title')} />
        <BrandModal.CloseButton onClick={onClose} position="right" />
      </BrandModal.Header>

      <BrandModal.Body>
        <div>
          <label htmlFor="roomName">{messages('roomNameLabel')}</label>
          <input type="text" {...register('roomName', { required: true })} />
        </div>
        <div>
          <label htmlFor="roomPassword">{messages('roomPasswordLabel')}</label>
          <input
            type="password"
            {...register('password', { required: true })}
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

export default CreateRoomModal;
