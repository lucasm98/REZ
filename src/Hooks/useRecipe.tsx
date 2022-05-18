import React, {useEffect, useState} from "react";
import {RecipeData} from "../interface";
import axios from "axios";

export default function useRecipe():[RecipeData[],(recipe:RecipeData)=>void,(id:number) => void] {
  const [recipes,setRecipes] = useState<RecipeData[]>([]);

  const getNextFreeId = ():number => {
    let id=0;
    const usedIds:number[]=[];
    recipes.forEach((recipe:RecipeData,index:number)=> {
      usedIds.push(recipe.id!);
    });
    while(usedIds.includes(id)){
      id++;
    }
    return id;
  }

  const addRecipe = async (data:RecipeData) => {

    data.id=getNextFreeId();

    await axios.post('http://localhost:3001/recipe', data,{
      headers: {
        'content-type': 'application/json',
      }
    })
    setRecipes(recipes => [...recipes,data]);

    console.log("Recipe Posted | ID: "+data.id+"| Name:"+data.name);
  }

  const deleteRecipe = async (id: number) => {
    await axios.delete(`http://localhost:3001/recipe/${id}`);
    setRecipes(recipes => recipes.filter((recipe:RecipeData) => recipe.id !== id));
  }

  useEffect(() => {
      let recipesData:any = null;
      const fetchData = async () => {
        const { data } = await axios.get('http://localhost:3001/recipe');
        recipesData = data;
      };
      fetchData().then(()=>( setRecipes(recipesData)));
    }, []
  );



  return [recipes,addRecipe,deleteRecipe];
}