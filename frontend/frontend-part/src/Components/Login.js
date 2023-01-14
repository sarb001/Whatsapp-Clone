
import React  , {useState}  from 'react'

import {
    Button,
    FormControl,
    FormLabel,
    Input,
  } from '@chakra-ui/react'

  
const Login = () => {

  const [email ,setemail] = useState();
  const [password ,setpassword] = useState();
  const [confirmpassword ,setconfirmpassword] = useState();
  const [loading ,setloading] = useState(false);

  const handlelogin = () => {

    
  }

  return (
    <div> 
        <FormControl>
            <FormLabel> Email address  </FormLabel>
            <Input  type = 'email'  
             value = {email} 
             onChange = {(e) => setemail(e.target.value) }/>
            <FormLabel> Password  </FormLabel>
            <Input  type = 'password' 
            value = {password}  
            onChange = {(e) => setpassword(e.target.value)} />
            <span style = {{display:'grid',gridTemplateRows:'90px 1fr',padding:'20px'}}>
                <Button bg = 'black' onClick = {handlelogin}>  LOGIN   </Button> 
                <Button bg = 'black' onClick = { 
                  () => {
                    setemail("testuser@gmail.com");
                    setpassword("testuser")
                  }}>  
                Get user Credentials   </Button> 
            </span>
        </FormControl>
    </div>
  )
}

export default Login