import {useEffect, useState} from "react";
import {RecipeData} from "../interface";
import axios from "axios";

interface ReturnProps {
  recipeList: RecipeData[],
  updateRecipe: (recipe:RecipeData)=>void,
  deleteRecipe: (id:number) => void
}

export default function useRecipe():ReturnProps{
  const [recipeList,setRecipeList] = useState<RecipeData[]>([]);

  const getNextFreeId = ():number => {
    let id=0;
    const usedIds:number[]=[];
    recipeList.forEach((recipe:RecipeData)=> {
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
        setRecipeList(recipes => [...recipes,data]);
      })
    } else {
      correctRecipe(data)
        .then(recipe => {
          setRecipeList(recipes => [...recipes.filter((recipeData:RecipeData)=>(recipeData.id!==data.id)),recipe]);
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
    setRecipeList(recipes => recipes.filter((recipe:RecipeData) => recipe.id !== id));
  }

  useEffect(() => {
      let recipesData:any = null;
      const fetchData = async () => {
        const { data } = await axios.get('http://localhost:3001/recipe');
        recipesData = data;
      };
      fetchData().then(()=>( setRecipeList(recipesData)));
    }, []
  );



  return {recipeList,updateRecipe,deleteRecipe};
}