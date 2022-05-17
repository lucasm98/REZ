import React from "react";
import {Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {useNavigate} from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();

  return(
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Typography variant="h2" component="div" gutterBottom>
          REZ
        </Typography>
        <Typography variant="h3" component="div" >
          Die persönliche Rezeptverwaltung
        </Typography>
      </Grid>
      <Grid item xs={6} md={6}>
        <Card>
          <CardActionArea onClick={()=>navigate("/book")}>
            <CardMedia sx={{marginTop:"20px"}}>
              <MenuBookIcon/>
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Kochbuch
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={6} md={6}>
        <Card>
          <CardActionArea onClick={()=>navigate("/add")}>
            <CardMedia sx={{marginTop:"20px"}}>
              <AddBoxIcon/>
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Rezept Hinzufügen
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={6} md={6}>
        <Card></Card>
      </Grid>
      <Grid item xs={6} md={6}>
        <Card></Card>
      </Grid>
    </Grid>
  );
}