export interface Ingredient{
  id:number,
  name: string,
  amount?: number,
  unit?: string,
}

export interface RecipeData{
  name: string,
  time: number,
  level: number,
  rating: number,
  user: number,
  persons: number,
  ingredients: Ingredient[],
  preparation: string[],
  id:number,
}

export interface UserData {
  id:number;
  name: string;
  username: string;
  password: string;
  email: string;
  admin: boolean;
  favorites:number[];
  shoppingList: ShoppingListEntry[];
}
export interface ShoppingListEntry {
  recipe: number,
  amount: number,
  checked: boolean[],
  allChecked: boolean,
}

export interface UseData {
  getData: ()=> UserData[]|RecipeData[],
  addData: (data:UserData|RecipeData) => void,
  updateData: (data:UserData|RecipeData)=> void,
  deleteData: (id:number)=> void
}