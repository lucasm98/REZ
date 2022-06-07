import React from 'react';
import {Formik, useFormik, Form} from "formik";
import {RegisterSchema} from "../Validation/RegisterValidation";
import {Box, Button, TextField, Typography} from "@mui/material";
import {RecipeData, UserData} from "../interface";
import {useNavigate} from "react-router-dom";

interface Props {
  addUser : (user:UserData)=> void
}

export const RegisterForm = ({addUser}:Props) => {
  const navigate = useNavigate();
  const initialValues = {
    name:"",
    username:"",
    email:"",
    password:"",
    confirmationPassword:""
  }
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values)=> {
      console.log(values);
      addUser({
        "name":values.name,
        "username":values.username,
        "email":values.email,
        "password":values.password,
        "id":-1,
        "favorites":[]
      })
      navigate("/login");
    },
    validationSchema:RegisterSchema
  });

  console.log(formik.errors);

  return (
    <Formik
      initialValues={formik.initialValues}
      onSubmit={(e)=>formik.handleSubmit()}
    >
      <Form
        onSubmit={formik.handleSubmit}
      >
        <Box
          alignContent="center"
          width="50%"
          paddingLeft="20%"
          paddingRight="20%"
        >
          <TextField
            fullWidth
            label="Name"
            name="name"
            variant="standard"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && <Typography variant="subtitle1" color="red">{formik.errors.name}</Typography>}
{/*          <TextField
            fullWidth
            label="Nachname"
            name="lastName"
            variant="standard"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.lastName && formik.touched.lastName && <Typography variant="subtitle1" color="red">{formik.errors.lastName}</Typography>}*/}
          <TextField
            fullWidth
            label="Benutzername"
            name="username"
            variant="standard"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.username && formik.touched.username && <Typography variant="subtitle1" color="red">{formik.errors.username}</Typography>}
          <TextField
            fullWidth
            label="Emailadresse"
            name="email"
            variant="standard"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && <Typography variant="subtitle1" color="red">{formik.errors.email}</Typography>}
          <TextField
            fullWidth
            label="Passwort"
            name="password"
            variant="standard"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && <Typography variant="subtitle1" color="red">{formik.errors.password}</Typography>}
          <TextField
            fullWidth
            label="Passwort"
            name="confirmationPassword"
            variant="standard"
            value={formik.values.confirmationPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.confirmationPassword && formik.touched.confirmationPassword && <Typography variant="subtitle1" color="red">{formik.errors.confirmationPassword}</Typography>}
          <Button
            type="submit"
            name="Speichern"
            variant="contained"
            size="large"
            sx={{marginTop:"50px"}}
          >
            Speichern
          </Button>
        </Box>
      </Form>
    </Formik>
  );
};