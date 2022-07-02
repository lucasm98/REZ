import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {RecipeData, UserData} from "../../interface";
import {useNavigate} from "react-router-dom";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import IconButton from "@mui/material/IconButton";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface Props {
  userList: UserData[],
  recipeList: RecipeData[],
  deleteRecipe: (id:number) => void
}

export const RecipeList = ({userList,recipeList,deleteRecipe}:Props) => {
  const navigate = useNavigate();

  const onClickDelete = (recipe:RecipeData) => {
    if (window.confirm('Rezept Wirklich Löschen?')) {
      deleteRecipe(recipe.id);
    }
  }

  const renderRecipeData = () => {
    return (
      recipeList.map((recipe:RecipeData)=>(
        <TableRow key={recipe.id} >
          <TableCell>
            <IconButton onClick={()=>navigate(`/recipe/${recipe.id}`)}><MenuBookIcon/></IconButton>
            <IconButton onClick={()=>navigate(`/admin/recipe/edit/${recipe.id}`)}><BorderColorIcon/></IconButton>
            <IconButton onClick={()=>onClickDelete(recipe)}><DeleteForeverIcon/></IconButton>
          </TableCell>
          <TableCell>{recipe.id}</TableCell>
          <TableCell>{userList.filter((user:UserData)=>(user.id === recipe.user))[0].name}</TableCell>
          <TableCell>{recipe.name}</TableCell>
          <TableCell>{recipe.time} min</TableCell>
          <TableCell>{recipe.level}</TableCell>
          <TableCell>{recipe.rating}</TableCell>
          <TableCell>{recipe.persons}</TableCell>
          <TableCell>{recipe.ingredients.length}</TableCell>
          <TableCell>{recipe.preparation.length}</TableCell>
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