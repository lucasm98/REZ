import {
  Avatar,
  Button,
  FormControl, Grid,
  Input,
  InputLabel,
  Typography
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { useState} from 'react';
import {useNavigate} from "react-router-dom";

interface Props {
  loggIn: (username:string,password:string)=> boolean;
  isLoggedIn: boolean;
}

export default function Login({loggIn,isLoggedIn}:Props) {
  const [state,setState] = useState({username:"",password:"",error:false});
  const navigate = useNavigate();

  const handleInputChange = (e:any) => {
    const {id , value} = e.target;
    setState(prevState => ({
      ...prevState,
      [id]: value}));
  }

  const handelLoginSubmit = (event:any) => {
    event.preventDefault();
    if(loggIn(state.username,state.password)){
      navigate("/");
    } else {
      setState(prevState => ({
        ...prevState,
        error: true
      }));
    }
  }

  return (
    <Grid item md={4} sx={{width:"50%",marginLeft:"auto",marginRight:"auto"}}>
      <Typography variant="h5">
        Anmelden
      </Typography>
      {state.error && <Typography variant="h6" color="red"> Falscher Benutzername oder Passwort </Typography>}
      <form onSubmit={(event)=>handelLoginSubmit(event)}>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="username">Benutzername</InputLabel>
          <Input
            id="username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(event)=>handleInputChange(event)} />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">Passwort</InputLabel>
          <Input
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event)=>handleInputChange(event)} />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Anmelden
        </Button>
      </form>
    </Grid>

  );
}
