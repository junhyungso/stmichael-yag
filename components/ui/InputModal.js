import { useContext } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { ModalContext } from '../../store/modal-context';
import Input from '../Auth/Input';
import Button from './Button';

const InputModal = ({ isVisible, onClose, onPublish }) => {
  const modalCtx = useContext(ModalContext);

  return (
    <Modal
      animationType="slide" // Or 'fade' or 'none'
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View>
            <Input
              label="Title: "
              onUpdateValue={modalCtx.setNewTitleInput()}
              value={modalCtx.newTitleInput}
              isInvalid={false}
            />
          </View>
          <View>
            <Input
              label="Description"
              textInputConfig={{
                multiline: true,
                onChangeText: modalCtx.setNewDescriptionInput((input) => input),
                value: modalCtx.newTitleInput,
              }}
            />
          </View>
          <Button onPress={onClose}>
            <Text>Close</Text>
          </Button>
          <Button onPress={onPublish}>
            <Text>Publish</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default InputModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
});
