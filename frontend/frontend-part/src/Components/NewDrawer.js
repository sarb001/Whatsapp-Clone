import React, { useContext, useState } from 'react';

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
    useToast,
  } from '@chakra-ui/react';
import UserListItem from './UserListItem';
import { Chatstate } from '../Context/ChatProvider';
import axios from 'axios';



const NewDrawer = () => {
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [search,setsearch] = useState();
  const { user ,setuser , selectedchats , setselectedchats , chats , setchats} = Chatstate();
  const [loading ,setloading]= useState(false);
  
 const [searchResult , setsearchresult] = useState([]);
 const toast = useToast();  
  

  const handlesearch = async() => {
    
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
  
    try {
      setloading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setloading(false);
      setsearchresult(data);

    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

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
            <Input  placeholder = 'Type here...'
            // value = {search} 
            onChange = {(e) => setsearch(e.target.value)} />
            <Button onClick = {handlesearch}> Go  </Button>
            {
              loading ? <h1> Loading..... </h1> : (
                searchResult?.map((user) => (
                  <UserListItem     // For Showing user with email and name like chatting user
                  user = {user}
                  key = {user._id}
                  />
                  ))
              )
            }
          
          </DrawerBody>
        </DrawerContent>
       </Drawer>
    </div>
  )
}

export default NewDrawer