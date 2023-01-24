import React from 'react';
import { BrowserRouter ,Routes ,Route } from 'react-router-dom';
import Chatpage from './Components/Chatpage';
import Homepage from './Components/Homepage';

function App() {
  return (
    <div className = "App">
          <Routes>
            <Route exact path = "/" element = {<Homepage/> }>   </Route>
            <Route path = "/chat"   element = {<Chatpage />}>   </Route>
          </Routes>
    </div>
  );
}

// userBadgeitem =>  For showing  name only 
// userListitem =>   for showing other details like email ,pic others

export default App;
