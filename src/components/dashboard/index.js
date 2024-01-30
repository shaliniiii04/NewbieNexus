import { Box, Typography, Button, TextField, Chip, Avatar } from "@mui/material";
import axios from "axios";
import * as React from 'react';
import BackendClient from "../../BackendClient";
import ClubCard from "./ClubCard";
import ClubModal from "./ClubModal";
import { useDispatch, useSelector } from "react-redux";
import CheckLogin from "../../checkLogin";
import ClubRecommendation from "./ClubRecommendation";
import illustration from "../../assets/illustration.svg"
import { setUserInterests } from "../../features/userSlice";
import { INTEREST_GROUPS } from "../../constants";
import InterestList from "./InterestList";

export default function Dashboard() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.id)
    const [clubs, setClubs] = React.useState([])
    const [modalClub, setModalClub] = React.useState(null)
    const [clubRecommendationModalOpen,setclubRecommendationModalOpen]=React.useState(false)
    const [addInterest,setAddInterest]=React.useState("")
    React.useEffect(() => {
        CheckLogin(dispatch)
    }, [])

    const getUserInterests=()=>{
        BackendClient.get('interests/get_user_interests/?user=' + user).then((res) => {
            dispatch(setUserInterests(res.data))
        })
    }
    React.useEffect(() => {
        BackendClient.get('clubs/').then((res) => {
            console.log(res.data)
            setClubs(res.data)
        })
    }, [])

    React.useEffect(() => {
        if (user != null) {
           getUserInterests()
        }
    }, [user])

    const handleCardClick = (club) => {
        setModalClub(club.id);
    }
    const handleModalClose = () => {
        setModalClub(null);
    }
    const handleClubRecommendationModalClose=()=>{
        setclubRecommendationModalOpen(false)
    }
    const handleClubRecommendationModalOpen=()=>{
        setclubRecommendationModalOpen(true)
    }
    const handleAddInterestsChange=(e)=>{
        setAddInterest(e.target.value)
    }
    const handleAddInterestsSubmit=(e)=>{
        BackendClient.post('interests/',{
            interests:addInterest,
            user:user
        }).then((res)=>{
            getUserInterests()
        })
    }

    const handleLogout = ()=>{
        BackendClient.get('logout/').then((res)=>{
            window.location.href="http://localhost:3000/login"
        })
    }
    




    return (
        <div style={{ display: "flex", flexDirection: "column", alignContent: "center", flexWrap: "wrap", backgroundImage:`linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)),url(${illustration})`,backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundAttachment:"fixed",backgroundSize:"50%",}}>
            <Box sx={{ display: "flex", justifyContent: "space-between",padding:"2rem" }}>
                <img src={require("../../assets/logo.png")} style={{ width: "15rem" }}></img>
                <Box sx={{display:"flex",alignContent:"center"}}>
                   <Avatar sx={{alignSelf:"center",width:"3rem",height:"3rem"}}></Avatar>
                   <Button variant="contained"  sx={{height:"3rem",marginLeft:"2rem",width:"10rem",alignSelf:"center"}} onClick={handleLogout}>Logout</Button>
                </Box>
            </Box>
            <Box sx={{ marginTop: "4rem", width: "40%", alignSelf: "center" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <TextField sx={{ width: "80%" }} label="interests" onChange={handleAddInterestsChange}></TextField>
                    <Button variant="contained" sx={{ width: "15%" }} onClick={handleAddInterestsSubmit}>Add</Button>
                </Box>
                <Typography sx={{ color: "grey" }}>For eg: Music,Machine Learing,Competitive Programming</Typography>
                <Button variant="contained" onClick={handleClubRecommendationModalOpen}sx={{ width: "100%",marginTop:"2rem",height:"3.2rem" }}>Get Club Recommendations</Button>
            </Box>
            <ClubRecommendation 
             open={clubRecommendationModalOpen}
             onClose={handleClubRecommendationModalClose}

            />
            <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%", alignSelf: "center", justifyContent: "center" ,flexDirection:"column",marginTop:"4rem"}}>
              {Object.keys(INTEREST_GROUPS).map((key)=>{
                   return(
                    <InterestList
                    name={key}
                    interests={INTEREST_GROUPS[key]}
                    ></InterestList>
                   )
              })}
            </Box>

            <Box sx={{ width: "100%", textAlign: "center", marginTop: "4rem" }}>
                <Typography variant="h3">CLUBS</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap" }}>
                {clubs.map((data, id) => {
                    return (
                        <Box>
                            <ClubCard
                                club={data}
                                onClick={handleCardClick}
                            />
                            <ClubModal
                                club={data}
                                open={modalClub == data.id}
                                onClose={handleModalClose}
                            />
                        </Box>
                    )
                })}
            </Box>
        </div>
    )
}