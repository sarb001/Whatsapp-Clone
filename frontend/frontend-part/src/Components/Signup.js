
import React, { useState } from 'react';

import {
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
   const [name ,setname] = useState();
   const [email ,setemail] = useState();
   const [password ,setpassword] = useState();
   const [confirmpassword ,setconfirmpassword] = useState();
   const [loading ,setloading] = useState(false);
   const toast = useToast();
   const navigate = useNavigate();

      const handleclick = async(e) => {
        e.preventDefault();
        // Register the Account
          if(!name || !email || !password || !confirmpassword)
          {
            toast({
              title: ' Please Fill all the Fields ',
              status: 'warning',
              duration: 9000,
              isClosable: true,
              position : 'top'
            })
          }

          if(password !== confirmpassword)
          {
            toast({
              title: ' Passwords dont Match ',
              status: 'warning',
              duration: 9000,
              isClosable: true,
              position : 'top'
            })
          }

          try{

            const config = {
              headers : { 'Content-type' : 'application/json'},
            }

            const  { data }  = await axios.post('/api/user' ,
            {name ,email ,password  }, config );

            toast({
              title: ' User is Registered Succesfully ',
              status: 'success',
              duration: 9000,
              isClosable: true,
              position : 'top'
            })
             navigate('/chat');
             
          }catch(error)
          {
            toast({
              title: ' Error Occured  ',
              status: 'warning',
              duration: 9000,
              isClosable: true,
              position : 'top'
            })
          }
      } 

  return (
    <div> 
           <FormControl>
            <FormLabel> Name </FormLabel>
            <Input  type = 'name'  
            placeholder = 'Enter your name'  
            onChange = {(e) => setname(e.target.value)}  />

            <FormLabel> Email  </FormLabel>
            <Input  type = 'email'   
            placeholder = 'Enter your email'  
            onChange = {(e) => setemail(e.target.value)}  />

            <FormLabel> Password  </FormLabel>
            <Input  type = 'password'  
            placeholder = 'Enter your Password '  
            onChange = {(e) => setpassword(e.target.value)} />

            <FormLabel> Confirm Password  </FormLabel>
            <Input  type = 'password' 
             placeholder = 'Enter Confirm Password '   
             onChange = {(e) => setconfirmpassword(e.target.value)} />

            <FormLabel> Upload your Picture  </FormLabel>
            <Input  type = 'file' />
            <span style = {{display:'grid',gridTemplateRows:'90px 1fr',padding:'20px'}}>
                <Button bg = 'black' onClick = {handleclick}>  Sign up   </Button>  
            </span>
        </FormControl>
    </div>
  )
}

export default Signup 