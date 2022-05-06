import React from "react";

interface Ingredient{
  name: string,
  amount?: number,
  unit?: string,
}

export interface RecipeData {
  name: string,
  time: number,
  level: number,
  rating: number,
  ingredients: Ingredient[],
  preparation: string[],
  id?:number,
}

const Recipe2 = (recipeData: RecipeData) => {

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

export default Recipe2;