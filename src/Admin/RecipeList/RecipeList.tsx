import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {RecipeData, UserData} from "../../interface";

interface Props {
  userDataList: UserData[],
  recipes: RecipeData[],
}

export const RecipeList = ({userDataList,recipes}:Props) => {

  const renderRecipeData = () => {

    return (
      recipes.map((recipe:RecipeData)=>(
        <TableRow key={recipe.id}>
          <TableCell>{recipe.id}</TableCell>
          <TableCell>{userDataList.filter((user:UserData)=>(user.id === recipe.user))[0].name}</TableCell>
          <TableCell>{recipe.name}</TableCell>
          <TableCell>{recipe.time} min</TableCell>
          <TableCell>{recipe.level}</TableCell>
          <TableCell>{recipe.rating}</TableCell>
          <TableCell>{recipe.persons}</TableCell>
          <TableCell>zut</TableCell>
          <TableCell>how</TableCell>
        </TableRow>
      ))
    );
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Ersteller</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Zeit</TableCell>
          <TableCell>Aufwand</TableCell>
          <TableCell>Bewertung</TableCell>
          <TableCell>Personen</TableCell>
          <TableCell>Zutaten</TableCell>
          <TableCell>Zubereitung</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {renderRecipeData()}
      </TableBody>
    </Table>
  );
};