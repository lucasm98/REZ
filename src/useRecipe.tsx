import React, {useCallback, useEffect, useState} from "react";
import {RecipeData} from "./interface";
import axios from "axios";

export default function useRecipe():[RecipeData[],(recipe:RecipeData)=>void] {
  const [recipes,setRecipes] = useState<RecipeData[]>([]);

  const addRecipe = useCallback(
    (data:RecipeData)=>{
      setRecipes(()=>{
        const list = recipes;
        list.push(data);
        return list;
      });
    },
    []
  );

  useEffect(() => {
      let recipesData:any = null;
      const fetchData = async () => {
        const { data } = await axios.get('http://localhost:3001/recipe');
        recipesData = data;
      };
      fetchData().then(()=>( setRecipes(recipesData)));
    }, []
  );

  return [recipes,addRecipe];
}