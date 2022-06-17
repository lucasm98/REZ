import React, {useEffect} from "react";
import './Recipe.css';
import {RecipeData} from "../interface";
import {useParams} from "react-router-dom";

interface Props {
  recipeData: RecipeData,
  setActiveRecipe: (id:number)=>void
}

export const Recipe = ({
  recipeData={
  "name":"",
  "time":0,
  "level":0,
  "rating":0,
  "user":0,
  "id":0,
  "ingredients":[],
  "preparation":[]
},
setActiveRecipe}:Props) => {
  const input = useParams();

  useEffect( ()=> {
      if(input.recipeId !== undefined) setActiveRecipe(parseInt(input.recipeId!))
    },[input]
  );

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