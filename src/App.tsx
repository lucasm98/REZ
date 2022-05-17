import React, {useEffect, useState} from 'react';
import './App.css';

import {RecipeBook} from "./RecipeBook/RecipeBook";
import {Navigate, Route, Routes, useParams} from "react-router-dom";
import TopAppBar from "./Nav";
import RecipeForm from "./RecipeForm";
import useRecipe from "./useRecipe";
import Main from './Main';
import {Container} from "@mui/material";
import {RecipeData} from "./interface";

function App() {
  const [recipes,addRecipe,deleteRecipe] = useRecipe();
  const [searchInput, setSearchInput] = useState("");
  const input = useParams();

  function getFilteredRecipes(filter:string):RecipeData[] {
    return recipes.filter((recipe:RecipeData, index:number)=>(recipe.name.toLowerCase().includes(filter)));
  }

  useEffect( ()=> {
      console.log(input);
    },[input]
  );

  return (
    <div className="App">
      <TopAppBar setSearchInput={setSearchInput}/>
      <Container sx={{marginTop : "20px",}}  maxWidth="xl" >
        <Routes>
          <Route path="/"       element={<Main />} />
          <Route path="/book"   element={<RecipeBook recipes={recipes} deleteRecipe={deleteRecipe}/>} />
          <Route path="/search/:input" element={searchInput==="" ? <Navigate to="/"/> : <RecipeBook recipes={getFilteredRecipes(searchInput)} deleteRecipe={deleteRecipe}/>} />
          <Route path="/add"    element={<RecipeForm  addRecipe={addRecipe}/>} />
          <Route path="*"       element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
