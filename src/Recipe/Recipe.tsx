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
import {Formik, useFormik} from "formik";
import {RecipePersonsSchema} from "../Validation/RecipeValidation";

interface Props {
  recipeList: RecipeData[],
  addRecipeToShoppingList?: (shoppingListEntry:ShoppingListEntry)=>void
}

export const Recipe = ({recipeList,addRecipeToShoppingList}:Props) => {
  const navigate = useNavigate();
  const input = useParams();
  const [recipe,setRecipe] = useState<RecipeData>({"name":"","time":0,"level":0,"rating":0,"user":0,"id":0,"persons":0,"ingredients":[],"preparation":[]});

  const formik = useFormik({
    initialValues: {"persons":4},
    onSubmit: (values) => {
      if(addRecipeToShoppingList)addRecipeToShoppingList({"recipe":recipe.id,"amount":values.persons});
      navigate("/shoppinglist")
    },
    validationSchema:RecipePersonsSchema(addRecipeToShoppingList)
  });

  useEffect( ()=> {
      if(input.recipeId !== undefined)
      {
        const inputRecipe:RecipeData = recipeList.filter((recipeData:RecipeData)=>(recipeData.id === parseInt(input.recipeId!)))[0];
        setRecipe(inputRecipe);
        formik.setValues({persons: inputRecipe.persons})
      }
    },[input]
  );

  const renderIngredients = () => {
    const rows:Ingredient[] = recipe.ingredients;
    return(
      <TableContainer component={Paper} sx={{width:"80%",alignSelf:"center"}} >
        <Table  size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>
                <Stack direction="row" spacing={2} textAlign="center">
                  <Formik initialValues={formik.initialValues} onSubmit={()=>formik.handleSubmit()}>
                    <Stack
                      component="form"
                      onSubmit={formik.handleSubmit}
                      direction="row"
                      spacing={1}
                    >
                      <Typography mt="auto" mb="auto">Anzahl der Personen</Typography>
                      <TextField
                        name="persons"
                        value={formik.values.persons}
                        sx={{height:"auto",width:"10.5%"}}
                        size="small"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.persons && formik.touched.persons && <Typography variant="subtitle1" color="red">{formik.errors.persons}</Typography>}
                      <Button
                        type="submit"
                        name="addToShoppingList"
                        variant="contained"
                        size="small"
                      >
                        Zur Einkaufsliste Hinzufügen
                      </Button>
                    </Stack>
                  </Formik>
                </Stack>
              </TableCell>
            </TableRow>
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
                <TableCell align="center">{row.amount?row.amount*(formik.values.persons/recipe.persons):""} {row.unit}</TableCell>
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