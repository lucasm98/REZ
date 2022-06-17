import React from 'react';
import {Formik, useFormik, Form} from "formik";
import {RegisterSchema} from "../Validation/RegisterValidation";
import {Box, Button} from "@mui/material";
import {UserData} from "../interface";
import {useNavigate} from "react-router-dom";
import {TextField} from "./TextField";

interface Props {
  updateUser : (user:UserData)=> void,
  user?: UserData
}

export const UserForm = ({updateUser,user}:Props) => {

  const navigate = useNavigate();
  const initialValues = {
    name:"",
    username:"",
    email:"",
    password:"",
    confirmationPassword:"",
    id:-1,
    favorites:[]
  }
  const formik = useFormik({
    initialValues: user?{...user,confirmationPassword:user.password}:initialValues,
    onSubmit: (values)=> {
      console.log(values);
      updateUser({
        "name":values.name,
        "username":values.username,
        "email":values.email,
        "password":values.confirmationPassword,
        "id":values.id,
        "favorites":values.favorites
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
          <TextField formik={formik} name="name" label="Name"/>
          <TextField formik={formik} name="username" label="Benutzername"/>
          <TextField formik={formik} name="email" label="Emailadresse"/>
          <TextField formik={formik} name="password" label="Passwort"/>
          <TextField formik={formik} name="confirmationPassword" label="Passwort nochmals eingeben "/>
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