import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {RecipeData, UserData} from "../../interface";
import IconButton from "@mui/material/IconButton";
import PersonIcon from '@mui/icons-material/Person';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {useNavigate} from "react-router-dom";

interface Props {
  userList: UserData[],
  recipeList: RecipeData[],
}

export const UserList = ({userList,recipeList}:Props) => {
  const navigate = useNavigate();

  const renderUserData = () => {

    return (
      userList.map((userData:UserData)=>(
        <TableRow key={userData.id}>
          <TableCell>
            <IconButton onClick={()=>navigate(`/admin/user/${userData.id}`)}><PersonIcon /></IconButton>
            <IconButton onClick={()=>navigate(`/admin/user/edit/${userData.id}`)}><BorderColorIcon/></IconButton>
          </TableCell>
          <TableCell>{userData.id}</TableCell>
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