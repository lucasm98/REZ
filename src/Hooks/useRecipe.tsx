import React, {useEffect, useState} from "react";
import {RecipeData, UserData} from "../interface";
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

  const updateRecipe = async (data:RecipeData) => {

    if(data.id===-1) {
      data.id = getNextFreeId();
      addRecipe(data).then(recipe => {
        setRecipes(recipes => [...recipes,data]);
      })
    } else {
      correctRecipe(data)
        .then(recipe => {
          setRecipes(recipes => [...recipes,recipe]);
      })
    }

    console.log("Recipe Posted | ID: "+data.id+"| Name:"+data.name);
  }

  const correctRecipe = async (recipe:RecipeData) => {
    await axios.patch(`http://localhost:3001/recipe/${recipe.id}`,recipe);
    return recipe;
  }

  const addRecipe = async (recipe:RecipeData) => {
    await axios.post('http://localhost:3001/recipe', recipe,{
      headers: {
        'content-type': 'application/json',
      }
    })
    return recipe;
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



  return [recipes,updateRecipe,deleteRecipe];
}