import React, { useState } from 'react'
import { Chatstate } from '../Context/ChatProvider';
import Chatbox from './Chatbox';
import Mychats from './Mychats';
import Navbar from './Navbar';

const Chats = () => {

  const { user } = Chatstate(); 
  const [fetchagain,setfetchagain] = useState(false);

  return (
    <div>
       <div>  
       <span>  {user && <Navbar />  } </span> 
           <span className = 'container-chat' style = {{padding:'2%',display:'grid',
           gridTemplateColumns:'400px 1fr',columnGap:'80px' ,height:'90vh'}}>  
           <div style = {{backgroundColor:'lightslategray',padding:'2%'}}>    { user && <Chatbox  fetchagain = {fetchagain} />  }   </div>  
           <div style = {{backgroundColor:'lightslategray',padding:'2%'}}>    { user && <Mychats  fetchagain = {fetchagain}  setfetchagain = {setfetchagain}  /> }   </div>  
           </span>   
       </div>
    </div>
  )
}

export default Chats