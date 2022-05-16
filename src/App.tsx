import React from 'react';
import './App.css';

import Recipe from "./Recipe/Recipe";
import {RecipeBook} from "./RecipeBook/RecipeBook";
import {Route, Routes} from "react-router-dom";
import TopAppBar from "./Nav";
import RecipeForm from "./RecipeForm";
import useRecipe from "./useRecipe";

function App() {
  const [recipes,addRecipe,deleteRecipe] = useRecipe();


  function renderRecipe() {
    if(recipes !== null && recipes[0] !== undefined) {
      return (
         <Recipe
          name={recipes[0].name}
          time={recipes[0].time}
          level={recipes[0].level}
          rating={recipes[0].rating}
          ingredients={recipes[0].ingredients}
          preparation={recipes[0].preparation}
        />
      );
    }
  }

  return (
    <div className="App">
      <TopAppBar/>
      <Routes>
        <Route path="/"       element={renderRecipe()} />
        <Route path="/book"   element={<RecipeBook recipes={recipes} deleteRecipe={deleteRecipe}/>} />
        <Route path="/saved"  element={<RecipeBook recipes={recipes} deleteRecipe={deleteRecipe}/>} />
        <Route path="/add"    element={<RecipeForm  addRecipe={addRecipe}/>} />
        <Route path="*"       element={renderRecipe()} />
      </Routes>
    </div>
  );
}

export default App;
