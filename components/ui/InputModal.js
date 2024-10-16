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
              label="Title: "
              onUpdateValue={() => {}}
              value={''}
              isInvalid={false}
            />
          </View>
          <View>
            <Input
              label="Description"
              z
              textInputConfig={{
                multiline: true,
                onChangeText: () => {},
                value: '',
              }}
              // invalid={!inputs.description.isValid}
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
