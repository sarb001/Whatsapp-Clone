
import React from 'react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Box,
    Input,
  } from '@chakra-ui/react'

const UpdateGroupmodel = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>  Update Here  </Button> 
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader> Modal Title </ModalHeader>
                  <ModalCloseButton />
                        <ModalBody>  
                          <Box>
                             <Input type = "text"  placeholder = 'Chat Name' />
                             <Button colorScheme = 'blue' mr={3} > Update </Button>
                             <Input type = "text"  placeholder = 'Add User to Group' />
                          </Box>
                        </ModalBody>
                  <ModalFooter>
                             <Button colorScheme='red' mr={3} > Leave Group  </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
    </>
  )
}

export default UpdateGroupmodel