import { Box, Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CheckLogin from "../../checkLogin";
import * as React from 'react';



export default function ProfilePage() {

    const dispatch=useDispatch()

    React.useEffect(()=>{
        CheckLogin(dispatch)
    },[])

    const user = useSelector((state)=>state.user)

   


    return (
       <Box sx={{display:"flex",width:"100%",height:"100%",position:"absolute"}}>
        <Box sx={{width:"20%",backgroundColor:"blue",height:"100%" }}>
         <Avatar>{user.username[0]}</Avatar>
        </Box>
        <Box sx={{width:"80%",height:"100%"}}>

        </Box>

       </Box>
    )
}