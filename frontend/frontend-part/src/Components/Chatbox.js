import React from 'react';
import { Box } from '@chakra-ui/react';
import Singlechat from './Singlechat';


const Chatbox = ({setfetchagain, fetchagain}) => {
  return (
    <div> 
      <Box alignItems="center"
      height = "80vh"
       bg="wheat">
         <Singlechat setfetchagain = {setfetchagain}  fetchagain = {fetchagain} />
      </Box>
    </div>
  )
}

export default Chatbox