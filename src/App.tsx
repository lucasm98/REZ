import React, {useEffect, useState} from 'react';
import './App.css';

import axios from "axios";
import Recipe from "./Recipe";
import {RecipeData} from "./interface";

function App() {
  const [recipeState, setRecipeState] = useState<RecipeData[]>( []);

  useEffect(() => {
    let recipesData:any = null;
    const fetchData = async () => {
      const { data } = await axios.get('http://localhost:3001/recipe');
      recipesData = data;
    };
    fetchData().then(()=>( setRecipeState(recipesData)));
    }, []
  );

  function renderRecipe() {
    console.log(recipeState);
    if(recipeState !== null && recipeState[0] !== undefined) {
      return (
         <Recipe
          name={recipeState[0].name}
          time={recipeState[0].time}
          level={recipeState[0].level}
          rating={recipeState[0].rating}
          ingredients={recipeState[0].ingredients}
          preparation={recipeState[0].preparation}
        />
      );
    }
  }

  return (
    <div className="App">
      {renderRecipe()}
    </div>
  );
}

export default App;
