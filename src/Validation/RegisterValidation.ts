import {object, ref, string} from "yup";

export const RegisterSchema = object().shape({
  name: string()
    .required("Bitte einen Namen eingeben"),
  username: string()
    .required("Bitte einen Benutzernamen eingeben"),
  email: string()
    .email("Bitte eine gültige email eingeben")
    .required("Bitte eine Emailadresse eingeben"),
  password: string()
    .required("Bitte einen Passwort eingeben"),
  confirmationPassword: string()
    .oneOf([ref('password'), null], 'Die Passwörter stimmen nicht überein')
    .required("Bitte das Passwort wiederhohlen")
});