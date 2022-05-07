import React from "react";

interface Ingredient{
  name: string,
  amount?: number,
  unit?: string,
}

export interface RecipeData{
  name: string,
  time: number,
  level: number,
  rating: number,
  ingredients: Ingredient[],
  preparation: string[],
  id?:number,
}