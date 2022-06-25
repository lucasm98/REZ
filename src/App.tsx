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
import {UserList} from "./Admin/UserList/UserList";
import {RecipeList} from "./Admin/RecipeList/RecipeList";



function App() {
  const [recipeList, updateRecipe, deleteRecipe] = useRecipe();
  const [searchInput, setSearchInput] = useState("");
  const {isLoggedIn, loggIn, loggOut, userList, currentUser, toggleFavoriteByRecipeId,updateUser,deleteUser} = useUser();

  const filterrecipeListByName = () => recipeList.filter((recipe: RecipeData, index: number) => (recipe.name.toLowerCase().includes(searchInput.toLowerCase())));
  const filterrecipeListByCreator = () => recipeList.filter((recipe: RecipeData, index: number) => (recipe.user === currentUser?.id));
  const filterrecipeListByFavorites = () => recipeList.filter((recipe: RecipeData, index: number) => (currentUser?.favorites.includes(recipe.id)));

  const getAdminRoutes = () =>(
    <Route path="/admin">
      <Route path="/admin/user">
        <Route path="/admin/user/:userId" element={<User currentUser={currentUser} deleteUser={deleteUser} loggOut={loggOut} recipeList={recipeList} userList={userList}/>}/>
        <Route path="/admin/user/edit/:userId" element={<UserForm updateUser={updateUser} currentUser={currentUser} userList={userList}/>}/>
        <Route path="/admin/user" element={<UserList userList={userList} recipeList={recipeList}/>}/>
      </Route>
      <Route path="/admin/recipe">
        <Route path="/admin/recipe/edit/:recipeId" element={<RecipeForm updateRecipe={updateRecipe} currentUser={currentUser.id} recipeList={recipeList} admin></RecipeForm>}/>
        <Route path="/admin/recipe" element={<RecipeList userList={userList} recipeList={recipeList}/>}/>
      </Route>
    </Route>
  )

  const getRoutesPublic = () => {
    return (
      <Routes>
        <Route path="/"
               element={
                 <RecipeBook
                   recipeList={recipeList}
                   searchInput={searchInput}
                   setSearchInput={setSearchInput}/>}
        />
        <Route path="/search/:input"
               element={
                 <RecipeBook
                   recipeList={recipeList}
                   searchInput={searchInput}
                   setSearchInput={setSearchInput}
                   toggleFavoriteByRecipeId={toggleFavoriteByRecipeId}
                   currentUser={currentUser}
                   filter={"name"}
                 />
               }/>
        <Route path="/recipe/:recipeId" element={<Recipe recipeList={recipeList}></Recipe>} />
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
               element={<Home currentUser={currentUser}/>}/>
        <Route path="/recipeList"
               element={
                 <RecipeBook
                   recipeList={recipeList}
                   searchInput={searchInput}
                   setSearchInput={setSearchInput}
                   toggleFavoriteByRecipeId={toggleFavoriteByRecipeId}
                   currentUser={currentUser}
                 />
               }/>
        <Route path="/book"
               element={
                 <RecipeBook
                   recipeList={filterrecipeListByFavorites()}
                   searchInput={searchInput}
                   setSearchInput={setSearchInput}
                   toggleFavoriteByRecipeId={toggleFavoriteByRecipeId}
                   currentUser={currentUser}
                 />
               }/>
        <Route path="/created"
               element={
                 <RecipeBook
                   recipeList={filterrecipeListByCreator()}
                   searchInput={searchInput}
                   setSearchInput={setSearchInput}
                   toggleFavoriteByRecipeId={toggleFavoriteByRecipeId}
                   deleteRecipe={deleteRecipe}
                   currentUser={currentUser}
                 />
               }/>
        <Route path="/search/:input"
               element={
                 <RecipeBook
                   recipeList={filterrecipeListByName()}
                   searchInput={searchInput}
                   setSearchInput={setSearchInput}
                   toggleFavoriteByRecipeId={toggleFavoriteByRecipeId}
                   currentUser={currentUser}
                 />
               }/>
        <Route path="/recipe/:recipeId" element={<Recipe recipeList={recipeList} ></Recipe>} />
        <Route path="/edit/:recipeId" element={<RecipeForm updateRecipe={updateRecipe} currentUser={currentUser.id} recipeList={recipeList}></RecipeForm>}/>
        <Route path="/add" element={<RecipeForm updateRecipe={updateRecipe} currentUser={currentUser.id}/>}/>
        <Route path="/account" element={<User currentUser={currentUser} deleteUser={deleteUser} loggOut={loggOut} recipeList={recipeList}/>}/>
        <Route path="/account/edit" element={<UserForm updateUser={updateUser} currentUser={currentUser}/>} />
        {currentUser && currentUser.id === 0 && getAdminRoutes() }
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
