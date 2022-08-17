import React, { useContext, useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

const ModalContext = React.createContext();

export function useModal() {
  return useContext(ModalContext);
}

export default function ModalProvider({ children }) {
  function useModalDisclosure() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isModalOpen = () => {
      return isOpen;
    };
    const closeModal = () => {
      return onClose;
    };
    const openModal = () => {
      return onOpen;
    };
    return {
      openModal,
      closeModal,
      isModalOpen,
    };
  }

  const modal = useModalDisclosure();
  const value = { modal }

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}
