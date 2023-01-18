import React from 'react';
import { Chatstate } from '../Context/ChatProvider';

const ScrollableChat = ({messages}) => {

    const {user} = Chatstate();

  return (
    <div style = {{overflowY:'scroll',height:'55vh',backgroundColor:'ButtonShadow',padding:'3%'}}> 
                 {messages && messages.map((m,i) => (
                        <div style = {{backgroundColor:`${m.sender._id === user._id ? "lightpink" : "lightgreen"}`
                        ,borderRadius:'20px',padding:'5px 15px',maxWidth:'25%'
                        , marginLeft:`${m.sender._id === user._id ? "560px" : "5px"}`}}> 
                             {m.content} 
                        </div>
                 ))}
    </div>
  )
}

export default ScrollableChat