import { Button, Modal, ModalBody, ModalCloseButton, 
ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react';

const Profilebar = ({user}) => {
  const { isOpen, onOpen, onClose } = useDisclosure(); 

  return (
    <div>
        <Button onClick={onOpen}> Profile  </Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>  Modal Title  </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              <Text > Email - {user.email} </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Profilebar