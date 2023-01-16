import React  ,  { useState } from 'react';

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
  useToast,
  Box,
  Input,
} from '@chakra-ui/react';

import axios from 'axios';
import UserListItem from './UserListItem';
import UserBadgeitem from './UserBadgeitem';
import { warning } from '@remix-run/router';
import { Chatstate } from '../Context/ChatProvider';

const CreateGroupchatmodel = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [search,setSearch] = useState("");
    const [selectedusers , setselectedusers] = useState([]);
    const [groupchatname,setgroupchatname] = useState();
    const [loading ,setloading] = useState(false);
    const [searchResult ,setsearchResult] = useState([]);

    const {  user , chats ,setchats } = Chatstate();

    const toast = useToast();

// Search Query for Users 
    const handlesearch = async(query) => {
      setSearch(query);
      if (!query) {           // if Query is not Found 
          return;
      }

      try {
          setloading(true);
          const config = {            
          headers: {
              Authorization: `Bearer ${user.token}`,
          },
          };
          // Get data by Typing in searchbar of Model
          const { data } = await axios.get(`/api/user?search=${search}`, config);
          console.log(data);
          setloading(false);
          setsearchResult(data);

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
  }

  // click on selectedchat and user will be added
  const clicktoaddgrp = (usertoadd) => {

      //if user is  already present 
    if(selectedusers.includes(usertoadd))
    {
      toast({
          title: "User already added",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
      });
      return;
    }
     // if new get all the selected and add new user 
    setselectedusers([...selectedusers, usertoadd]);
  }

  // cross sign (Delete icon along with chits used to delete )
  const handleDelete = (deluser) => {
     setselectedusers(selectedusers.filter((sel) => sel._id !== deluser._id))
  }

    // Now chat name changed 
    // users added 
    // Now Submit all in db and Implement Changes 
   const handlesubmit = async () => 
   {
         if(!groupchatname || !selectedusers)
         {
            toast({
              title: " Please Fill all the Fields ",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "top",
          })
          return;
         }
            try
            {  
                const config = {
                        headers : {
                          Authorization : ` Bearer ${user.token} `
                        }
                  };

                  const {data} = await axios.post('/api/chat/group' ,
                  {
                      name: groupchatname,
                      users:JSON.stringify(selectedusers.map((u) => u._id))
                  },
                  config);

                  setchats([data,...chats]);
                  onClose()
                  toast({
                    title: " New Group Chat Created " ,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                  })
            }
            catch(error)
            {
                  toast({
                    title: " Failed to Create the Chat ",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                })
            }
  } 

  return (
    <div>
      <Button onClick={onOpen}> Create Group chat + </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Modal Title  </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
                               <Box>
                                 <div style = {{display:'grid',gridTemplateRows:'1fr 1fr',rowGap:'30px'}}>
                                     <span> <Input type = "text" placeholder = 'Chat Name'  
                                    onChange = {(e) => setgroupchatname(e.target.value)}  />  </span>
                                    <span> <Input type = "text" placeholder = 'Add Users e.g John,Arena' 
                                    onChange = {(e) => handlesearch(e.target.value)} />  </span>
                                </div>
                              </Box>  

                                {/* Show Selected User in icons chits  */}
                                  <Box>
                                      {selectedusers.map((u) => (
                                        <UserBadgeitem      // only for name showing   
                                        key = {u._id} 
                                        user = {u} 
                                        handlefunction = {() => handleDelete(u)} />
                                      ))}
                                  </Box>
            {/* /*  Render on Screen  */}
                              {loading ? (<> Loading ...... </>) :
                              ( searchResult?.slice(0,4).map((user) => (
                                  <UserListItem                // show all details 
                                    key = {user._id} 
                                    user = {user} 
                                    handlefunction = {() => clicktoaddgrp(user)}   />
                              )))
                              }   
         </ModalBody>
        <ModalFooter>  <Button  mr = {3}  onClick = {handlesubmit}>   Create Chat    </Button>
                   </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default CreateGroupchatmodel