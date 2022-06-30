import React from "react";

export interface Ingredient{
  name: string,
  amount?: number,
  unit?: string,
}

export interface RecipeData{
  name: string,
  time: number,
  level: number,
  rating: number,
  user: number,
  persons: number,
  ingredients: Ingredient[],
  preparation: string[],
  id:number,
}

export interface UserData {
  name: string;
  username: string;
  password: string;
  email: string;
  id:number;
  favorites:number[];
  shoppingList: ShoppingListEntry[];
}
export interface ShoppingListEntry {
  recipe: number,
  amount: number
}