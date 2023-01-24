import { Avatar, Box, Button, Drawer, DrawerBody,
   DrawerCloseButton, DrawerContent, DrawerHeader,
    DrawerOverlay, Input, Text, Toast, 
    useDisclosure, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import {FcSearch} from 'react-icons/fc';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react';

import { BellIcon } from '@chakra-ui/icons';
import { AiOutlineArrowDown ,AiFillBell  } from 'react-icons/ai';
import { Chatstate } from '../Context/ChatProvider';
import ProfileModals from './ProfileModals';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserListItem from './UserListItem';
import ChatLoading from './ChatLoading';
const SideDrawer = () => {

const { user ,selectedchats , setselectedchats  ,chats ,setchats } = Chatstate();
const [search ,setSearch] = useState("");
const [searchResult , setSearchResult] = useState([]);
const [loading ,setLoading] = useState(false);
const [loadingchat ,setLoadingchat] = useState(false);
const navigate = useNavigate();
const toast = useToast();

const handleSearch = async () => {
    if(!search)
    {
        toast({
          title : 'Please Enter something in Search....',
          status : 'warning',
          duration: 5000,
          isClosable: true,
          position: "top-left",
        });
        return;
    }

    try
    {
          setLoading(true);
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
    
          const { data } = await axios.get(`/api/user?search=${search}`, config);
    
          setLoading(false);
          setSearchResult(data);
    }catch(error)
    {
      toast({
        title: "Error Occured!dddddd......",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
}

const logouthandler = () => {
  localStorage.removeItem('userinfo');
  navigate('/');
}

// Accessing all chats 
// So can do anything with this
const accesschat = async (userid) => {

  try{

    setLoadingchat(true);
    const config = {
      headers : {
         "Content-type"  : "application/json",
          Authorization : `Bearer ${user.token}`,
      },
    }

    const { data } = await axios.post(`/api/chat` , {userid} , config);

      if(!chats.find((c) => c._id === data._id)) setchats([data,...chats]);

     setselectedchats(data);
     setLoadingchat(false);
     onClose();

  }catch(error)
  {
    toast({
      title: "Error fetchhhhhh ....  chat",
      description: error.message,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom-left",
    });
  }

}  

const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
              <Box>
            <div style = {{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',padding:'8px',}}>
                <span>
                    <Button variant="ghost" onClick = {onOpen} >
                            <Text px  = "4"> Search User </Text>
                            <FcSearch />
                    </Button>
                </span>

                <span style = {{textAlign:'center'}}>
                  <Text fontSize='2xl'>  Chatties  </Text>
                </span>
                {/* <span>  <AiFillBell  size = "30px" /> </span> */}

                <div style = {{textAlign:'center'}}>
                    {/* Dropdown Menu  */}
                          <Menu>
                              <MenuButton  as = {Button} rightIcon = {<AiOutlineArrowDown />}   >
                                <Avatar  
                                cursor="pointer" 
                                name = {user.name} 
                                src = {user?.pic} />
                              </MenuButton>
                              <MenuList>
                                {console.log('chat state' , user)}
                                <ProfileModals  user = {user}>
                                    <MenuItem>   My Profile  </MenuItem> {"  "} 
                                </ProfileModals>
                                <MenuDivider />
                                <MenuItem onClick = {logouthandler}> Logout  </MenuItem>
                              </MenuList>
                          </Menu>
                </div>
            </div>
              </Box>

        {/*  id is Referred to button search above  */}
        <Drawer placement = "left" onClose={onClose} isOpen={isOpen}>   
          <DrawerOverlay />
          <DrawerContent>
            <span style  = {{backgroundColor:'#008069',color:'white'}}>
            <DrawerHeader borderBottomWidth="1px">  Search Users  </DrawerHeader>
            <DrawerCloseButton />
            </span>
            <DrawerBody>
              <Box style = {{display:'grid',gridTemplateColumns:'1fr 50px',columnGap:'15px'}}>
                <Input
                  placeholder = "Search by name or email"
                  mr={2}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick = {handleSearch} style = {{backgroundColor:'#008069',color:'white'}}> Go </Button>
              </Box>
              <span style = {{paddingTop:'5%'}}>

                 { loading ? 
                 (<> 
                 <Box> <ChatLoading />  </Box>
                 </>) :
                 (
                   searchResult?.map((user) => (
                     <UserListItem  
                     key =  {user._id} 
                     user = {user}  
                     handlefunction = {() => accesschat(user._id)} />
                     ))
                     ) }
              </span>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
         </>
  )
}

export default SideDrawer