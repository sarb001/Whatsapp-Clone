
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Chatstate } from '../Context/ChatProvider';
import { getSender, getSenderFull } from './getSender';
import Profilemodal from './Profilemodal';


const Mychats = ({fetchagain , setfetchagain}) => {

  const { user ,  selectedchats , setselectedchats } = Chatstate();

  return (
    <>
    <div>
      
       { selectedchats ? (
         <>  
           {!selectedchats.isGroupChat ? 
           (<>
                 {/* Only Fetching User Name  */}
                 <div style = {{display:'grid',gridTemplateColumns:'1fr 200px'}}>
                    <span> <h1>  {getSender(user,selectedchats.users)} </h1> </span>
                    <span> <Button>  <Profilemodal user = {getSenderFull(user,selectedchats.users)}  />  </Button>  
                    </span>
                 </div>
               {/* For Showing Message Box  */}
               <Box>

               </Box>
           </>
            ):(
           <>
           {selectedchats.chatName.toUpperCase()}
           </>) 
           }
         </>
         ) : (
           <>  
           <Box>
                      <Flex alignItems="center" justifyContent = "center" h="100%">
                          <Text fontSize="2xl" pb= {3} >
                                Click on user to start Chatting   
                          </Text>
                      </Flex>
            </Box>
        </>) 
       }
    </div> 

    <div className="chatting-box" style = {{display:'grid',gridTemplateColumns:'1fr 100px',
    columnGap:'50px',paddingTop:'25px'}}>
      <span> <Input type = "text"  placeholder = 'Enter your Message...'/> </span>
      <span> <Button>  Send  </Button> </span>
       </div>
    </>
  )
}

export default Mychats