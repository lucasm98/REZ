import React, {useEffect} from "react";
import {RecipeData, UserData} from "../interface";
import {Grid, Typography} from "@mui/material";
import RecipeCard from "./RecipeCard";
import {useParams} from "react-router-dom";

interface props {
  recipes: RecipeData[];
  searchInput: string;
  setSearchInput: (input:string)=> void;
  filter?: string;
  user?: UserData;
  toggleFavoriteByRecipeId?: (id:number)=>boolean,
  deleteRecipe?: (id:number)=>void;
}

export function RecipeBook({recipes, deleteRecipe,searchInput, setSearchInput,user,toggleFavoriteByRecipeId, filter}: props) {
  const input = useParams();

  useEffect( ()=> {
      if(input.input !== searchInput && searchInput === "" && input.input !== undefined) setSearchInput(input.input!.toString());
    },[input]
  );



  const renderRecipeCard = (recipe:RecipeData):any => {
    // console.log("recipe.user: "+recipe.user.toString()+"| user?.id:"+user?.id.toString());
    if(recipe.user === user?.id){
      return (
        <RecipeCard  key={recipe.id}
          recipeData={recipe}
          deleteRecipe={deleteRecipe}
          user={user}
          toggleFavoriteByRecipeId ={toggleFavoriteByRecipeId}
        />
      );
    } else if(user) {
      return (
        <RecipeCard  key={recipe.id}
          recipeData={recipe}
          user={user}
          toggleFavoriteByRecipeId={toggleFavoriteByRecipeId}
        />
      );

    } else {
      return (
        <RecipeCard key={recipe.id} recipeData={recipe}/>
      );
    }
  }

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={3}
        style={{marginTop:20, marginRight: "auto", marginLeft: "auto"}}
        md={8}
        item
      >
        {recipes.map((recipe, index) => (
          <Grid item md={6} key={index}>
            {renderRecipeCard(recipe)}
          </Grid>
        ))}
        {recipes.length === 0 && <Typography variant="h4">Keine Rezepte gefunden...</Typography>}
      </Grid>
    </>
  );
}