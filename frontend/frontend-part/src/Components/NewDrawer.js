import React from 'react';

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Input,
    useDisclosure,
  } from '@chakra-ui/react';

const NewDrawer = () => {
  
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div>   
        <Button  colorScheme='teal' onClick={onOpen}> Open  </Button>
        <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose} >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>  Search for Users here   </DrawerHeader>

          <DrawerBody>
            <Input  placeholder='Type here...' />
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
       </Drawer>
    </div>
  )
}

export default NewDrawer