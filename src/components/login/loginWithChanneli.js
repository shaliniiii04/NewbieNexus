import React from "react";
import { Button } from "@mui/material";
import { Avatar } from "@mui/material";
import channeliLogo from "../../assets/channeli_logo.svg"

function LoginRequest() {
  window.location.href = `http://localhost:8000/send_token_request`;
}

export default function LoginButton() {
  return (
    <Button
      sx={{
        width: "50%",
        alignSelf: "center",
        marginTop: "1rem",
        fontSize:"1rem ",
        backgroundColor:"#FFFFFF",
        borderRadius: "0.25rem",
        border: "1px solid #D7D7D7",
        color:"secondary.main",
        fontWeight:"500",
        height:"2.8rem"
      }}
      variant="contained"
      startIcon={
        <Avatar src={channeliLogo} variant="square"  sx={{height:"2rem",width:"2rem"}}/>
      }
      onClick={LoginRequest}
    >
      Continue With Channeli
    </Button>
  );
}