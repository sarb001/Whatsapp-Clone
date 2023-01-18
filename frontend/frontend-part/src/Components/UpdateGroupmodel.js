
import React, { useState } from 'react';

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
    useToast,
    Spinner,
    FormControl,
  } from '@chakra-ui/react'
import { Chatstate } from '../Context/ChatProvider';
import axios from 'axios';
import UserBadgeitem from './UserBadgeitem';
import UserListItem from './UserListItem';

const UpdateGroupmodel = ({fetchagain ,setfetchagain}) => {

     const {user ,selectedchats , setselectedchats} = Chatstate();
     const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupchatname,setgroupchatname] = useState();
    const [renameloading, setRenameLoading] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [search,setSearch] = useState("");
    const [loading, setloading] = useState(false);
    
       const toast = useToast();

      // // Adding new user to Group 
      //  const handleaddUser = async (user1) => {

      //   console.log('Inside adder ')

      //   //  if (Users already present in chits  ===  while searching selected user id )
      //   if(selectedchats.users.find((u) => u._id === user1._id))
      // {
      //   toast({
      //     title : "User already Present in Group!!",
      //     status: "error",
      //     duration: 5000,
      //     isClosable: true,
      //     position: "bottom",
      //   })
      //   }

      // // Selected chat's groupadmin !== logged user id 
      // if(selectedchats.groupAdmin._id !== user._id)
      // {
      //   toast({
      //     title : " Only admins can add Someone!!!!",
      //     status: "error",
      //     duration: 5000,
      //     isClosable: true,
      //     position: "bottom",
      //   });
      //   return;
      //   }

      //   try{
      //      setloading(true);
      //     const config = {
      //       headers : {
      //          Authorization: `Bearer ${user.token}`,
      //       },
      //     };

      //     const  { data } = await axios.put(`/api/chat/groupadd`,
      //     {
      //       chatid : selectedchats._id,
      //       userid : user1._id,
      //     },
      //     config);

      //     setselectedchats(data);
      //     setfetchagain(!fetchagain);
      //     setloading(false);

      //   }catch(error)
      //   {
      //     toast({
      //       title: "Error Occured!",
      //       status: "error",
      //       duration: 5000,
      //       isClosable: true,
      //       position: "bottom",
      //     });
      //     setloading(false);
      //   } 
      //   setgroupchatname(" ");
      //   };


     // Rename by Clicking on the Button Update and show 
       const handleRename = async () => {
        if(!groupchatname) return ;

        try{
          setRenameLoading(true);

          const config = {
            headers : {
                Authorization : `Bearer ${user.token}`,
            }
        };

        const { data } = await  axios.put('/api/chat/rename' , 
        {
            chatid : selectedchats._id,
            chatName : groupchatname,
        },config);

        setselectedchats(data);
        setfetchagain(!fetchagain);
        setRenameLoading(false);

        }catch(error)
        {
          toast({
            title: "Error Occured!",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setRenameLoading(false);
        }
        setgroupchatname("");       // clear the Chat 
        }

        // remove the user Particular  
           const handleremovegroup = async (user1) => {
          if(selectedchats.groupAdmin._id !== user._id)
          {
            toast({
              title: "Only admins can remove someone!",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            return;
          }

          try{

            setloading(true);
            const config = {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            };
            const { data } = await axios.put(
              `/api/chat/groupremove`,
              {
                chatid: selectedchats._id,
                userid: user1._id,
              },
              config
            );
      
            user1._id === user._id ? setselectedchats() : setselectedchats(data);  
             // update the chats if not Present then show nothing 
            setfetchagain(!fetchagain);
            setloading(false);

          }catch(error)
          {
            toast({
              title: "Error Occured!",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            setloading(false);
          }
          setgroupchatname("");
          } 
        

        //   // search query  
        // const handleSearch = async (query) => {
        //   setSearch(query);
        //   if(!query) return;

        //   try{

        //     setloading(true);
        //     const config = {
        //       headers : {
        //         Authorization : `Bearer ${user.token}`
        //       }
        //     }

        //     const  { data } = await axios.get(`/api/user?search=${search}`,config);
        //     setloading(false);
        //     setSearchResult(data);

        //   }catch(error)
        //   {
        //     toast({
        //       title: "Error Occured!",
        //       description: "Failed to Load the Search Results",
        //       status: "error",
        //       duration: 5000,
        //       isClosable: true,
        //       position: "bottom-left",
        //       });
        //   }
        // }


  return (
    <>
      <Button onClick = {onOpen}>  Update Here  </Button> 
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader> Header -- {selectedchats.chatName} </ModalHeader>
                  <ModalCloseButton />
                        <ModalBody>  
                          <Box>
                            { selectedchats.users.map((u) => (
                                  <UserBadgeitem 
                                  key = {u._id} 
                                  user = {u}  />
                            ))}
                            <div style = {{display:'grid',gridTemplateRows:'1fr 1fr',rowGap:'25px'}}> 
                                    {/* Form is Present here  */}
                                
                                    <FormControl>
                                      <Input type = "text"  placeholder = 'Chat Name'  
                                        value = {groupchatname}
                                        onChange = {(e) => setgroupchatname(e.target.value)} />

                                      <div style = {{padding:'12px'}}>
                                        <Button colorScheme = 'blue' mr={3} 
                                        onClick = {handleRename} > Update </Button>
                                      </div>
                                    </FormControl>
                               
                               {/* <FormControl>
                                      <Input type = "text"  placeholder = 'Add User to Group' 
                                        onChange = {(e) => handleSearch(e.target.value)}  />
                               </FormControl> */}


                                      {/* {loading ? (<Spinner size = "lg" />) 
                                      :  ( searchResult?.map((user) => (
                                            <UserListItem                   // show all details 
                                                key = {user._id} 
                                                user = {user} 
                                                handlefunction = {() => handleaddUser(user)} />
                                          )))
                                        }    */}
                                      <ModalFooter>
                                                <Button colorScheme='red' mr={3} 
                                                onClick ={() => handleremovegroup(user)}
                                                > Remove Group  </Button>
                                     </ModalFooter>
                            </div>
                          </Box>
                        </ModalBody>
                </ModalContent>
            </Modal>
    </>
  )
}


export default UpdateGroupmodel
