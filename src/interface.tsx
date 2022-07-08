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

export interface UseUserData {
  getUserData: ()=> Promise<UserData[]>,
  addUserData: (userData:UserData) => Promise<UserData>,
  updateUserData: (userData:UserData)=> Promise<UserData>,
  deleteUserData: (id:number)=> Promise<UserData>
}

export interface UseRecipeData {
  getRecipeList: ()=> Promise<RecipeData[]>,
  addRecipe: (data:RecipeData) => Promise<RecipeData>,
  updateRecipe: (data:RecipeData)=> Promise<RecipeData>,
  deleteRecipe: (id:number)=> Promise<RecipeData>
}