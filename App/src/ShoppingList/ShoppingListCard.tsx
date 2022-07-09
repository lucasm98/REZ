import React from 'react';
import {Ingredient, RecipeData, ShoppingListEntry} from "../interface";
import {Button, Card, CardContent, Checkbox, Grid, Stack, TextField, Typography} from "@mui/material";
import {RecipePersonsSchema, ShoppingListPersonsSchema} from "../Validation/RecipeValidation";

interface Props {
  recipe: RecipeData,
  getShoppingListEntry:(index:number)=>ShoppingListEntry
  shoppingListEntryIndex:number
  deleteRecipeFromShoppingList:(index:number)=>void
  updateShoppingList:(shoppingListIndex:number, shoppingListEntry:ShoppingListEntry) => void
}

export const ShoppingListCard = ({recipe,getShoppingListEntry,shoppingListEntryIndex,deleteRecipeFromShoppingList,updateShoppingList}:Props) => {
  const shoppingListEntry = getShoppingListEntry(shoppingListEntryIndex);

  const handelChange = (event:any):void => {
    const amount:number = event.target.value;
    ShoppingListPersonsSchema.isValid({"persons":amount})
      .then((valid)=>{
        if(valid) {
          updateShoppingList(shoppingListEntryIndex,{...shoppingListEntry,"amount": parseInt(amount.toString())});
        }
    });
    if(event.target.value==="")updateShoppingList(shoppingListEntryIndex,{...shoppingListEntry,"amount":0});
  }

  const checkAllIngredients = (event:any) => {
    const checked: boolean[] = new Array(recipe.ingredients.length).fill(event.target.checked);
    const allChecked: boolean = event.target.checked;
    updateShoppingList(shoppingListEntryIndex,{...shoppingListEntry,checked,allChecked});
  }

  const invertCheckbox = (event:any,index:number) => {
    let checked:boolean[] = shoppingListEntry.checked;
    checked[index] = event.target.checked;
    updateShoppingList(shoppingListEntryIndex,{...shoppingListEntry,checked});
  }

  return (
    <Grid
      item
      key={shoppingListEntry.recipe}
    >
      <Card>
        <CardContent>
          <Stack direction="row">
            <Typography variant="h5" minWidth={400}>{recipe.name}</Typography>
            <TextField
              size="small"
              label="Personen"
              name={recipe.name}
              value={shoppingListEntry.amount}
              onChange={event => handelChange(event)}
              sx={{width:"100px",marginLeft:"10px"}}
            />
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={()=>deleteRecipeFromShoppingList(shoppingListEntryIndex)}
              sx={{"marginLeft":"auto"}}
            >
              Löschen
            </Button>
          </Stack>
          <Stack
            direction="row"
          >
            <Checkbox
              checked={getShoppingListEntry(shoppingListEntryIndex).allChecked}
              onClick={(event)=>checkAllIngredients(event)}
            />
            <Typography sx={{"marginTop":"auto","marginBottom":"auto"}}>Alle Zutaten</Typography>
          </Stack>
          {recipe.ingredients.map((ingredient:Ingredient,ingredientIndex:number)=>{
            return(
              <Stack
                direction="row"
                key={ingredientIndex}
              >
                <Checkbox
                  checked={getShoppingListEntry(shoppingListEntryIndex).checked.at(ingredientIndex)}
                  onChange={(event)=>invertCheckbox(event,ingredientIndex)}
                />
                <Typography sx={{"marginTop":"auto","marginBottom":"auto"}}>{ingredient.name} {ingredient.amount?(ingredient.amount*(shoppingListEntry.amount/recipe.persons)):undefined} {ingredient.unit}</Typography>
              </Stack>
            );
          })}

        </CardContent>
      </Card>
    </Grid>
  );
};