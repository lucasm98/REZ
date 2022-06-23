import React, {useState} from 'react';
import './App.css';

import {RecipeBook} from "./RecipeBook/RecipeBook";
import {Navigate, Route, Routes} from "react-router-dom";
import TopAppBar from "./Nav";
import {RecipeForm} from "./RecipeForm/RecipeForm";
import useRecipe from "./Hooks/useRecipe";
import Home from './Home/Home';
import {Container} from "@mui/material";
import Login from "./Login";
import useUser from "./Hooks/useUser";
import {RecipeData} from "./interface";
import {UserForm} from "./UserForm/UserForm";
import {Recipe} from "./Recipe/Recipe";
import {User} from "./User/User";



function App() {
  const [recipes, updateRecipe, deleteRecipe] = useRecipe();
  const [searchInput, setSearchInput] = useState("");
  const {isLoggedIn, loggIn, loggOut, users, user, toggleFavoriteByRecipeId,updateUser,deleteUser} = useUser();
  const [activeRecipeId,setActiveRecipeId] = useState<number>(-1);

  const filterRecipesByName = () => recipes.filter((recipe: RecipeData, index: number) => (recipe.name.toLowerCase().includes(searchInput.toLowerCase())));
  const filterRecipesByCreator = () => recipes.filter((recipe: RecipeData, index: number) => (recipe.user === user?.id));
  const filterRecipesByFavorites = () => recipes.filter((recipe: RecipeData, index: number) => (user?.favorites.includes(recipe.id)));

  const getRecipeById = () => recipes.filter((recipe: RecipeData) => (recipe.id === activeRecipeId))[0];
  const isRecipeFromCurrentUser = (): boolean => (user.favorites.includes(activeRecipeId));

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
        <Route path="/recipe/:recipeId" element={<Recipe recipes={recipes}></Recipe>} />
        <Route path="/register" element={<UserForm updateUser={updateUser}/>} />
        <Route path="/login" element={<Login loggIn={loggIn} isLoggedIn={isLoggedIn}/>}/>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    );
  }

  const getRoutesPrivate = () => {
    return (
      <Routes>
        <Route path="/"
               element={<Home user={user}/>}/>
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
        <Route path="/recipe/:recipeId" element={<Recipe recipes={recipes} ></Recipe>} />
        <Route path="/edit/:recipeId" element={
          // (isRecipeFromCurrentUser()) ?
            <RecipeForm updateRecipe={updateRecipe} user={user.id} recipes={recipes}></RecipeForm>
            // :<Navigate to={`/recipe/${activeRecipeId}`}/>
        } />
        <Route path="/add" element={<RecipeForm updateRecipe={updateRecipe} user={user.id}/>}/>
        <Route path="/account" element={<User userData={user} deleteUser={deleteUser} loggOut={loggOut} recipes={recipes}/>}/>
        <Route path="/account/edit" element={<UserForm updateUser={updateUser} user={user}/>} />
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
