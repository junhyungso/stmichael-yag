import { createContext, useState } from 'react';

export const ModalContext = createContext({
  modalStatus: false,
  openModal: () => {},
  closeModal: () => {},
});

const ModalContextProvider = ({ children }) => {
  const [modalStatus, setModalStatus] = useState(false);

  const openModal = () => {
    setModalStatus(true);
  };

  const closeModal = () => {
    setModalStatus(false);
  };

  const value = {
    modalStatus: modalStatus,
    openModal: openModal,
    closeModal: closeModal,
  };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export default ModalContextProvider;
