import { createContext  , useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({children}) => {
    const [user,setuser] = useState();
    const [selectedchats,setselectedchats] = useState();     // for selecting chat 
    const [chats,setchats] =useState([]);
    const navigate = useNavigate();

    useEffect(() => {
            const userinfo = JSON.parse(localStorage.getItem('userinfo'));
            setuser(userinfo);

        if(!userinfo){
            navigate('/')
        }
    },[navigate])

return(
    <ChatContext.Provider value = {{user ,setuser , selectedchats , setselectedchats , chats , setchats}} >
        {children}
    </ChatContext.Provider>
)}

export default ChatProvider;

export const Chatstate = () => {
    return useContext(ChatContext);
}