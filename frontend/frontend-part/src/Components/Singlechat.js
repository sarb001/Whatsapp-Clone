import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { Chatstate } from '../Context/ChatProvider';

const Singlechat = ({fetchagain , setfetchagain}) => 
{
    const { user ,selectedchats , setselectedchats } = Chatstate();

  return (
    <div> 
         {/* If chat is  selected then  */}
       {selectedchats ? (
       <> 
            <Box>
                  {!selectedchats.isGroupChat ? (
                    <> 
                        <h1>  Not Group Chat ---  {selectedchats.users[1].name } </h1>
                    </>
                  ) : (
                  <>
                        <h1> Grp chat - {selectedchats.chatName}  </h1>
                  </>)}
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