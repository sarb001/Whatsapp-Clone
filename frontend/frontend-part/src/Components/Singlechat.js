import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { Chatstate } from '../Context/ChatProvider';
import { getSenderFull } from './getSender';
import ProfileModals from './ProfileModals';
import UpdateGroupmodel from './UpdateGroupmodel';

const Singlechat = ({fetchagain , setfetchagain}) => 
{
    const { user ,selectedchats , setselectedchats } = Chatstate();

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