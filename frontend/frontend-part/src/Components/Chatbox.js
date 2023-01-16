import { Box, Button, Stack, Text, useToast, VStack } from '@chakra-ui/react';
import React  , { useEffect, useState } from 'react';
import { Chatstate } from '../Context/ChatProvider';
import { getSender } from './getSender';
import axios from 'axios';
import CreateGroupchatmodel from './CreateGroupchatmodel';


const Chatbox = ({fetchagain}) => {

 const {user ,setuser , selectedchats ,
  setselectedchats , chats , setchats}  =  Chatstate();
  const [loggeduser,setloggeduser] = useState();
  const toast = useToast();

  //Fetch all Chats from Group 
  const fetchchats = async () => {
    try{
      const config = {            // verified user with access 
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get('/api/chat',config);     // get all 
      setchats(data);
      console.log(data);

    }catch(error)
    { 
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }

  useEffect(() => {
      setloggeduser(JSON.parse(localStorage.getItem('userinfo')))
      fetchchats();
  },[])

  return (
    <div>
          <div className = "top-side" style = {{display:'grid',gridTemplateColumns:'1fr 1fr'}}>
            <span> My Chats   </span>
            <span>  <CreateGroupchatmodel  />  </span>   
          </div>
          <div className = "users-display" style = {{paddingTop:'30px'}}>
             <div className = "user-count">
              <span style = {{fontSize:"25px",backgroundColor:'lightblue',width:'100%'}}>  
              
              {chats  ? (
                <Stack overflowY ="scroll">
                    {chats.map((chat) => (
                      <Box onClick={() => setselectedchats(chat)}
                      cursor = "pointer" 
                      bg = {selectedchats == chat ? "#38B2AC" : "#E8E8E8"}
                      color = {selectedchats == chat ? "white" : "black"} 
                      px = {3} 
                      py = {2} 
                      key = {chat._id} >
                        <Text > {!chat.isGroupchat ? getSender(loggeduser , chat.users) :chat.chatName } </Text>
                      </Box>
                    ))}
                </Stack>
              ) : (<h1>  No User Present  </h1>)}
              </span>
          </div>
             </div>
    </div>
  )
}

export default Chatbox