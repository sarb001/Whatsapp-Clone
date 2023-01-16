import { Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'
import { Chatstate } from '../Context/ChatProvider'
import { MdCancel } from 'react-icons/md';

//  For Name Only 
const UserBadgeitem = ({user,handlefunction}) => {

  return (
    <div>  
        <Box  cursor="pointer"
        onClick={handlefunction}
        bg="#E8E8E8"
        _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      backgroundColor='purple.300'
      px={3}
      py={2}
      mb={2}
      display='grid'
      gridTemplateColumns='1fr 30px'
      borderRadius="lg">
        <Text>{user.name}</Text>
      <Box>
        <MdCancel />
      </Box>
       </Box>
    </div>
  )
}

export default UserBadgeitem