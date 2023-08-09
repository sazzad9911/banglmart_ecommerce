import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

export default function ModalLayout({
  component,
  modal,
  modalTitle,
  modalFooter,
  isOpen,
  onClose,
}) {
  return (
    <div className="h-full w-full p-4 ">
      {component}
      <Modal size={"6xl"} colorScheme="blue" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="w-[50vw]">
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modal}</ModalBody>

          <ModalFooter>{modalFooter}</ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
