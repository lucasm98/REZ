import React, {useEffect} from "react";
import axios from "axios";
import Recipe from "./Recipe";
import {Ingredient} from "./Ingredient";

export default function useRecipes() {


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
      new Ingredient("Gewürze")
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
}