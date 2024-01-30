import { Box, Typography, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import BackendClient from "../../BackendClient";
import illustration from "../../assets/illustration.svg"
import logo from "../../assets/logo.png"
import {useTheme} from "@mui/material";
import {Checkbox} from "@mui/material";
import LoginButton from "./loginWithChanneli";






export default function LoginPage() {
    const theme = useTheme()

    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [rememberMe,setRememberMe]=useState(false)

    const onSubmit=()=>{
        BackendClient.post('login/',{
            username:username,
            password:password,
        }).then(()=>{
            window.location.href="http://localhost:3000/"
        })
    }
    useEffect(()=>{
        console.log("remember me")
    },[rememberMe])
    return (
        <Box sx={{
            display: "flex",
        }}>
            <Box
                sx={{
                    width: "45vw",
                    height: "100vh",
                    display: "flex",
                    flexDirection:"column",
                    justifyContent: "center",
                    alignContent: "center",
                    backgroundColor:"primary.main",
                    textAlign:"center"
                }}
            >
                <img src={illustration} style={{width: "69%", alignSelf:"center",marginBottom:"2rem"}}></img>
                <Typography variant="h4" color="primary.contrastText">Log Kahte h explore karo par karu kaise?</Typography>
            </Box>

            <Box
                sx={{
                    width: "55vw",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                    flexWrap: "wrap",
                }}
            >
                <img src={logo} style={{width:"13rem",alignSelf:"center",marginBottom:"4.5rem"}}></img>
                <Typography
                    variant="h3"
                    sx={{marginBottom:"2rem"}}
                    
                >
                    <span style={{color:theme.palette.secondary.main}}>L</span>ogin
                </Typography>
                <Box sx={{width:"50%",marginBottom:"1rem"}}>
                <Typography>username</Typography>
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    sx={{
                        marginBottom: "0.5rem",
                        width:"100%"
                    }}
                    onChange={(e)=>{
                        setUsername(e.target.value)
                    }}
                />
                </Box>
                <Box sx={{width:"50%",marginBottom:"0.5rem"}}>
                <Typography>password</Typography>
                <TextField
                    id="outlined-password-input"
                    type="password"
                    autoComplete="current-password"
                    sx={{
                        marginBottom: "0.5rem",
                        width:"100%"
                    }}
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                />
                </Box>
                <Box sx={{width:"50%" , display:"flex",justifyContent:"space-between"}}>
                  <Box sx={{display:"flex"}}>
                    <Checkbox checked={rememberMe} onChange={(e)=>{
                        setRememberMe(e.target.checked)
                    }} sx={{padding:"0px"}}></Checkbox>
                    <Typography>Remeber Me</Typography>
                  </Box>
                  <Typography color="secondary">Forgot password?</Typography>
                </Box>
                <Button variant="contained"
                    sx={{
                        height:"2.8rem",
                        marginBottom: "1rem",
                        marginTop:"1rem"
                    }}
                    onClick={onSubmit}
                    >
                    
                    Log In
                </Button>
                <Box sx={{width:"50%"}}>
                    <Typography sx={{fontSize:"1.1rem",marginBottom:"1rem",marginTop:"0.5rem"}}>Don't have an account? <span style={{color:theme.palette.secondary.main}}>Sign up</span></Typography>

                </Box>
                <Box sx={{display:"flex",justifyContent:"space-between",width:"50%",alignContent:"center"}}>
                 <Box sx={{height:"2px",backgroundColor:"tertiary.main",width:"40%",alignSelf:"center"}}></Box>
                 <Typography color="tertiary.main">OR</Typography>
                 <Box sx={{height:"2px",backgroundColor:"tertiary.main",width:"40%",alignSelf:"center"}}></Box>
                </Box >
                <LoginButton></LoginButton>

            </Box>
        </Box>
    )
}