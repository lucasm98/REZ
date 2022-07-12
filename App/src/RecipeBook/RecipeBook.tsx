import React, {useEffect} from "react";
import {RecipeData, UserData} from "../interface";
import {Grid, Typography} from "@mui/material";
import RecipeCard from "./RecipeCard";
import {useParams} from "react-router-dom";

interface props {
  recipeList: RecipeData[];
  searchInput: string;
  setSearchInput: (input:string)=> void;
  getCurrentUser?: () => UserData;
  toggleFavoriteByRecipeId?: (id:number)=>boolean,
  deleteRecipe?: (id:number)=>void;
}

export function RecipeBook({recipeList, deleteRecipe,searchInput, setSearchInput,getCurrentUser,toggleFavoriteByRecipeId}: props) {
  const input = useParams();

  useEffect( ()=> {
      if(input.input !== searchInput && searchInput === "" && input.input !== undefined) setSearchInput(input.input!.toString());
    },[input]
  );



  const renderRecipeCard = (recipe:RecipeData):any => {
    if(getCurrentUser && recipe.user === getCurrentUser()?.id){
      return (
        <RecipeCard   key={recipe.id}
                      recipeData={recipe}
                      deleteRecipe={deleteRecipe}
                      user={getCurrentUser()}
                      toggleFavoriteByRecipeId ={toggleFavoriteByRecipeId}
        />
      );
    }else if(getCurrentUser) {
      return (
        <RecipeCard   key={recipe.id}
                      recipeData={recipe}
                      user={getCurrentUser()}
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
        {recipeList.map((recipe, index) => (
          <Grid item md={6} key={index}>
            {renderRecipeCard(recipe)}
          </Grid>
        ))}
        {recipeList.length === 0 && <Typography variant="h4">Keine Rezepte gefunden...</Typography>}
      </Grid>
    </>
  );
}