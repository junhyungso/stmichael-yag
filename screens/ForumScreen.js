import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import InputModal from '../components/ui/InputModal';
import { ModalContext } from '../store/modal-context';

const ForumScreen = () => {
  const modalCtx = useContext(ModalContext);

  const onModalClose = () => {
    modalCtx.closeModal();
  };

  const onModalPublish = () => {
    modalCtx.closeModal();
  };

  return (
    <View>
      <Text>List of Forums</Text>
      {modalCtx.modalStatus && (
        <InputModal
          isVisible={modalCtx.modalStatus}
          onClose={onModalClose}
          onPublish={onModalPublish}
        />
      )}
    </View>
  );
};

export default ForumScreen;
