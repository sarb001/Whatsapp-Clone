import React from 'react'
import Chatbox from './Chatbox';
import Mychats from './Mychats';
import Navbar from './Navbar';

const Chats = () => {
  return (
    <div>
       <div>  
       <span>  <Navbar /> </span> 
           <span className='container-chat' style = {{padding:'2%',display:'grid',gridTemplateColumns:'400px 1fr',columnGap:'80px' ,height:'90vh'}}>  
           <div style = {{backgroundColor:'lightslategray',padding:'2%'}}> <Chatbox />  </div>  
           <div style = {{backgroundColor:'lightslategray',padding:'2%'}}>  <Mychats  />  </div>  
           </span>   
       </div>
    </div>
  )
}

export default Chats