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
    Input,
    Box,
  } from '@chakra-ui/react'

const GroupChatmodel = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick = {onOpen}> New Group Chat + </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader> Create Group Chat  </ModalHeader>
                  <ModalCloseButton />
                        <ModalBody> 
                          <Box>
                            <span style = {{display:'grid',gridTemplateRows:'1fr 1fr',rowGap:'30px'}}>
                                <span> <Input type = "text" placeholder = 'Chat Name' />  </span>
                                <span> <Input type = "text" placeholder = 'Add Users e.g John,Arena' />  </span>
                            </span>
                          </Box>     
                        </ModalBody>
                  <ModalFooter>
                        <Button colorScheme='blue' mr={3} >   Create Chat    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
    </>
  )
}

export default GroupChatmodel