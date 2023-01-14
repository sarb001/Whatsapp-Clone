import { Button } from '@chakra-ui/react';
import React from 'react';

const Mychats = () => {
  return (
    <div>
       <div className = "display-name" style = {{display:'grid',
       gridTemplateColumns:'1fr 150px'}}>
           <h1>   User Name  </h1>
          <Button> Update Details </Button> 
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
    </div>
  )
}

export default Mychats