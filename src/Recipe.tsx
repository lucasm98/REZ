import React from "react";
import './Recipe.css';

export default function Recipe () {
  return (
    <div className="Recipe">
      <table>
        <caption>Rezept</caption>
        <tbody>
          <tr><td>Name: </td><td>Nudeln mit Tomatensoße</td></tr>
          <tr><td>Dauer: </td><td>30 min</td></tr>
          <tr><td>Schwierigkeit: </td><td>Einfach</td></tr>
          <tr><td>Bewertung: </td><td>5/5</td></tr>
          <tr><td colSpan={2}>
            <table className="ingredients">
              <thead><tr><td>Zutaten</td><td>Menge</td></tr></thead>
              <tbody>
                <tr><td>Nudeln</td><td>500g</td></tr>
                <tr><td>passierte Tomaten</td><td>500g</td></tr>
                <tr><td>Zwiebeln</td><td>2 Stück</td></tr>
                <tr><td>Knoblauch</td><td>2 Zehen</td></tr>
                <tr><td colSpan={2}>Öl</td></tr>
                <tr><td colSpan={2}>Gewürze</td></tr>
              </tbody>
            </table>
          </td></tr>
          <tr><td colSpan={2}>Zubereitung:</td></tr>
          <tr><td colSpan={2} >
            <ol>
              <li>Nudeln wie auf Packung kochen</li>
              <li>Zwiebel und Knoblauch in kleine Würfel schneiden</li>
              <li>Öl in eine Pfanne erhitzen</li>
              <li>Zwiebel auf mittlere Temperatur für ca. 5 min anbraten</li>
              <li>Knoblauch in die Pfanne geben und weitere 2 min anbraten</li>
              <li>die passierten Tomaten dazugeben und kurz köcheln lassen</li>
              <li>die Soße mit Salz, Pfeffer und Chilie abschmecken</li>
              <li>Fertig</li>
            </ol>
          </td></tr>
        </tbody>
      </table>

    </div>
  );
}