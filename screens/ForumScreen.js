import React, { useContext, useState } from 'react';
import { Text, View } from 'react-native';
import InputModal from '../components/ui/InputModal';
import { ModalContext } from '../store/modal-context';

const ForumScreen = () => {
  const [newTitleInput, setNewTitleInput] = useState('');
  const [newDescriptionInput, setNewDescriptionInput] = useState('');

  const modalCtx = useContext(ModalContext);

  const onModalClose = () => {
    modalCtx.closeModal();
  };

  const onModalPublish = () => {
    modalCtx.closeModal();
  };

  if (modalCtx.modalStatus) {
    return (
      <InputModal
        isVisible={modalCtx.modalStatus}
        onClose={onModalClose}
        onPublish={onModalPublish}
      />
    );
  }

  return (
    <View>
      <Text>List of Forums</Text>
    </View>
  );
};

export default ForumScreen;
