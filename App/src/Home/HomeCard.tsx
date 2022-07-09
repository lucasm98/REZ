import React, {ReactNode} from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

interface Props {
  name: string,
  link: string,
  icon: ReactNode,

}

export const HomeCard = ({name,link,icon}:Props) => {
  const navigate = useNavigate();

  return (
    <Grid item xs={6} md={6}>
      <Card>
        <CardActionArea onClick={()=>navigate(`${link}`)}>
          <CardMedia sx={{marginTop:"20px"}}>
            {icon}
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};