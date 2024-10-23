import { createContext, useState } from 'react';

export const ModalContext = createContext({
  newTitleInput: '',
  setNewTitleInput: () => {},
  newDescriptionInput: '',
  setNewDescriptionInput: () => {},
  modalStatus: false,
  openModal: () => {},
  closeModal: () => {},
});

const ModalContextProvider = ({ children }) => {
  const [modalStatus, setModalStatus] = useState(false);
  const [newTitleInput, setNewTitleInput] = useState('');
  const [newDescriptionInput, setNewDescriptionInput] = useState('');

  const openModal = () => {
    setModalStatus(true);
  };

  const closeModal = () => {
    setModalStatus(false);
  };

  const value = {
    newTitleInput: newTitleInput,
    setNewTitleInput: setNewTitleInput,
    newDescriptionInput: newDescriptionInput,
    setNewDescriptionInput: setNewDescriptionInput,
    modalStatus: modalStatus,
    openModal: openModal,
    closeModal: closeModal,
  };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export default ModalContextProvider;
