import {object, ref, string} from "yup";
import axios from "axios";
import {UserData} from "../interface";

export const UserSchema = (currentUser?:UserData,adminEditUser?:UserData) => object().shape({
  name: string()
    .required("Bitte einen Namen eingeben"),
  username: string()
    .required("Bitte einen Benutzernamen eingeben")
    .test('Unique Username', 'Der Benutzername wird bereits verwendet', // <- key, message
      (value) => {
        return new Promise((resolve, reject) => {
          axios.get("http://localhost:3001/user")
            .then((res) => {
              let newName:boolean = true;
              res.data.forEach((userData:UserData)=>{
                if((userData.username === value && value !== currentUser?.username && !currentUser?.admin)
                    ||(currentUser?.admin && userData.username === value && value !== adminEditUser?.username)
                ) newName = false;
              });
              resolve(newName)
            })
            .catch((error) => {
              console.log("Error UserName Validation: ",error.response.data.content);
              resolve(false);
            })
        })
      }
    ),
  email: string()
    .email("Bitte eine gültige email eingeben")
    .required("Bitte eine Emailadresse eingeben")
    .test('Unique Email', 'Die Email wird bereits verwendet', // <- key, message
      (value) => {
        return new Promise((resolve, reject) => {
          axios.get("http://localhost:3001/user")
            .then((res) => {
              let newEmail:boolean = true;
              res.data.forEach((userData:UserData)=>{
                if((userData.email === value && value !== currentUser?.email && !currentUser?.admin)
                  ||(currentUser?.admin && userData.email === value && value !== adminEditUser?.email)
                ) newEmail = false;
              });
              resolve(newEmail)
              // console.log("NewEmail: ",newEmail);
            })
            .catch((error) => {
              console.log("Error UserEmailValidation: ",error.response.data.content);
              resolve(false);
            })
        })
      }
    ),
  password: string()
    .required("Bitte einen Passwort eingeben"),
  confirmationPassword: string()
    .oneOf([ref('password'), null], 'Die Passwörter stimmen nicht überein')
    .required("Bitte das Passwort wiederhohlen")
});