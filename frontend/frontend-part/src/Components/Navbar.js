import React from 'react'
import NewDrawer from './NewDrawer'
import Profilebar from './Profilebar'

const Navbar = () => {
  return (
    <div style = {{display:'grid' ,gridTemplateColumns:'1fr 1fr 1fr 1fr',padding:'1%',backgroundColor:'lightsalmon'}}> 
    <span>  <NewDrawer />  </span>   
    <span>  <h1> Talk -a- Tive here  </h1>  </span> 
    <span> <Profilebar />  </span>
    <span> LOGOUT   </span>
</div>
  )
}

export default Navbar