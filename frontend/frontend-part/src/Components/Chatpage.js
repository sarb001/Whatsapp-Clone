import React, { useState } from 'react'
import { Chatstate } from '../Context/ChatProvider';
import Chatbox from './Chatbox';
import Mychats from './Mychats';
import SideDrawer from './SideDrawer';

const Chatpage = () => {
    const { user} = Chatstate();
    const [fetchagain,setfetchagain] = useState(false);

  return (
    <div>
         {user && <SideDrawer />}
         <div style = {{display:'grid' ,gridTemplateColumns:'550px 1fr'}}>
                <span> {user && <Mychats   />} </span>
                <span style = {{backgroundColor:'lightblue' , height:'60vh'}}> {user && <Chatbox  fetchagain = {fetchagain}   />}  </span>
         </div>
    </div>
  )
}

export default Chatpage