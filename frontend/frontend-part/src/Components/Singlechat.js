import { Box, FormControl, Input, Spinner, Text, Toast, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Chatstate } from '../Context/ChatProvider';
import { getSenderFull } from './getSender';
import ProfileModals from './ProfileModals';
import ScrollableChat from './ScrollableChat';
import UpdateGroupmodel from './UpdateGroupmodel';
import io from 'socket.io-client'

var socket , selectedchatcompare;
const ENDPOINT = 'http://localhost:5000'

const Singlechat = ({fetchagain , setfetchagain}) => 
{
    const [loading ,setloading] = useState(false);
    const { user ,selectedchats , setselectedchats } = Chatstate();

    const [messages ,setMessages] = useState([]);
    const [newMessage ,setnewMessage] = useState();       // value = {newMessage} first // Second value  
     const [socketconnected,setsocketconencted]= useState(false);


     const toast = useToast();

    // For Socket Setup 
     useEffect(() => {
      socket = io(ENDPOINT); 
      socket.emit('setup' , user);                                    // emit the Connection   
      socket.on('connection', () => setsocketconencted(true));       
     },[])


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

              // console.log('data is ',data);
              socket.emit('new message' ,data);       // emit or show ( {data} -- message )
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
          socket.emit('join chat new person',selectedchats._id);

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
        selectedchatcompare = selectedchats;
     },[selectedchats])       // Also fetch when diff chat is  Selected 

     
    // Recieving Message 
     useEffect(() => {
       socket.on('message recieved' , (newMessageRecieved) => {
        // if no chat is selected  || 
        // the chat we select  !== not equal to the msg recieved id or Person
        // (( arsh and jass are talking but are interacting but recieve msg but for third user get the msg 
          //  we give notificaton  ))
          if(!selectedchatcompare || selectedchatcompare._id !== newMessageRecieved.chat._id)
          {
              // give notification for that 
          }else{
            // else add messages and recieved on other side 
            setMessages([...messages ,newMessageRecieved]);
          }
       })
     })


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
                               setfetchagain = {setfetchagain} 
                               fetchmessage = {fetchmessage} />
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
                          <div className="messages">            
                             <ScrollableChat  messages = {messages} /> 
                          </div>
                     </>)}
                     <FormControl onKeyDown = {sendMessage}  isRequired>
                      <Input type = "text" placeholder = 'Type your messages....' 
                        onChange = {typinghandler} 
                        value  = {newMessage} />
                     </FormControl>
              </Box>      

       </>) : 
       (
            <Box style = {{height:'80vh',backgroundColor:'white',alignItems:'center',
            justifyContent:'center',display:'flex',padding:'1%'}}>
                <Text fontSize="3xl">  Click on a user to start chatting  </Text>
            </Box>
       )}
    </div>
  )
}

export default Singlechat