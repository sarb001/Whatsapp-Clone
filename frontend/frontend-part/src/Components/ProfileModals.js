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
import { Chatstate } from '../Context/ChatProvider';


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

          <Modal isOpen = {isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                      <ModalHeader
                      fontSize="20px" 
                      justifyContent="center" >
                       Profile Name here iss {user.name}
                         {console.log('name is',user.name)}
                         {console.log('name email',user.email)}
                      </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Image 
                      borderRadius="full" 
                      src = {user.pic} 
                      maxWidth="20px" />
                      {user.pic}
                <Text  fontSize={{base : '28px'}}>
                        Profile Email is here  : {user.email} 
                </Text> 
              </ModalBody>
            </ModalContent>
          </Modal>    
      </>
  )
}

export default ProfileModals