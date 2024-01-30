
import { Box, Modal, Slider, Typography,Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import BackendClient from "../../BackendClient"
import ClubCard from "./ClubCard"
import ClubModal from "./ClubModal"
import * as React from 'react'

const marks = [
    {
      value: 1,
      label: 'Maybe',
    },
    {
      value: 2,
      label: 'Can do',
    },
    {
      value: 3,
      label: 'Want to do',
    },
    {
      value: 4,
      label: 'Definately',
    },
  ];
  


export default function ClubRecommendation(props){
    const [interests,setInterests]=useState([])
    const [recommnededClubs,setrecommendedClubs]=useState([])
    const [modalClub, setModalClub] = React.useState(null)

    const user=useSelector((state)=>state.user.id)
    useEffect(()=>{
        if(user!=null){
       BackendClient.get('interests/get_user_interests/?user='+user).then((res)=>{
        setInterests(res.data)
       })
    }
    },[props.open])

    const handleCardClick = (club) => {
        setModalClub(club.id);
    }
    const handleModalClose = () => {
        setModalClub(null);
    }
    const getRecommendedClub =()=>{
        BackendClient.get('get_club_recommendations/?user='+user).then((res)=>{
            setrecommendedClubs(res.data)
        })
    }
    return(
        <Modal open={props.open} onClose={props.onClose}>

            <Box sx={{width:"80rem",backgroundColor:"white",position:'relative',top:"50%",left:"50%",transform: "translate(-50%, -50%)",padding:"3rem",height:"80vh",overflowY:"auto"}}>
                <Typography variant="h3">Interests</Typography>
                <Box sx={{width:"100%",display:"flex",justifyContent:"space-evenly",flexWrap:"wrap"}}>
                    {interests.map((data,id)=>{
                          return(
                            <Box sx={{display:"flex",flexDirection:"column",width:"22rem",margin:"2rem"}}>
                                <Typography variant="h5" color="secondary" sx={{marginBottom:"2rem",textAlign:"center"}}>{data.name}</Typography>
                               <Slider
                               step={1}
                               defaultValue={data.weight}
                               marks={marks}
                               min={1}
                               max={4}
                               onChange={(event,newValue)=>{
                                      BackendClient.patch('interests/'+data.id+'/',{
                                        weight:newValue
                                      })
                               }}
                               
                               >

                               </Slider>
                            </Box>
                          )
                    })}
                </Box>
                <Button variant="contained" fullWidth onClick={getRecommendedClub}>Get Club Recommendations</Button>
                <Box sx={{display:"flex",justifyContent:"space-evenly",width:"100%",flexWrap:"wrap"}}>
                    {recommnededClubs.map((data,id)=>{
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
            </Box>

        </Modal> )
}