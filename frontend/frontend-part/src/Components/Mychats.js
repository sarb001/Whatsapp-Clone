import { Button } from '@chakra-ui/react';
import React from 'react';
import UpdateGroupmodel from './UpdateGroupmodel';

const Mychats = () => {

  return (
    <div>
       <div className = "display-name" style = {{display:'grid',
       gridTemplateColumns:'1fr 150px'}}>
           <h1>   User Name  </h1>
            <UpdateGroupmodel />
       </div>
        <div className = "chat-area" style = {{backgroundColor:'lightsalmon',height:'70vh',paddingTop:'20px',display:'grid',overflow:'scroll'}}>
            <span> Here is the Term </span>
            <span> Here is the Term </span>
            <span> Here is the Term </span>
            <span> Here is the Term </span>
            <span> Here is the Term </span>
            <span> Here is the Term </span>
            <span> Here is the Term </span>
            <span> Here is the Term </span>
            <span> Here is the Term </span>
            <span> Here is the Term </span>
            <span> Here is the Term </span>
            <span> Here is the Term </span>
            <span> Here is the Term </span>
            <span> Here is the Term </span>
            <span> Here is the Term </span>
            <span> Here is the Term </span>
            <span> Here is the Term </span>
            <span> Here is the Term </span>
            <span> Here is the Term </span>
            <span> Here is the Term </span>
            <span> Here is the Term </span>
            <span> Here is the Term </span>
            <span> Here is the Term </span>
            <span> Here is the Term </span>
            <span> Here is the Term </span>
            <span> Here is the Term </span>
            <span> Here is the Term </span>
            <span> Here is the Term </span>
            <span> Here is the Term </span>
            <span> Here is the Term </span>
            <span> Here is the Term </span>
            <span> Here is the Term </span>
            <span> Here is the Term </span>
            <span> Here is the Term </span>
        </div>
        <div className="send-button" style = {{paddingTop:'20px',display:'grid',gridTemplateColumns:'1fr 70px',columnGap:'30px'}}>
              <span > <input type = "text" style = {{width:'100%',padding:'5px'}}/> </span>
              <Button olorScheme='teal' size='sm'> Send </Button>
        </div>
    </div>
  )
}

export default Mychats