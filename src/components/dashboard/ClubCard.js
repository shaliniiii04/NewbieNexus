import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea,Box } from '@mui/material';
import {useTheme} from '@mui/material';




export default function ClubCard(props){
  const theme = useTheme()

  const getColouredText=(text)=>{
   const words=text.split(' ')
   const replacedText = words
    .map(word => {
      if (word.length > 0) {
        const firstLetter = word[0];
        const restOfWord = word.slice(1);
        return `<span style="color:${theme.palette.secondary.main};">${firstLetter}</span>${restOfWord}`;
      }
      return '';
    })
    .join(' ');
    return {__html:replacedText}
  }
  const colouredText=getColouredText(props.club.name)
    return (
        <Card sx={{ width: "30rem",margin:"3rem" ,height:"35rem",backgroundColor:"primary.main",padding:"1.2rem",borderRadius:"0rem 1.875rem" }} >
        <CardActionArea sx={{display:"flex",flexDirection:"column",justifyContent:"space-between",height:"100%"}} onClick={()=>{
          props.onClick(props.club)
        }}>
          <CardContent sx={{padding:"0px",width:"100%"}}>
            <Box sx={{display:"flex",justifyContent:"center",height:"22rem",backgroundColor:"background.default"}}>
              <img src={props.club.profile_picture} style={{width:"20rem",alignSelf:"center"}}></img>
            </Box>
            <Box sx={{backgroundColor:"background.default",padding:"0.5rem",height:"10rem",margin:"1rem 0rem",borderRadius:"0.625rem"}}>
            <Typography  variant="h5"  color="background.contrastText" dangerouslySetInnerHTML={colouredText} sx={{fontWeight:"bold",textAlign:"center",marginBottom:"1rem"}} >
  
            </Typography>
            <Typography  sx={{overflow: "hidden",textOverflow: "ellipsis",display: "-webkit-box",WebkitLineClamp: "2",WebkitBoxOrient: "vertical",textAlign:"justify"}}> 
              {props.club.description}
            </Typography>
            <Typography sx={{textAlign:"right",margin:"0.5rem"}} color="secondary">Read More</Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    )
}