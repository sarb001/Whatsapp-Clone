import React, { useState } from 'react';

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

  const [search,setsearch] = useState();
  

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
            <Input  placeholder = 'Type here...' />
          </DrawerBody>
        </DrawerContent>
       </Drawer>
    </div>
  )
}

export default NewDrawer