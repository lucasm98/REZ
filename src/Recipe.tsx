import React from "react";
import './Recipe.css';
import {RecipeData} from "./interface";


const Recipe = (recipeData: RecipeData) => {

  function renderIngredients(): JSX.Element[] {
    return  recipeData.ingredients.map((ingredient, index) => (
        <tr key={index}>
          <td>{ingredient.name}</td>
          <td>{ingredient.amount} {ingredient.unit}</td>
        </tr>
      ))
  }

  function renderPreparation(): JSX.Element[] {
    return  recipeData.preparation.map((step, index) => (
      <li key={index}>{step}</li>
    ))
  }

  return(
    <div className="Recipe">
      <table>
        <caption>Rezept</caption>
        <tbody>
        <tr>
          <td>Name:</td>
          <td>{recipeData.name}</td>
        </tr>
        <tr>
          <td>Dauer:</td>
          <td>{recipeData.time}min</td>
        </tr>
        <tr>
          <td>Schwierigkeit:</td>
          <td>{recipeData.level}</td>
        </tr>
        <tr>
          <td>Bewertung:</td>
          <td>{recipeData.rating}</td>
        </tr>
        <tr>
          <td colSpan={2}>
            <table className="ingredients">
              <thead>
              <tr>
                <td>Zutaten</td>
                <td>Menge</td>
              </tr>
              </thead>
              <tbody>
                {renderIngredients()}
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>Zubereitung:</td>
        </tr>
        <tr>
          <td colSpan={2}>
            <ol>
              {renderPreparation()}
            </ol>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Recipe;