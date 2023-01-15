
import React, { useEffect } from 'react';
import { Chatstate } from '../Context/ChatProvider';
import { getSender } from './getSender';

const Mychats = ({fetchagain , setfetchagain}) => {

  const { user ,  selectedchats , setselectedchats } = Chatstate();


  return (
    <>
       { selectedchats ? (
         <>  
           {!selectedchats.isGroupChat ? 
           (<>
               <h1> one-one chat with  {getSender(user,selectedchats.users)}
               </h1>
           </>
            ):(
           <>
           {selectedchats.chatName.toUpperCase()}
              <h1> Group chat hai hai.....  </h1>
           </>) 
           }
         </>
         ) : (
           <>  
           <h1>  Chat is not Selected   </h1>
        </>) 
       } 
    </>
  )
}

export default Mychats