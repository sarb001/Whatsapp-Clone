import React, { useState } from 'react'
import { Chatstate } from '../Context/ChatProvider';
import Chatbox from './Chatbox';
import Mychats from './Mychats';
import SideDrawer from './SideDrawer';

const Chatpage = () => {
    const { user} = Chatstate();
    const [fetchagain,setfetchagain] = useState(false); 
    // used bcoz when there is need to update  in chats 

  return (
    <div>
         {user && <SideDrawer />}
         <div style = {{display:'grid' ,gridTemplateColumns:'400px 1fr',paddingTop:'2%',
         backgroundColor:'lightblue',padding:'2%',columnGap:'20px'}}>
                <span> {user && <Mychats  fetchagain = {fetchagain} />} </span>
                <span> {user && <Chatbox  fetchagain = {fetchagain}  setfetchagain = {setfetchagain}  />}  </span>
         </div>
    </div>
  )
}

export default Chatpage