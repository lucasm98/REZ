import React, {useEffect} from "react";
import {RecipeData} from "../interface";
import {Grid} from "@mui/material";
import RecipeCard from "./RecipeCard";
import {useParams} from "react-router-dom";

interface props {
  recipes: RecipeData[];
  searchInput: string;
  setSearchInput: (input:string)=> void;
  deleteRecipe?: (id:number)=>void;
}

export function RecipeBook({recipes, deleteRecipe,searchInput, setSearchInput}: props) {
  const input = useParams();

  useEffect( ()=> {
      if(input.input !== searchInput && searchInput === "" && input.input !== undefined) setSearchInput(input.input!.toString());
    },[input]
  );

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
            {deleteRecipe && <RecipeCard recipeData={recipes[index]}  deleteRecipe={deleteRecipe}/>}
            {!deleteRecipe && <RecipeCard recipeData={recipes[index]}  />}
          </Grid>
        ))}
      </Grid>
    </>
  );
}