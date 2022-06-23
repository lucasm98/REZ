import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {RecipeData, UserData} from "../../interface";

interface Props {
  userDataList: UserData[],
  recipes: RecipeData[],
}

export const UserList = ({userDataList,recipes}:Props) => {

  const renderUserData = () => {

    return (
      userDataList.map((userData:UserData)=>(
        <TableRow key={userData.id}>
          <TableCell>{userData.id}</TableCell>
          <TableCell>{userData.name}</TableCell>
          <TableCell>{userData.username}</TableCell>
          <TableCell>{userData.email}</TableCell>
          <TableCell>{userData.password}</TableCell>
          <TableCell>{userData.favorites.map((id:number)=>(id+" "))}</TableCell>
          <TableCell>{recipes.map((recipe:RecipeData)=>(recipe.user===userData.id?recipe.id+" ":""))}</TableCell>
        </TableRow>
      ))
    );
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
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