import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Image,
  Text,
} from '@chakra-ui/react';
import { BsFillEyeFill } from 'react-icons/bs';


const ProfileModals = ({user,children}) => {
 
   const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      {/*  If Profile Modal has any child or exists (something inside it ) then show  */}
       {children ? 
        (  
          <span onClick = {onOpen}>  {children} </span>
        ) : 
        (<> 
           <BsFillEyeFill  onClick = {onOpen}  />
        </>)}

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                      <ModalHeader
                      fontSize="20px" 
                      justifyContent="center" >
                         Name is -  {user.name}
                      </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Image 
                      borderRadius="full" 
                      src = {user.pic} 
                      alt = {user.name} 
                      maxWidth="30px" />
                <Text  fontSize={{base : '28px'}}>
                         Email : {user.email} 
                </Text> 
              </ModalBody>
            </ModalContent>
          </Modal>    
      </>
  )
}

export default ProfileModals