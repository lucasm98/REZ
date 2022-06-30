import React, {useState} from 'react';
import {Ingredient, RecipeData, ShoppingListEntry, UserData} from "../interface";
import {Card, CardContent, Grid, Typography, TextField, Stack, List, ListItemText, Button} from "@mui/material";

interface Props {
  recipeList: RecipeData[],
  getCurrentUser: ()=>UserData,
  updateUser: (user: UserData) => void,
}

export const ShoppingList = ({recipeList,getCurrentUser,updateUser}:Props) => {
  const getRecipeById = (recipeId:number):RecipeData => (recipeList.filter((recipe:RecipeData)=>(recipe.id===recipeId))[0]);
  const [shoppingList,setShoppingList] = useState<ShoppingListEntry[]>(getCurrentUser().shoppingList);

  const handelChange = (event:any,recipeIndex:number):void => {
    let newShoppingList = [...shoppingList];
    newShoppingList[recipeIndex].amount = event.target.value;
    setShoppingList(newShoppingList);
    updateUser({...getCurrentUser(),"shoppingList":newShoppingList});
  }

  const deleteRecipeFromShoppingList = (index:number):void => {
    const newShoppingList = shoppingList.filter((shoppingListEntry:ShoppingListEntry,index_:number)=>(index_ !== index));
    setShoppingList(newShoppingList);
    updateUser({...getCurrentUser(),"shoppingList":newShoppingList});
  }

  const renderShoppingList = () => {
    let ingredientList:Ingredient[] = [];
    shoppingList.forEach((shoppingListEntry:ShoppingListEntry,recipeIndex:number)=>{
      const recipe = getRecipeById(shoppingListEntry.recipe);
      recipe.ingredients.forEach((ingredient:Ingredient,ingredientIndex:number)=>{
        if(ingredientList.find((ingredientFind:Ingredient)=>(ingredientFind.name === ingredient.name &&ingredientFind.unit === ingredient.unit))) {
          ingredientList.forEach((ingredientFromList:Ingredient,ingredientFromListIndex:number)=>{
            if(ingredientFromList.name === ingredient.name && ingredientFromList.unit === ingredient.unit &&
              ingredientFromList.amount && ingredient.amount)
            {
              let newAmount = parseInt(String(ingredientList[ingredientFromListIndex].amount!)) +  parseInt(String(ingredient.amount));
              ingredientList[ingredientFromListIndex].amount! = newAmount >= 50 ? newAmount : Math.round(newAmount);
            }
          })
        } else {
          ingredientList.push({"name":ingredient.name,"amount":ingredient.amount?(ingredient.amount*(shoppingList[recipeIndex].amount/recipe.persons)):undefined,"unit":ingredient.unit});
        }
      })
    })

    return (ingredientList
      .sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase()? 1 : -1)
      .map((ingredient:Ingredient)=>(
      <ListItemText sx={{"textAlign":"left"}}>{ingredient.name} {ingredient.amount} {ingredient.unit}</ListItemText>
    )));
  }

  return (
    <Stack
      direction="row"
      spacing={1}
    >
      <Grid
       item
       container
       xs={6}
      >
        <Grid
          container
          item
          direction="column"
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h3">Rezepte</Typography>
          {shoppingList.map((shoppingListEntry:ShoppingListEntry,recipeIndex:number)=>{
            const recipe:RecipeData = getRecipeById(shoppingListEntry.recipe);
            return(
              <Grid
                item
                key={shoppingListEntry.recipe}
              >
                <Card>
                  <CardContent>
                    <Stack direction="row">
                      <Typography variant="h5">{recipe.name}</Typography>
                      <TextField
                        size="small"
                        label="Personen"
                        name={recipe.name}
                        value={shoppingList[recipeIndex].amount}
                        onChange={event => handelChange(event,recipeIndex)}
                        sx={{width:"100px",marginLeft:"10px"}}
                      />
                    </Stack>
                    {recipe.ingredients.map((ingredient:Ingredient,ingredientIndex:number)=>{
                      return(
                        <Typography key={ingredientIndex}>{ingredient.name} {ingredient.amount?(ingredient.amount*(shoppingList[recipeIndex].amount/recipe.persons)):undefined} {ingredient.unit}</Typography>
                      );
                    })}
                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      onClick={()=>deleteRecipeFromShoppingList(recipeIndex)}
                    >
                      Löschen
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        direction="column"

        xs={6}
      >
        <Typography variant="h3">Einkaufsliste</Typography>
        <Card >
          <CardContent>
            <Stack
              direction="column"
              spacing={1}
              justifyContent="center"
              alignItems="center"
            >
              <List>
                {renderShoppingList()}
              </List>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

    </Stack>

  );
};