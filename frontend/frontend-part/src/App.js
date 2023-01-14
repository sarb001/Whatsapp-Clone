import React from 'react';
import { BrowserRouter ,Routes ,Route } from 'react-router-dom';
import Chats from './Components/Chats';
import Homepage from './Components/Homepage';

function App() {
  return (
    <div className = "App">
          <Routes>
            <Route exact path = "/" element = {<Homepage/> }>   </Route>
            <Route path = "/chat" element = {<Chats />}>   </Route>
          </Routes>
    </div>
  );
}

export default App;
