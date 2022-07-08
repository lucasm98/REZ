import React, {useEffect, useState} from 'react';
import {Formik, useFormik, Form} from "formik";
import {UserSchema} from "../Validation/UserValidation";
import {Box, Button} from "@mui/material";
import {UserData} from "../interface";
import {useNavigate, useParams} from "react-router-dom";
import {TextField} from "./TextField";

interface Props {
  updateUser : (user:UserData)=> void,
  getCurrentData?: ()=>UserData,
  userList?:  UserData[]
}

const initialValues:UserData = {
  name:"",
  username:"",
  email:"",
  password:"",
  id:-1,
  admin:false,
  favorites:[],
  shoppingList:[]
}

export const UserForm = ({updateUser,getCurrentData,userList}:Props) => {
  const navigate = useNavigate();
  const input = useParams();
  const [user,setUser] = useState<UserData>(getCurrentData?getCurrentData():initialValues);

  const formik = useFormik({
    initialValues: {...user,confirmationPassword:user.password},
    onSubmit: (values)=> {
      updateUser({
        "name":values.name,
        "username":values.username,
        "email":values.email,
        "password":values.confirmationPassword,
        "id":values.id,
        "admin":false,
        "favorites":values.favorites,
        "shoppingList":values.shoppingList
      })
      if(getCurrentData && getCurrentData()?.admin) navigate("/admin/user");
      else navigate(getCurrentData?"/account":"/login");
    },
    validationSchema:UserSchema(getCurrentData?getCurrentData():undefined,getCurrentData && getCurrentData()?.admin ? user : undefined),
    validateOnChange:false
  });

  useEffect( ()=> {
      if(input.userId !== undefined && userList !== undefined && getCurrentData !== undefined && getCurrentData().admin)
      {
        const inputUser:UserData = userList.filter((userData:UserData)=>(userData.id === parseInt(input.userId as string)))[0];
        setUser(inputUser);
        formik.setValues({...inputUser,confirmationPassword:inputUser.password});
      }
    },[input]
  );

  return (
    <Formik
      initialValues={formik.initialValues}
      onSubmit={()=>formik.handleSubmit()}
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