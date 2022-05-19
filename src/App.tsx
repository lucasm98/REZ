import React, { useState} from 'react';
import './App.css';

import {RecipeBook} from "./RecipeBook/RecipeBook";
import {Navigate, Route, Routes} from "react-router-dom";
import TopAppBar from "./Nav";
import RecipeForm from "./RecipeForm";
import useRecipe from "./Hooks/useRecipe";
import Main from './Main';
import {Container} from "@mui/material";
import Login from "./Login";
import useUser from "./Hooks/useUser";

function App() {
  const [recipes,addRecipe,deleteRecipe] = useRecipe();
  const [searchInput, setSearchInput] = useState("");
  const [isLoggedIn,loggIn,loggOut,users,user,setUserData] = useUser();

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
                     recipes={recipes}
                     searchInput={searchInput}
                     setSearchInput={setSearchInput}
                     setUserData={setUserData}
                     user={user}
                     filter={"favorites"}
                   />
                 }/>
          <Route path="/created"
                 element={
                   <RecipeBook
                     recipes={recipes}
                     searchInput={searchInput}
                     setSearchInput={setSearchInput}
                     setUserData={setUserData}
                     deleteRecipe={deleteRecipe}
                     user={user}
                     filter={"user"}
                   />
                 }/>
          <Route path="/search/:input"
                 element={
                   <RecipeBook
                     recipes={recipes}
                     searchInput={searchInput}
                     setSearchInput={setSearchInput}
                     setUserData={setUserData}
                     user={user}
                     filter={"name"}
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
