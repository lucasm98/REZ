import React from 'react';
import {Ingredient} from "../interface";
import {Button, Grid, List, ListItem, TextField, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface Props {
  ingredientList:  Ingredient[],
  setIngredients: (ingredients:Ingredient[])=>void
  error?: any,
  setTouched?: any,
  touched?: any
}

export const IngredientForm = ({ingredientList,setIngredients,error,setTouched,touched}:Props) => {

  const removeIngredient = (index:number) => {
    const list = [...ingredientList];
    list.splice(index, 1);
    setIngredients(list);
  };

  const addIngredient = () => {
    const emptyIngredient:Ingredient={name:""};
    setIngredients( [...ingredientList,emptyIngredient]);
    setTouched("ingredients");
  }

  const handleChange = (e: React.ChangeEvent<any>, index:number):void => {
    const {name , value} = e.target;
    ingredientList[index] = {
      ...ingredientList[index],
      [name]: value
    };
    setIngredients(ingredientList);
  }

  const handelBlur = (e: React.ChangeEvent<any>, index:number):void => {
    const {name} = e.target;
    if(name === "name")setTouched(`ingredient_${index}`)
  }

  const renderError = (index:number) => {
    if(error !== undefined && error[index] !== undefined)
    {
      let returnValue:string = "";
      if(error[index].name &&
        touched !== undefined &&
        touched[`ingredient_${index}`]) returnValue = error[index].name;
      else if(error[index].amount) returnValue = error[index].amount;
      else if(error[index].unit) returnValue = error[index].unit;
      return (<Typography variant="subtitle1" color="red">{returnValue}</Typography>);
    }
  }

  return (
    <Grid item sx={{marginTop:"25px"}}>
      <List>
        <Typography >Zutaten</Typography>
        {
          ingredientList.map((ingredient:Ingredient, index:number)=>(
            <ListItem key={index} >
              <TextField
                type="text"
                label="Name"
                variant="standard"
                name="name"
                value={ingredient.name ?? ""}
                onChange={(e)=>handleChange(e,index)}
                onBlur={(e) => handelBlur(e,index)}
              />
              <TextField
                name="amount"
                type="text"
                label="Menge"
                variant="standard"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                onChange={(e)=>handleChange(e,index)}
                onBlur={(e) => handelBlur(e,index)}
                value={ingredient.amount ?? ""}
              />
              <TextField
                name="unit"
                type="text"
                label="Einheit"
                variant="standard"
                onChange={(e)=>handleChange(e,index)}
                onBlur={(e) => handelBlur(e,index)}
                value={ingredient.unit ?? ""}
              />
              <Button
                onClick={()=>removeIngredient(index)}
              >
                <DeleteIcon/>
              </Button>
              {renderError(index)}
            </ListItem>
          ))
        }
        {
          error !== undefined &&
          typeof error === "string" &&
          touched !== undefined &&
          touched.ingredients &&
          <Typography variant="subtitle1" color="red">{error}</Typography>
        }
        <ListItem>
          <Button
            sx={{margin:"auto"}}
            onClick={addIngredient}
          >
            <AddCircleIcon/>
          </Button>
        </ListItem>
      </List>
    </Grid>

  );
};