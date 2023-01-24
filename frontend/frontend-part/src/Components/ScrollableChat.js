import React from 'react';
import { Chatstate } from '../Context/ChatProvider';

const ScrollableChat = ({messages}) => {

    const {user} = Chatstate();

  return (
    <div style = {{overflowY:'scroll',height:'60vh',backgroundColor:'ButtonShadow',padding:'3%',display:'grid',
    gridTemplateRows:'1fr',rowGap:'10px'}}> 
                 {messages && messages.map((m,i) => (
                        <div style = {{backgroundColor:`${m.sender._id === user._id ? "lightpink" : "lightgreen"}`
                        ,borderRadius:'20px',padding:'5px 15px',paddingBottom:'1%',maxWidth:'25%'
                        , marginLeft:`${m.sender._id === user._id ? "560px" : "5px"}`}}> 
                             {m.content} 
                        </div>
                 ))}
    </div>
  )
}

export default ScrollableChat