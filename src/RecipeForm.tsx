import React, { useState} from "react";
import {
  Box,
  Button, Grid,
  InputAdornment,
  List,
  ListItem,
  Rating,
  Slider,
  TextField,
  Typography
} from "@mui/material";
import {styled} from "@mui/material/styles";
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useNavigate} from "react-router-dom";
import {Ingredient, RecipeData} from "./interface";

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: 'orange',
  },
  '& .MuiRating-iconHover': {
    color: 'orange',
  },
});

interface Props {
  addRecipe: (recipe:RecipeData)=> void,
  user: number;
  recipeData?:RecipeData;
}

export default function RecipeForm({addRecipe,user,recipeData}: Props) {
  const [recipe, setRecipe] = useState<RecipeData>(
    recipeData ? recipeData :
      {  name: "",
        time: 0,
        level: 0,
        rating: 0,
        user: user,
        ingredients: [],
        preparation: [],
        id:-1}
  );
  const navigate = useNavigate();

  const levelMarks = [
    {
      value: 0,
      label: 'Einfach',
    },
    {
      value: 1,
      label: 'Mittel',
    },
    {
      value: 2,
      label: 'Schwer',
    }
  ];


  const handlePreparationRemoveClick = (index:number) => {
    const list = [...recipe.preparation];
    list.splice(index, 1);
    setRecipe(prevState => ({
      ...prevState,
      preparation: list
    }));
  };

  const handlePreparationAddClick = () => {
    setRecipe(prevState => ({
      ...prevState,
      preparation: [...prevState.preparation, ""]
    }));
  }


  const handleIngredientRemoveClick = (index:number) => {
    const list = [...recipe.ingredients];
    list.splice(index, 1);
    setRecipe(prevState => ({
      ...prevState,
      ingredients: list
    }));
  };

  const handleIngredientAddClick = () => {
    const emptyIngredient:Ingredient={name:""};
    setRecipe(prevState => ({
      ...prevState,
      ingredients: [...prevState.ingredients,emptyIngredient]
    }));
  }

  const handelInputChange = (e:any):void => {
    const {name , value} = e.target;
    setRecipe(prevState => ({
      ...prevState,
      [name]:value
    }))
  }

  const handelInputChangeIngredients = (e:any,index:number):void => {
    const {name , value} = e.target;
    let ingredients:Ingredient[] = [...recipe.ingredients];
    ingredients[index] = {
      ...ingredients[index],
      [name]: value
    };
    setRecipe(prevState => ({
      ...prevState,
      ingredients
    }))
  }

  const handelInputChangePreparations = (e:any,index:number):void => {
    const {value} = e.target;
    let preparation:string[] = [...recipe.preparation];
    preparation[index] = value;
    setRecipe(prevState => ({
      ...prevState,
      preparation
    }))
  }

  const handelSubmit = (event:any) => {
    event.preventDefault();
    console.log(recipe);
    addRecipe(recipe);
    navigate("/created");
  }

  function renderPreparation() {
    return(
      recipe.preparation.map((step, index:number)=>(
        <ListItem key={index}>
          <TextField
            type="text"
            label={"Schritt "+(index+1)}
            variant="standard"
            name="name"
            value={step ?? ""}
            onChange={ (e) => handelInputChangePreparations(e,index)}
          />
          <Button
            onClick={()=>handlePreparationRemoveClick(index)}
          >
            <DeleteIcon/>
          </Button>
        </ListItem>
      ))
    );
  }

  function renderIngredients() {
    return(
      recipe.ingredients.map((ingredient, index:number)=>(
        <ListItem key={index} >
          <TextField
            type="text"
            label="Name"
            variant="standard"
            name="name"
            value={ingredient.name ?? ""}
            onChange={ (e) => handelInputChangeIngredients(e,index)}
          />
          <TextField
            name="amount"
            type="text"
            label="Menge"
            variant="standard"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            onChange={ (e) => handelInputChangeIngredients(e,index)}
            value={ingredient.amount ?? ""}
          />
          <TextField
            name="unit"
            type="text"
            label="Einheit"
            variant="standard"
            onChange={ (e) => handelInputChangeIngredients(e,index)}
            value={ingredient.unit ?? ""}
          />
          <Button
            onClick={()=>handleIngredientRemoveClick(index)}
          >
            <DeleteIcon/>
          </Button>
        </ListItem>
      ))
    );
  }

  return(
    <>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 2},
          display: 'flex',
          flexWrap: 'wrap',
          width: '350px',
          margin: 'auto'
        }}
        noValidate
        autoComplete="off"
        onSubmit={handelSubmit}
      >
        <Grid
          container
          direction="column"
        >
          <TextField
            label="Name"
            name="name"
            variant="standard"
            onChange={(e) => handelInputChange(e)}
          />
          <TextField
            name="time"
            label="Zeit"
            type="text"
            variant="standard"
            InputProps={{
              endAdornment: <InputAdornment position="end">min</InputAdornment>,
              inputProps: {
                min: 0,
                inputMode: 'numeric',
                pattern: "[0-9]*"
              },
            }}
            onChange={(e) => handelInputChange(e)}
          />
          <Grid item>
            <Typography>Aufwand</Typography>
            <Slider
              name="level"
              aria-label="level"
              defaultValue={0}
              step={1}
              marks={levelMarks}
              min={0}
              max={2}
              sx={{width:200, margin:"auto"}}
              track={false}
              onChange={(e) => handelInputChange(e)}
            />
          </Grid>

          <Grid item sx={{marginTop:"35px"}}>
            <Typography>Bewertung</Typography>
            <StyledRating
              name="rating"
              defaultValue={2}
              precision={1}
              icon={<LocalDiningIcon fontSize="inherit" />}
              emptyIcon={<LocalDiningIcon fontSize="inherit" />}
              sx={{magin:'auto'}}
              onChange={(e) => handelInputChange(e)}
            />
          </Grid>
          <Grid item sx={{marginTop:"25px"}}>
            <List>
              <Typography >Zutaten</Typography>
              {renderIngredients()}
              <ListItem>
                <Button
                  sx={{margin:"auto"}}
                  onClick={handleIngredientAddClick}
                >
                  <AddCircleIcon/>
                </Button>
              </ListItem>
            </List>
          </Grid>
          <Grid item sx={{marginTop:"25px"}}>
            <List>
              <Typography >Zubereitung</Typography>
              {renderPreparation()}
              <ListItem>
                <Button
                  sx={{margin:"auto"}}
                  onClick={handlePreparationAddClick}
                >
                  <AddCircleIcon/>
                </Button>
              </ListItem>
            </List>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              name="Speichern"
              variant="contained"
              size="large"
            >
              Speichern
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}