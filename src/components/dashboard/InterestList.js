import { SatelliteAltTwoTone } from "@mui/icons-material";
import { Typography, useTheme,Box,Chip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import BackendClient from "../../BackendClient";
import { setUserInterests } from "../../features/userSlice";
import AddCircleIcon from '@mui/icons-material/AddCircle';





export default function InterestList(props){
    const theme =useTheme()
    const userInterests=useSelector((state)=>state.user.interests)
    const userInterestsArray=userInterests.map(obj=>obj.name)
    const user=useSelector((state)=>state.user.id)
    const dispatch = useDispatch()
   console.log(userInterestsArray)
    
    const handleUserInterestClick=(name)=>{
        const object = userInterests.find(obj=>obj.name==name)
        BackendClient.delete('interests/'+object.id+'/').then((res)=>{
            BackendClient.get('interests/get_user_interests/?user='+user).then((res)=>{
                dispatch(setUserInterests(res.data))
            })
        })
       

    }
    const handleInterestClick=(name)=>{
        BackendClient.post('interests/',{
            is_user_interest:true,
            name:name,
            user:user,
            club:null,
            weight:2,


        }).then((res)=>{
            BackendClient.get('interests/get_user_interests/?user='+user).then((res)=>{
                dispatch(setUserInterests(res.data))
            })
        })
    }

    return(
        <Box sx={{border:"3px solid #000000",margin:"3rem 2rem",display:"flex",flexDirection:"column",boxShadow: "0px 4px 4px 0px #939393",borderRadius:"1.5rem"}}>
            <span style={{border:"1px solid #000000",alignSelf:"center",margin:"1rem",boxShadow:"0px 4px 4px 0px rgba(0, 0, 0, 0.25)",borderRadius:"0.5rem",padding:"0.5rem"}}>
                <Typography color="primary" variant="h4" >{props.name} <span style={{color:theme.palette.secondary.main}}>Interests</span></Typography>
            </span>
            <Box sx={{display:"flex",justifyContent:"space-evenly",flexWrap:"wrap"}}>
                {props.interests.map((data,id)=>{
                 return  userInterestsArray.includes(data) ? (
                 <Chip    
                 label={data} 
                 color="primary"
                 onClick={()=>{
                    handleUserInterestClick(data)
                }}
                 onDelete={()=>{
                    handleUserInterestClick(data)
                }}
                
                 sx={{ 
                 width: "15rem", 
                 height: "2.5rem", 
                 fontSize: "1rem", 
                 margin: "1rem",
                 borderRadius:"1.25rem",
                 display:"flex",
                 justifyContent:"space-between"
                 }}/>
                 ) : (
                 <Chip 
                 label={data}
                 onClick={()=>{
                    handleInterestClick(data)
                }}
                onDelete={()=>{
                    handleInterestClick(data)
                }}
                deleteIcon={<AddCircleIcon/>}
                 
                 sx={{ 
                 width: "15rem", 
                 height: "2.5rem", 
                 fontSize: "1rem", 
                 margin: "1rem",
                 borderRadius:"1.25rem",
                 display:"flex",
                 justifyContent:"space-between",
                 fontWeight:"bold",
                 }}
                 />
                 )
                }
                )}
            </Box>
        </Box>
    )
}