
import React  , {useState}  from 'react'
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    useToast,
  } from '@chakra-ui/react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
  
const Login = () => {

  const [email ,setemail] = useState();
  const [password ,setpassword] = useState();
  const [confirmpassword ,setconfirmpassword] = useState();
  const [loading ,setloading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const handlelogin = async () => {

    if (!email || !password) {        //  when few fields are not Present 
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userinfo", JSON.stringify(data));
      navigate('/chat');

    } catch (error) {
      toast({
        title: "Error Occured!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
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
                    setemail("testinguser@gmail.com");
                    setpassword("testinguser")
                  }}>  
                Get user Credentials   </Button> 
            </span>
        </FormControl>
    </div>
  )
}

export default Login