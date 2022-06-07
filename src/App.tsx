import React, {useState} from 'react';
import './App.css';

import {RecipeBook} from "./RecipeBook/RecipeBook";
import {Navigate, Route, Routes} from "react-router-dom";
import TopAppBar from "./Nav";
import {RecipeForm} from "./RecipeForm/RecipeForm";
import useRecipe from "./Hooks/useRecipe";
import Main from './Main';
import {Container} from "@mui/material";
import Login from "./Login";
import useUser from "./Hooks/useUser";
import {RecipeData} from "./interface";

function App() {
  const [recipes, addRecipe, deleteRecipe] = useRecipe();
  const [searchInput, setSearchInput] = useState("");
  const [isLoggedIn, loggIn, loggOut, users, user, toggleFavoriteByRecipeId] = useUser();

  const filterRecipesByName = () => recipes.filter((recipe: RecipeData, index: number) => (recipe.name.toLowerCase().includes(searchInput.toLowerCase())));
  const filterRecipesByCreator = () => recipes.filter((recipe: RecipeData, index: number) => (recipe.user === user?.id));
  const filterRecipesByFavorites = () => recipes.filter((recipe: RecipeData, index: number) => (user?.favorites.includes(recipe.id)));

  const getRoutesPublic = () => {

    return (
      <Routes>
        <Route path="/"
               element={
                 <RecipeBook
                   recipes={recipes}
                   searchInput={searchInput}
                   setSearchInput={setSearchInput}/>}
        />
        <Route path="/search/:input"
               element={
                 <RecipeBook
                   recipes={recipes}
                   searchInput={searchInput}
                   setSearchInput={setSearchInput}
                   toggleFavoriteByRecipeId={toggleFavoriteByRecipeId}
                   user={user}
                   filter={"name"}
                 />
               }/>
        <Route path="/login" element={<Login loggIn={loggIn} isLoggedIn={isLoggedIn}/>}/>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    );
  }

  const getRoutesPrivate = () => {
    return (
      <Routes>
        <Route path="/"
               element={<Main/>}/>
        <Route path="/recipes"
               element={
                 <RecipeBook
                   recipes={recipes}
                   searchInput={searchInput}
                   setSearchInput={setSearchInput}
                   toggleFavoriteByRecipeId={toggleFavoriteByRecipeId}
                   user={user}
                 />
               }/>
        <Route path="/book"
               element={
                 <RecipeBook
                   recipes={filterRecipesByFavorites()}
                   searchInput={searchInput}
                   setSearchInput={setSearchInput}
                   toggleFavoriteByRecipeId={toggleFavoriteByRecipeId}
                   user={user}
                 />
               }/>
        <Route path="/created"
               element={
                 <RecipeBook
                   recipes={filterRecipesByCreator()}
                   searchInput={searchInput}
                   setSearchInput={setSearchInput}
                   toggleFavoriteByRecipeId={toggleFavoriteByRecipeId}
                   deleteRecipe={deleteRecipe}
                   user={user}
                 />
               }/>
        <Route path="/search/:input"
               element={
                 <RecipeBook
                   recipes={filterRecipesByName()}
                   searchInput={searchInput}
                   setSearchInput={setSearchInput}
                   toggleFavoriteByRecipeId={toggleFavoriteByRecipeId}
                   user={user}
                 />
               }/>
        <Route path="/add" element={<RecipeForm addRecipe={addRecipe} user={user.id}/>}/>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    );
  }

  return (
    <div className="App">
      <TopAppBar
        setSearchInput={setSearchInput}
        searchInput={searchInput}
        isLoggedIn={isLoggedIn}
        loggOut={loggOut}
      />
      <Container sx={{marginTop: "20px",}} maxWidth="xl">
        {!isLoggedIn && getRoutesPublic()}
        {isLoggedIn && getRoutesPrivate()}
      </Container>
    </div>
  );
}

export default App;
