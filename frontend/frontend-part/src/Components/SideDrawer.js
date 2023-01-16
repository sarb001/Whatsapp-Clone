import { Avatar, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Input, Text, useDisclosure } from '@chakra-ui/react'
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

const SideDrawer = () => {

const { user } = Chatstate();
const [search ,setSearch] = useState();
const navigate = useNavigate();

const handleSearch = () => {

}

const logouthandler = () => {
  localStorage.removeItem('userinfo');
  navigate('/');
}

const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
        <Box>
      <div style = {{display:'grid',gridTemplateColumns:'200px 1fr 100px 100px',columnGap:'40px',padding:'1%'}}>

          <Button variant="ghost" onClick = {onOpen}>
                  <Text px  = "4"> Search User </Text>
                  <FcSearch />
          </Button>

          <Text fontSize='2xl'>  Talk-a-tive   </Text>
          <span>  <AiFillBell  size = "30px" /> </span>
          <div>

              {/* Dropdown Menu  */}
                    <Menu>
                        <MenuButton  as = {Button} rightIcon = {<AiOutlineArrowDown />}   >
                          <Avatar  
                          size = "sm" 
                          cursor="pointer" 
                          name = {user.name} 
                          src = {user.pic} />
                        </MenuButton>
                        <MenuList>
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
            <DrawerHeader borderBottomWidth="1px">  Search Users  </DrawerHeader>
          <DrawerCloseButton />
            <DrawerBody>
              <Box d="flex" pb={2}>
                <Input
                  placeholder = "Search by name or email"
                  mr={2}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick = {handleSearch}> Go </Button>
              </Box>
                  In the DrWER bODY  
            </DrawerBody>
          </DrawerContent>
        </Drawer>
         </>
  )
}

export default SideDrawer