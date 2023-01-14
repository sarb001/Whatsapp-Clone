import { Button } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Chatstate } from '../Context/ChatProvider'
import NewDrawer from './NewDrawer'
import Profilebar from './Profilebar'

const Navbar = () => {

  const { user } = Chatstate();
  const navigate = useNavigate();

  const handlelogout = () => {
    localStorage.removeItem('userinfo');
    navigate('/');
  }

  return (
    <div style = {{display:'grid' ,gridTemplateColumns:'1fr 1fr 1fr 1fr',padding:'1%',backgroundColor:'lightsalmon'}}> 
    <span> { user &&  <NewDrawer /> }   </span>   
    <span>  <h1> Talk -a- Tive here  </h1>  </span> 
    <span> <Profilebar />  </span>
    <Button onClick = {handlelogout}> Logout  </Button>
</div>
  )
}

export default Navbar