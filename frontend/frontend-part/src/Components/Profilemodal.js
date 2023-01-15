import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'

const Profilemodal = ({user}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div> 
         <Button onClick = {onOpen}>  Bio </Button>
            <Modal isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset='slideInBottom' >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>  Details of User  </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text> Email - {user.email}  </Text>
                    <Text> User Name  - {user.name}  </Text>
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

export default Profilemodal