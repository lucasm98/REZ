import React from "react";
import './Recipe.css';

import Recipe from "./Recipe";
import {Ingredient} from "./Ingredient";


export default function RecipeView () {
  const recipe = new Recipe(
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
                console.log(colSpan);
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