import { Box, FormControl, Input, Spinner, Text, Toast, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Chatstate } from '../Context/ChatProvider';
import { getSenderFull } from './getSender';
import ProfileModals from './ProfileModals';
import UpdateGroupmodel from './UpdateGroupmodel';

const Singlechat = ({fetchagain , setfetchagain}) => 
{
    const [loading ,setloading] = useState(false);
    const { user ,selectedchats , setselectedchats } = Chatstate();

    const [messages ,setMessages] = useState([]);
    const [newMessage ,setnewMessage] = useState();       // value = {newMessage} first // Second value  

     const toast = useToast();

      // Send Message on Pressing Enter 
     const sendMessage = async (event) => {
        if(event.key === "Enter" && newMessage)
        {
            try{
              const config = {
                headers : {
                  "Content-Type" :'application/json',
                  Authorization : `Bearer ${user.token}`,
                },
              };

              setnewMessage("");
              const  {data}  = await  axios.post('/api/message' , {
                  chatid : selectedchats._id,
                  content : newMessage,
              },config);

              console.log('data is ',data);
              setMessages([...messages,data]);

            }catch(error)
            {
              toast({
                title: 'Error Occured!!1',
                status : 'error',
                duration : 5000,
                isClosable: true,
                position:'bottom'
              })
            }
        }  
     }

      // Fetch or Load all  Sent Messages 
      const fetchmessage = async() => {
        if (!selectedchats) return;

         try {
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
    
          setloading(true);
    
          const { data } = await axios.get(
            `/api/message/${selectedchats._id}`,
            config
          );
           console.log('fetch msg',data);
          setMessages(data);
          setloading(false);
          }
          catch(error)
          {
            toast({
              title: "Error Occured!",
              description: "Failed to Load the Messages",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
          }
      }

     // Typing Logic can be Animation 
     const typinghandler = (e) => {
       setnewMessage(e.target.value);
     };

     useEffect(() => {
        fetchmessage();        // fetch all messages at Once 
     },[selectedchats])       // Also fetch when diff chat is  Selected 

  return (
    <div> 
         {/* If chat is  selected then  */}
       {selectedchats ? (
       <> 
            <Box style = {{padding:'2%'}}>
                  {!selectedchats.isGroupChat ? (
                    <div style = {{display:'grid',gridTemplateColumns:'1fr 100px',padding:'2%'}}> 
                        {/*  For Selecting single user and show name only  */}
                        <span>   {selectedchats.users[1].name }  </span>   
                            {/*  Get Full Details of user at current time (( By clicking on the modal eye  )) */}
                        <span>     <ProfileModals user = {getSenderFull(user,selectedchats.users)} /> </span>

                    </div>
                  ) : ( // For Group chat  get the name 
                  <div style = {{display:'grid',gridTemplateColumns:'1fr 100px',padding:'2%'}}>
                        <h1>  {selectedchats.chatName.toUpperCase()}  </h1>
                      <span>  <UpdateGroupmodel 
                               fetchagain = {fetchagain } 
                               setfetchagain = {setfetchagain}  />
                    </span>  
                  </div>)}
            </Box>

              <Box width="100" height="100%">
                     {/* Messages here in Box  */}
                     {loading ? (
                      <>
                            <Spinner 
                            size="xl" 
                            w = "20" 
                            h = "20" 
                            alignSelf ="center" 
                            margin = "auto" />
                      </>) : 
                     (<>
                       in the box 
                     </>)}
                     <FormControl onKeyDown = {sendMessage}  isRequired>
                      <Input type = "text" placeholder = 'Type your messages....' 
                        onChange = {typinghandler} 
                        value  = {newMessage} />
                     </FormControl>
              </Box>      

       </>) : 
       (
            <Box  display = "flex" alignItems="center" justifyContent="center" h = "100%" >
                <Text fontSize="3xl">  Click on a user to start chatting  </Text>
            </Box>
       )}
    </div>
  )
}

export default Singlechat