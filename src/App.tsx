import React, {useEffect, useState} from 'react';
import './App.css';

import RecipeView from "./Recipe.View";
import Recipe from "./Recipe";
import {Ingredient} from "./Ingredient";
import axios from "axios";

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('http://localhost:3001/recipe');
      createRecipes(data);
    };
    fetchData();
    }, []
  );

  const createRecipes = ( data : Recipe[]) => {
    const recipesExport: Recipe[] = [];

    data.forEach( (recipe) => {
      const ingredients: Ingredient[] = [];
      recipe.ingredients.forEach( (ingredient) => {
          ingredients.push(
            new Ingredient(
              ingredient.name,
              ingredient.amount,
              ingredient.unit)
          );
          console.log(ingredient.name);
        }
      );
      recipesExport.push(new Recipe(
        recipe.name,
        recipe.time,
        recipe.level,
        recipe.rating,
        ingredients,
        recipe.preparation,
        recipe.id
      ))
    })
    setRecipes(recipesExport);
  }


  const recipeTest = new Recipe(
    "Nudeln mit Tomatensoße",
    30,
    1,
    5,
    [
      new Ingredient("Nudeln",500,"g"),
      new Ingredient("passierte Tomaten",500,"g"),
      new Ingredient("Zwiebeln",2,"stück"),
      new Ingredient("Knoblauch",2,"Zehen"),
      new Ingredient("Öl"),
      new Ingredient("Gewürze"),
    ],
    [
      "Nudeln wie auf Packung kochen",
      "Zwiebel und Knoblauch in kleine Würfel schneiden",
      "Öl in eine Pfanne erhitzen",
      "Zwiebel auf mittlere Temperatur für ca. 5 min anbraten",
      "Knoblauch in die Pfanne geben und weitere 2 min anbraten",
      "die passierten Tomaten dazugeben und kurz köcheln lassen",
      "die Soße mit Salz, Pfeffer und Chilie abschmecken",
      "Fertig"
    ]
  );



  return (
    <div className="App">
      <RecipeView recipe={recipeTest}/>
    </div>
  );
}

export default App;
