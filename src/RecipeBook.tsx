import React from "react";
import {RecipeData} from "./interface";
import {Grid, Card} from "@mui/material";
import RecipeCard from "./RecipeCard";

interface props {
  recipes: RecipeData[];
}

export function RecipeBook({recipes}: props) {

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
          <Grid item md={6}>
            <RecipeCard {...recipes[index]}/>
          </Grid>
        ))}
      </Grid>
    </>
  );
}