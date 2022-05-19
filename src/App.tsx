import React, { useState} from 'react';
import './App.css';

import {RecipeBook} from "./RecipeBook/RecipeBook";
import {Navigate, Route, Routes} from "react-router-dom";
import TopAppBar from "./Nav";
import RecipeForm from "./RecipeForm";
import useRecipe from "./Hooks/useRecipe";
import Main from './Main';
import {Container} from "@mui/material";
import {RecipeData} from "./interface";
import Login from "./Login";
import useUser from "./Hooks/useUser";

function App() {
  const [recipes,addRecipe,deleteRecipe] = useRecipe();
  const [searchInput, setSearchInput] = useState("");
  const [isLoggedIn,loggIn,loggOut,users,user,setUserData] = useUser();

  const getFilteredRecipes = (filter:string):RecipeData[] => {
    console.log("getFilteredRecipes: "+filter);
    let returnRecipeData:RecipeData[];
    switch (filter) {
      case "name":
        returnRecipeData =  recipes.filter((recipe:RecipeData, index:number)=>(recipe.name.toLowerCase().includes(searchInput.toLowerCase())));
        break;
      case "user":
        returnRecipeData =  recipes.filter((recipe:RecipeData, index:number)=>(recipe.user === user.id));
        break;
      case "favorites":
        returnRecipeData = recipes.filter((recipe:RecipeData, index:number)=>(user.favorites.includes(recipe.id)));
        break;
      default:
        returnRecipeData = recipes;
        break;
    }
    return returnRecipeData;
  }

  return (
    <div className="App">
      <TopAppBar
        setSearchInput={setSearchInput}
        searchInput={searchInput}
        isLoggedIn={isLoggedIn}
        loggOut={loggOut}
      />
      <Container sx={{marginTop : "20px",}}  maxWidth="xl" >
        <Routes>
          <Route path="/"
                 element={isLoggedIn ? <Main />: <RecipeBook recipes={recipes} searchInput={searchInput} setSearchInput={setSearchInput}/>} />
          <Route path="/recipes"
                 element={
                   <RecipeBook
                     recipes={recipes}
                     searchInput={searchInput}
                     setSearchInput={setSearchInput}
                     setUserData={setUserData}
                     user={user}
                   />
                 }/>
          <Route path="/book"
                 element={
                   <RecipeBook
                     recipes={getFilteredRecipes("favorites")}
                     searchInput={searchInput}
                     setSearchInput={setSearchInput}
                     setUserData={setUserData}
                     user={user}
                   />
                 }/>
          <Route path="/created"
                 element={
                   <RecipeBook
                     recipes={getFilteredRecipes("user")}
                     searchInput={searchInput}
                     setSearchInput={setSearchInput}
                     setUserData={setUserData}
                     deleteRecipe={deleteRecipe}
                     user={user}
                   />
                 }/>
          <Route path="/search/:input"
                 element={
                   <RecipeBook
                     recipes={getFilteredRecipes("name")}
                     searchInput={searchInput}
                     setSearchInput={setSearchInput}
                     setUserData={setUserData}
                     user={user}
                   />
                 }/>
          <Route path="/add"    element={<RecipeForm  addRecipe={addRecipe} user={user.id}/>} />
          <Route path="/login"  element={<Login loggIn={loggIn} isLoggedIn={isLoggedIn}/>} />
          <Route path="*"       element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
