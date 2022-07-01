import React, {useEffect, useState} from 'react';
import {Ingredient, RecipeData, ShoppingListEntry, UserData} from "../interface";
import {Card, CardContent, Grid, Typography, TextField, Stack, List, ListItemText, Button} from "@mui/material";
import {ShoppingListCard} from "./ShoppingListCard";

interface Props {
  recipeList: RecipeData[],
  getCurrentUser: ()=>UserData,
  updateUser: (user: UserData) => void,
}

export const getCurrentDate = (separator1:string,separator2:string,separator3:string):string => {

  const newDate = new Date()
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  const hour = newDate.getHours();
  const minute = newDate.getMinutes();

  return `${date}${separator1}${month<10?`0${month}`:`${month}`}${separator1}${year}${separator2}${hour}${separator3}${minute}`;
}

export const ShoppingList = ({recipeList,getCurrentUser,updateUser}:Props) => {
  const getRecipeById = (recipeId:number):RecipeData => (recipeList.filter((recipe:RecipeData)=>(recipe.id===recipeId))[0]);
  const [shoppingList,setShoppingList] = useState<ShoppingListEntry[]>(getCurrentUser().shoppingList);
  const [allIngredientList,setAllIngredientList] = useState<Ingredient[]>([]);


  const exportIngredientList = (ingredientList:Ingredient[]):void => {
    const fileData = ingredientsListToString(allIngredientList);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `Einkaufsliste_${getCurrentDate(".","_",".")}.txt`;
    link.href = url;
    link.click();
  }

  const ingredientsListToString = (ingredientList:Ingredient[]):string => {
    let textToWrite:string = `Einkaufsliste ${getCurrentDate(".","",":")}\n`;
    ingredientList.forEach((ingredient:Ingredient)=>{
      textToWrite=textToWrite.concat(`⬤ ${ingredient.name} ${ingredient.amount?ingredient.amount:""} ${ingredient.unit?ingredient.unit:""}\n`);
    })
    return textToWrite;
  }

  useEffect(() => {
    refreshIngredientList();
  }, [shoppingList]);

  const updateShoppingList = (shoppingListIndex:number,shoppingListEntry:ShoppingListEntry) => {
    let newShoppingList:ShoppingListEntry[] = shoppingList;
    newShoppingList[shoppingListIndex] = shoppingListEntry;
    setShoppingList(newShoppingList);
    refreshIngredientList();
    updateUser({...getCurrentUser(),"shoppingList":newShoppingList});
  };

  const refreshIngredientList = () => {
    let ingredientList:Ingredient[] = [];
    shoppingList.forEach((shoppingListEntry:ShoppingListEntry,recipeIndex:number)=>{
      const recipe = getRecipeById(shoppingListEntry.recipe);
      console.log("Refresh",recipe);
      recipe.ingredients
        .filter((ingredient:Ingredient,ingredientIndex:number)=>(shoppingListEntry.checked[ingredientIndex]))
        .forEach((ingredient:Ingredient,ingredientIndex:number)=>{
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
          ingredientList.push({"id":ingredient.id,"name":ingredient.name,"amount":ingredient.amount?(ingredient.amount*(shoppingList[recipeIndex].amount/recipe.persons)):undefined,"unit":ingredient.unit});
        }
      })
    })
    setAllIngredientList(ingredientList);
  };

  const deleteRecipeFromShoppingList = (index:number):void => {
    const newShoppingList = shoppingList.filter((shoppingListEntry:ShoppingListEntry,index_:number)=>(index_ !== index));
    setShoppingList(newShoppingList);
    updateUser({...getCurrentUser(),"shoppingList":newShoppingList});
  }

  const renderShoppingList = () => {
    return(
      allIngredientList.length===0
        ?<ListItemText><Typography variant="h6" >Keine Zutaten</Typography></ListItemText>
        :allIngredientList
          .sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase()? 1 : -1)
          .map((ingredient:Ingredient,index:number)=>(
            <ListItemText sx={{"textAlign":"left"}} key={index} ><Typography variant="h6" >⬤ {ingredient.name} {ingredient.amount} {ingredient.unit}</Typography></ListItemText>
          ))
    )  ;
  }

  const getShoppingListEntry = (index:number):ShoppingListEntry => (shoppingList[index])

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
        >
          <Typography variant="h3">Rezepte</Typography>
          {shoppingList.length===0
            ?<Card><CardContent><Typography variant="h6" >Kein Rezept Hinzugefügt</Typography></CardContent></Card>
            :shoppingList.map((shoppingListEntry:ShoppingListEntry,recipeIndex:number)=>{
            const recipe:RecipeData = getRecipeById(shoppingListEntry.recipe);
            return <ShoppingListCard
              key={recipeIndex}
              recipe={recipe}
              getShoppingListEntry={getShoppingListEntry}
              shoppingListEntryIndex={recipeIndex}
              updateShoppingList={updateShoppingList}
              deleteRecipeFromShoppingList={deleteRecipeFromShoppingList}
            />
          })}
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction="column"
        xs={6}
      >
        <Typography variant="h3">Einkaufsliste</Typography>
        <Card>
          <CardContent>
            <Stack
              direction="column"
              spacing={1}
              minWidth={400}
            >
              <List>
                {renderShoppingList()}
              </List>
            </Stack>
            {getCurrentUser().shoppingList.length > 0 &&
            <Button
              variant="contained"
              size="small"
              onClick={()=>exportIngredientList(allIngredientList)}
            >
              Download als .txt
            </Button>}
          </CardContent>
        </Card>
      </Grid>

    </Stack>

  );
};