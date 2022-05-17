import React, {useEffect, useState} from 'react';
import './App.css';

import {RecipeBook} from "./RecipeBook/RecipeBook";
import {Navigate, Route, Routes} from "react-router-dom";
import TopAppBar from "./Nav";
import RecipeForm from "./RecipeForm";
import useRecipe from "./useRecipe";
import Main from './Main';
import {Container} from "@mui/material";
import {RecipeData} from "./interface";

function App() {
  const [recipes,addRecipe,deleteRecipe] = useRecipe();
  const [searchInput, setSearchInput] = useState("");

  function getFilteredRecipes(filter:string):RecipeData[] {
    return recipes.filter((recipe:RecipeData, index:number)=>(recipe.name.toLowerCase().includes(filter)));
  }

  return (
    <div className="App">
      <TopAppBar setSearchInput={setSearchInput} searchInput={searchInput}/>
      <Container sx={{marginTop : "20px",}}  maxWidth="xl" >
        <Routes>
          <Route path="/"       element={<Main />} />
          <Route path="/book"   element={
                                  <RecipeBook
                                    recipes={recipes}
                                    searchInput={searchInput}
                                    setSearchInput={setSearchInput}
                                    deleteRecipe={deleteRecipe}
                                  />
                                }/>
          <Route path="/search/:input"  element={
                                          <RecipeBook
                                            recipes={getFilteredRecipes(searchInput)}
                                            deleteRecipe={deleteRecipe}
                                            searchInput={searchInput}
                                            setSearchInput={setSearchInput}
                                          />
                                        }/>
          <Route path="/add"    element={<RecipeForm  addRecipe={addRecipe}/>} />
          <Route path="*"       element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
