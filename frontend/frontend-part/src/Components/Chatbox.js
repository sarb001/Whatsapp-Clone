import { Button } from '@chakra-ui/react'
import React from 'react';
import GroupChatmodel from './GroupChatmodel';



const Chatbox = () => {
  return (
    <div>
          <div className = "top-side" style = {{display:'grid',gridTemplateColumns:'1fr 1fr'}}>
            <span> My Chats  </span>
              <GroupChatmodel />
          </div>
          <div className = "users-display" style = {{paddingTop:'30px'}}>
             <div className = "user-count">
              <span style = {{fontSize:"25px",backgroundColor:'lightblue',width:'100%'}}>  Piyush  </span>
          </div>
             </div>
    </div>
  )
}

export default Chatbox