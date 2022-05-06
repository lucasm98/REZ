import React from "react";
import './Recipe.css';

import Recipe from "./Recipe";

interface props{
  recipe: Recipe;
}

export default function RecipeView ( {recipe}: props) {

  return (
    <div className="Recipe">
      <table>
        <caption>Rezept</caption>
        <tbody>
        <tr><td>Name: </td><td>{recipe.name}</td></tr>
        <tr><td>Dauer: </td><td>{recipe.time}min</td></tr>
        <tr><td>Schwierigkeit: </td><td>{recipe.level}</td></tr>
        <tr><td>Bewertung: </td><td>{recipe.rating}</td></tr>
        <tr><td colSpan={2}>
          <table className="ingredients">
            <thead><tr><td>Zutaten</td><td>Menge</td></tr></thead>
            <tbody>
              {Object.keys(recipe.ingredients).map(index => {
                const ingredient = recipe.ingredients.at(parseInt(index));
                const colSpan:number = ingredient!.amount ? 1: 2;
                return (
                  <tr key={index}>
                    <td colSpan={colSpan}>{ingredient!.name}</td>
                    {colSpan===1 && <td>{ingredient?.amount} {ingredient?.unit}</td>}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td></tr>
        <tr><td colSpan={2}>Zubereitung:</td></tr>
        <tr><td colSpan={2} >
          <ol>
            {Object.keys(recipe.preparation).map(index => {
              const step = recipe.preparation[parseInt(index)];
              return <li key={index}>{step}</li>
            })}
          </ol>
        </td></tr>
        </tbody>
      </table>

    </div>
  );
}