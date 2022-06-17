import React from 'react';
import {UserData} from "../interface";
import {Button, Grid, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";

interface Props {
  userData:UserData
}

export const User = ({userData}:Props) => {
  const labelSize:number = 6;
  const varSize:number = 5;
  const navigate = useNavigate();

  return (
    <Grid
      container
      item
      direction="column"
      spacing={3}
      justifyContent="center"
      alignItems="center"
      sx={{
        borderColor: 'text.primary',
        m: 1,
        border: 1,
        borderRadius: '16px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}
      xs={8}
    >
      <Grid
        container
        item
        direction="row"
        spacing={2}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item xs={labelSize}>
          <Typography variant="h4">Name:</Typography>
        </Grid>
        <Grid item xs={varSize}>
          <Typography variant="h4">{userData.name}</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        item
        direction="row"
        spacing={2}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item xs={labelSize}>
          <Typography variant="h4">Benutzername:</Typography>
        </Grid>
        <Grid item xs={varSize}>
          <Typography variant="h4">{userData.username}</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        item
        direction="row"
        spacing={2}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item xs={labelSize}>
          <Typography variant="h4">Email:</Typography>
        </Grid>
        <Grid item xs={varSize}>
          <Typography variant="h4">{userData.email}</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        item
        direction="row"
        spacing={2}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item xs={labelSize}>
          <Typography variant="h4">Favoriten</Typography>
        </Grid>
        <Grid item xs={varSize}>
          <Typography variant="h4" onClick={()=>navigate("/book")}>({userData.favorites.length})</Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={()=>navigate("/account/edit")}>
          Informationen bearbeiten
        </Button>
      </Grid>
      <Grid item mb={2}>
        <Button variant="contained" >
          Account Löschen
        </Button>
      </Grid>

    </Grid>
  );
};