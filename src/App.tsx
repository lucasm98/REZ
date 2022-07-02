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
import {RecipeData, UserData} from "./interface";
import {UserForm} from "./UserForm/UserForm";
import {Recipe} from "./Recipe/Recipe";
import {User} from "./User/User";
import {UserList} from "./Admin/UserList/UserList";
import {RecipeList} from "./Admin/RecipeList/RecipeList";
import {ShoppingList} from "./ShoppingList/ShoppingList";



function App() {
  const {recipeList, updateRecipe, deleteRecipe} = useRecipe();
  const [searchInput, setSearchInput] = useState("");
  const {isLoggedIn, loggIn, loggOut, getUserList, getCurrentUser, toggleFavoriteByRecipeId,updateUser,deleteUser,addRecipeToShoppingList} = useUser();

  const filterRecipeListByName = () => recipeList.filter((recipe: RecipeData) => (recipe.name.toLowerCase().includes(searchInput.toLowerCase())));
  const filterRecipeListByCreator = () => recipeList.filter((recipe: RecipeData) => (recipe.user === getCurrentUser()?.id));
  const filterRecipeListByFavorites = () => recipeList.filter((recipe: RecipeData) => (currentUser?.favorites.includes(recipe.id)));

  const currentUser:UserData =  (getCurrentUser());
  const userList:UserData[] =  (getUserList());

  const getAdminRoutes = () =>(
    <Route path="/admin">
      <Route path="/admin/user">
        <Route path="/admin/user/:userId" element={<User getCurrentData={getCurrentUser} deleteUser={deleteUser} loggOut={loggOut} recipeList={recipeList} userList={userList}/>}/>
        <Route path="/admin/user/edit/:userId" element={<UserForm updateUser={updateUser} getCurrentData={getCurrentUser} userList={userList}/>}/>
        <Route path="/admin/user" element={<UserList getUserList={getUserList} recipeList={recipeList} deleteUser={deleteUser}/>}/>
      </Route>
      <Route path="/admin/recipe">
        <Route path="/admin/recipe/edit/:recipeId" element={<RecipeForm updateRecipe={updateRecipe} currentUser={currentUser.id} recipeList={recipeList} admin></RecipeForm>}/>
        <Route path="/admin/recipe" element={<RecipeList userList={userList} recipeList={recipeList} deleteRecipe={deleteRecipe}/>}/>
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
                   getCurrentUser={getCurrentUser}
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
        <Route path="/recipes"
               element={
                 <RecipeBook
                   recipeList={recipeList}
                   searchInput={searchInput}
                   setSearchInput={setSearchInput}
                   toggleFavoriteByRecipeId={toggleFavoriteByRecipeId}
                   getCurrentUser={getCurrentUser}
                 />
               }/>
        <Route path="/book"
               element={
                 <RecipeBook
                   recipeList={filterRecipeListByFavorites()}
                   searchInput={searchInput}
                   setSearchInput={setSearchInput}
                   toggleFavoriteByRecipeId={toggleFavoriteByRecipeId}
                   getCurrentUser={getCurrentUser}
                 />
               }/>
        <Route path="/created"
               element={
                 <RecipeBook
                   recipeList={filterRecipeListByCreator()}
                   searchInput={searchInput}
                   setSearchInput={setSearchInput}
                   toggleFavoriteByRecipeId={toggleFavoriteByRecipeId}
                   deleteRecipe={deleteRecipe}
                   getCurrentUser={getCurrentUser}
                 />
               }/>
        <Route path="/search/:input"
               element={
                 <RecipeBook
                   recipeList={filterRecipeListByName()}
                   searchInput={searchInput}
                   setSearchInput={setSearchInput}
                   toggleFavoriteByRecipeId={toggleFavoriteByRecipeId}
                   getCurrentUser={getCurrentUser}
                 />
               }/>
        <Route path="/recipe/:recipeId" element={<Recipe recipeList={recipeList} addRecipeToShoppingList={addRecipeToShoppingList} ></Recipe>} />
        <Route path="/edit/:recipeId" element={<RecipeForm updateRecipe={updateRecipe} currentUser={currentUser.id} recipeList={recipeList}></RecipeForm>}/>
        <Route path="/add" element={<RecipeForm updateRecipe={updateRecipe} currentUser={currentUser.id}/>}/>
        <Route path="/account" element={<User getCurrentData={getCurrentUser} deleteUser={deleteUser} loggOut={loggOut} recipeList={recipeList}/>}/>
        <Route path="/account/edit" element={<UserForm updateUser={updateUser} getCurrentData={getCurrentUser}/>} />
        <Route path="/shoppinglist" element={<ShoppingList recipeList={recipeList} getCurrentUser={getCurrentUser} updateUser={updateUser} />}/>
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
