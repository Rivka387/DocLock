import { Avatar, Stack } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { User } from "../../types/User";
import userStore from "./userStore";
import { observer } from "mobx-react-lite";

if(userStore.user==null) {
    console.log(userStore.user);
    console.log(userStore.getUserId());
    
    
    userStore.fetchUser(userStore.getUserId())
}
const UserDetails = observer(() => {
    
    
    const user: User =userStore.user
    
    function stringAvatar(name: string) {
        if (!name || name.trim() === '') {
            name = ' ';
        }
        return {
            sx: {
                backgroundImage: "linear-gradient(135deg, #6fa8cb, #70ab9f)", // צבע הרקע של ה-Avatar
                color: "#ffffff", // צבע הטקסט (האות)
                "&:hover": {
                    backgroundImage: "linear-gradient(135deg, #70ab9f,rgb(74, 130, 165))", // צבע רקע בעת ריחוף
                },
            },
            children: `${name.split(' ')[0][0]}`, // האות הראשונה של שם המשתמש
        };
    }
    
    return (

        <Stack direction="row" spacing={2}>
            {!user.name || user.name.trim() === ''?(<> <PersonIcon/></>):(<>
            <Avatar {...stringAvatar(user.name)} />
            </>)}
           
        </Stack>
    );
})
export default UserDetails