import React, {useEffect, useState} from "react";
import './Recipe.css';
import {Ingredient, RecipeData, ShoppingListEntry, UserData} from "../interface";
import {useNavigate, useParams} from "react-router-dom";
import {
  List,
  ListItemText,
  Stack,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TableBody,
  Card,
  TextField, Button
} from "@mui/material";
import {RecipePersonsSchema, ShoppingListPersonsSchema} from "../Validation/RecipeValidation";

interface Props {
  recipeList: RecipeData[],
  addRecipeToShoppingList?: (shoppingListEntry:ShoppingListEntry)=>void
}

export const Recipe = ({recipeList,addRecipeToShoppingList}:Props) => {
  const navigate = useNavigate();
  const input = useParams();
  const [recipe,setRecipe] = useState<RecipeData>({"name":"","time":0,"level":0,"rating":0,"user":0,"id":0,"persons":0,"ingredients":[],"preparation":[]});
  const [persons,setPersons] = useState<number>(4);
  const [error,setError] = useState<boolean>(false);

  const submit = () => {
    if (addRecipeToShoppingList) {
      ShoppingListPersonsSchema.isValid({persons})
        .then(valid=>{
        if(valid){
          addRecipeToShoppingList({
            "recipe": recipe.id,
            "amount": persons,
            "checked": new Array(recipe.ingredients.length).fill(true),
            "allChecked": true
          });
          navigate("/shoppinglist");
        }
      });
    } else if (!addRecipeToShoppingList) {
      console.log("no add");
      setError(true);
    }
  };

  const handelChange = (event:any):void => {
    const amount:number = event.target.value;
    ShoppingListPersonsSchema.isValid({"persons":amount})
      .then((valid)=>{
        if(valid) {
          setPersons(parseInt(amount.toString()));
        }
      });
    if(event.target.value==="")setPersons(0);
  }

  useEffect( ()=> {
      if(input.recipeId !== undefined)
      {
        const inputRecipe:RecipeData = recipeList.filter((recipeData:RecipeData)=>(recipeData.id === parseInt(input.recipeId!)))[0];
        setRecipe(inputRecipe);
        setPersons(inputRecipe.persons)
      }
    },[input]
  );

  useEffect(() => {
    if(error){
      setTimeout(() => {
        setError(false)
      }, 2500);
    }

  }, [error]);

  const renderIngredients = () => {
    const rows:Ingredient[] = recipe.ingredients;
    return(
      <TableContainer component={Paper} sx={{width:"80%",alignSelf:"center"}} >
        <Table  size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>
                <Stack direction="row" spacing={2} textAlign="center">
                  <Typography mt="auto" mb="auto">Anzahl der Personen</Typography>
                  <TextField
                    name="persons"
                    value={persons}
                    sx={{height:"auto",width:"10.5%"}}
                    size="small"
                    onChange={handelChange}
                  />
                  <Button
                    name="addToShoppingList"
                    variant="contained"
                    size="small"
                    onClick={submit}
                  >
                    Zur Einkaufsliste Hinzufügen
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
            {error && <TableRow>
              <TableCell colSpan={2}><Typography variant="h5" color="red" align="center">Für die Einkaufsliste bitte Anmelden</Typography></TableCell>
            </TableRow>}
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Menge</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" >{row.name}</TableCell>
                <TableCell align="center">{row.amount?row.amount*(persons/recipe.persons):""} {row.unit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}

  const renderPreparation = ():JSX.Element[] => {
    return  recipe.preparation.map((step, index) => (
      <ListItemText key={index}><Typography variant="h6">{index+1}. {step}</Typography></ListItemText>
    ))
  }

  return(
    <div className="Recipe">
      <Card sx={{width:"50%",margin:"auto"}}>
        <Stack direction="column">
          <Typography variant="h4" pt={2}>{recipe.name}</Typography>
          <Typography variant="h5" pt={2}>Dauer: {recipe.time} min</Typography>
          <Typography variant="h5" pt={1}>Schwierigkeit:  {recipe.level}</Typography>
          <Typography variant="h5" pt={1} pb={1}>Bewertung: {recipe.rating}</Typography>
          {renderIngredients()}
          <Typography pt={3} variant="h5">Zubereitung:</Typography>
          <List>
            {renderPreparation()}
          </List>
        </Stack>
      </Card>
    </div>
  );
};