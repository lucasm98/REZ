import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {RecipeData, UserData} from "../../interface";
import IconButton from "@mui/material/IconButton";
import PersonIcon from '@mui/icons-material/Person';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {useNavigate} from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface Props {
  getUserList: () => UserData[],
  recipeList: RecipeData[],
  deleteUser:(id:number)=>void,
}

export const UserList = ({getUserList,recipeList,deleteUser}:Props) => {
  const navigate = useNavigate();

  const onClickDelete = (user:UserData):void => {
    if (window.confirm('Sind sie sich sicher, dass sie diesen Account löschen wollen?')) {
      deleteUser(user.id);
    }
  }

  const renderUserData = () => {

    return (
      getUserList().map((userData:UserData)=>(
        <TableRow key={userData.id}>
          <TableCell>
            <IconButton onClick={()=>navigate(`/admin/user/${userData.id}`)}><PersonIcon /></IconButton>
            <IconButton onClick={()=>navigate(`/admin/user/edit/${userData.id}`)}><BorderColorIcon/></IconButton>
            <IconButton onClick={()=>onClickDelete(userData)}><DeleteForeverIcon/></IconButton>
          </TableCell>
          <TableCell>{userData.id}</TableCell>
          <TableCell>{userData.admin?"Admin":"Benutzer"}</TableCell>
          <TableCell>{userData.name}</TableCell>
          <TableCell>{userData.username}</TableCell>
          <TableCell>{userData.email}</TableCell>
          <TableCell>{userData.password}</TableCell>
          <TableCell>{userData.favorites.map((id:number)=>(id+" "))}</TableCell>
          <TableCell>{recipeList.map((recipe:RecipeData)=>(recipe.user===userData.id?recipe.id+" ":""))}</TableCell>
        </TableRow>
      ))
    );
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Aktionen</TableCell>
          <TableCell>ID</TableCell>
          <TableCell>Accounttyp</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Benutzername</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Passwort</TableCell>
          <TableCell>Favoriten</TableCell>
          <TableCell>Erstellte Rezepte</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {renderUserData()}
      </TableBody>
    </Table>
  );
};