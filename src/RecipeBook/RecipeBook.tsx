import React from "react";
import {RecipeData} from "../interface";
import {Grid} from "@mui/material";
import RecipeCard from "./RecipeCard";

interface props {
  recipes: RecipeData[];
  deleteRecipe: (id:number)=>void;
}

export function RecipeBook({recipes, deleteRecipe}: props) {

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
        style={{marginTop:20, marginRight: "auto", marginLeft: "auto"}}
        md={8}
        item
      >
        {recipes.map((recipe, index) => (
          <Grid item md={6} key={index}>
            <RecipeCard recipeData={recipes[index]}  deleteRecipe={deleteRecipe}/>
          </Grid>
        ))}
      </Grid>
    </>
  );
}