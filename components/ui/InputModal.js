import { Modal, StyleSheet, Text, View } from 'react-native';
import Input from '../Auth/Input';
import Button from './Button';

const InputModal = ({ isVisible, onClose }) => {
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
              label="Title"
              // onUpdateValue={updateInputValueHandler.bind(this, 'email')}
              // value={}
              // isInvalid={}
            />
          </View>
          <Button onPress={onClose}>
            <Text>Close</Text>
          </Button>
          <Button onPress={onClose}>
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
