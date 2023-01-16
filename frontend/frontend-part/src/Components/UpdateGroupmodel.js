
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
                            <div style = {{display:'grid',gridTemplateRows:'1fr 1fr',rowGap:'25px'}}> 
                                <span> 
                                <Input type = "text"  placeholder = 'Chat Name' />
                                <div style = {{padding:'12px'}}>
                                  <Button colorScheme = 'blue' mr={3} > Update </Button>
                                </div>
                                </span>
                                  <span> 
                                  <Input type = "text"  placeholder = 'Add User to Group' />
                                  <ModalFooter>
                                            <Button colorScheme='red' mr={3} > Leave Group  </Button>
                                </ModalFooter>
                                  </span>
                            </div>
                          </Box>
                        </ModalBody>
                </ModalContent>
            </Modal>
    </>
  )
}

export default UpdateGroupmodel
