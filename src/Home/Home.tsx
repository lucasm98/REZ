import React from "react";
import {Grid, Typography} from "@mui/material";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddBoxIcon from '@mui/icons-material/AddBox';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import ListIcon from '@mui/icons-material/List';
import PersonIcon from '@mui/icons-material/Person';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import {UserData} from "../interface";
import {HomeCard} from "./HomeCard";

interface Props {
  user:UserData,
}

export default function Home({user}:Props) {

  const renderAdminCards = () => {
    if (user.id === 0) {
      return(
        <>
          <Grid item xs={12} md={12} mt={2}>
            <Typography variant="h3" component="div" >
              Admin
            </Typography>
          </Grid>
          <HomeCard name="Benutzer verwalten" link="/admin/users" icon={<PersonIcon/>}/>
          <HomeCard name="Rezepte Verwalten" link="/admin/recipe" icon={<BorderColorIcon/>}/>
        </>
      );
    }
  }

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
      <HomeCard name={"Gespeicherte Rezepte"} link={"/book"} icon={<BookmarksIcon/>} />
      <HomeCard name={"Rezept Hinzufügen"} link={"/add"} icon={<AddBoxIcon/>}/>
      <HomeCard name={"Alle Rezepte"} link={"/recipes"} icon={<MenuBookIcon/>}/>
      <HomeCard name={"Erstellte Rezepte"} link={"/created"} icon={<ListIcon/>}/>
      {renderAdminCards()}
    </Grid>
  );
}