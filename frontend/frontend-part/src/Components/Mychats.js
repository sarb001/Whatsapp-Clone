import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Chatstate } from '../Context/ChatProvider'
import ChatLoading from './ChatLoading';
import CreateGroupchatmodel from './CreateGroupchatmodel';
import { getSender } from './getSender';

const Mychats = ({fetchagain}) => {

const { user,setuser , selectedchats , setselectedchats , chats , setchats } = Chatstate();
const [loggeduser ,setloggeduser] = useState();
const [loadingchat ,setLoadingchat] = useState(false);

 const toast = useToast();

  const fetchchats = async() => {

      try{

        setLoadingchat(true);
        const config = {
          headers : {
              Authorization : `Bearer ${user.token}`,
             }
            }
    
          const { data } = await axios.get(`/api/chat` , config);
          console.log('diff create chats are -' , data);
          setchats(data);
      }catch(error)
      {
        toast({
          title: "Error fetching the chat",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
       }
      }

      useEffect(() => {
        setloggeduser(JSON.parse(localStorage.getItem('userinfo')));
        fetchchats();         // fetchchats once when component Renders 
      },[]);

  return (
    <div> 
         <Box d = {{base : selectedchats ? "none" :"flex" }} 
         alignItems= "center" 
         p ={3} 
         bg = "white" 
         borderRadius="lg">

          <Box style = {{display:'grid',gridTemplateColumns:'1fr 1fr',paddingBottom:'4%'}}>
                   <span style = {{fontSize:"23px"}}> My chats  </span> 
                   <span> <CreateGroupchatmodel />   </span>
          </Box>  
            <Box  overflowY = "hidden">
                   {chats ? (
                   <Stack overflowY = "scroll" height="70vh">
                       {
                        chats.map((chat) => (
                        <Box  onClick = {() => setselectedchats(chat)} 
                        cursor = "pointer"
                        backgroundColor= {selectedchats === chat ? "#38B2AC" : "#E8E8E8"}
                        color={selectedchats === chat ? "white" : "black"}
                        px={3}
                        py={2}
                        borderRadius = "lg"
                        key={chat._id}>
                          <Text>

                                {/* if not grp chat then show name as sender
                                if grp chat then grp chst name is shown    */}
                              {!chat.isGroupChat ? getSender(loggeduser,chat.users) : chat.chatName}
                          </Text>
                        </Box> ))
                       }   
                   </Stack>
                   ) : (<>
                   <Box style = {{height:'60vh',backgroundColor:'white'}}>
                    <h1> Chats not Present or Showing  </h1>
                   </Box>
                     </>
                   )}
            </Box>
          </Box>
    </div> 
  )
   }

export default Mychats