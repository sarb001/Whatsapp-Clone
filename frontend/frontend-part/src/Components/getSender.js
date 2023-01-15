
// For Getting User Name Only 
export  const getSender = (loggeduser,users) => {
        return users[0]._id === loggeduser._id ? users[1].name : users[0].name;
}

// For Getting Whole data of the User
export const getSenderFull = (loggeduser,users) => {
        return users[0]._id === loggeduser._id ? users[1] : users[0];
    }
    