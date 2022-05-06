import {Ingredient} from "./Ingredient";

export default class Recipe{

  constructor(
    public name: string,
    public time: number,
    public level: number,
    public rating: number,
    public ingredients: Ingredient[],
    public preparation: string[],
  ) {
      this.name = name;
      this.time = time;
      this.level= level;
      this.rating = rating;
      this.ingredients = ingredients;
      this.preparation = preparation;
  }
}