import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import InputModal from '../components/ui/InputModal';
import { ModalContext } from '../store/modal-context';

const EventsScreen = () => {
  const modalCtx = useContext(ModalContext);

  const onModalClose = () => {
    modalCtx.closeModal();
  };
  if (modalCtx.modalStatus) {
    return (
      <InputModal isVisible={modalCtx.modalStatus} onClose={onModalClose} />
    );
  }

  return (
    <View>
      <Text>List of Events</Text>
    </View>
  );
};

export default EventsScreen;
