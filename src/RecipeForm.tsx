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
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {RecipeData} from "./interface";

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: 'orange',
  },
  '& .MuiRating-iconHover': {
    color: 'orange',
  },
});

interface InputIngredient {
  name : string,
  amount?: string,
  unit?:string,
}

export default function RecipeForm() {
  const [ingredients, setIngredients] = useState<InputIngredient[]>([{name:"",amount:"",unit:""}]);
  const [preparations,setPreparations] = useState<string[]>([""]);
  const [recipeData,setRecipeData] = useState({name:"",time:"",level:"",rating:""});
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

  function renderPreparation() {
    return(
      preparations.map((step, index:number)=>(
        <ListItem key={index}>
          <TextField
            type="text"
            label={"Schritt "+(index+1)}
            variant="standard"
            name="name"
            value={step}
            onChange={ (e) => handlePrepInputChange(e,index)}
          />
          <Button
            onClick={()=>handlePrepRemoveClick(index)}
          >
            <DeleteIcon/>
          </Button>
        </ListItem>
      ))
    );
  }

  const handlePrepInputChange = (e:any, index:any) => {
    const { value } = e.target;
    const list = [...preparations];
    list[index] = value;
    setPreparations(list);
  };

  const handlePrepRemoveClick = (index:number) => {
    const list = [...preparations];
    list.splice(index, 1);
    setPreparations(list);
  };

  const handlePrepAddClick = () => {
    setPreparations([...preparations, ""]);
  }

  function renderIngredients() {
    return(
      ingredients.map((ingredient, index:number)=>(
        <ListItem key={index} >
          <TextField
            type="text"
            label="Name"
            variant="standard"
            name="name"
            value={ingredient.name}
            onChange={ (e) => handleIngredientInputChange(e,index)}
          />
          <TextField
            name="amount"
            type="text"
            label="Menge"
            variant="standard"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            onChange={ (e) => handleIngredientInputChange(e,index)}
            value={ingredient.amount}
          />
          <TextField
            name="unit"
            type="text"
            label="Einheit"
            variant="standard"
            onChange={ (e) => handleIngredientInputChange(e,index)}
            value={ingredient.unit}
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

  const handleIngredientInputChange = (e:any, index:any) => {
    const { name, value } = e.target;
    const list = [...ingredients];
    switch (name){
      case "name":
        list[index].name = value;
        break;
      case "amount":
        if(value === "")  list[index].amount = undefined;
        else list[index].amount = value;
        break;
      case "unit":
        if(value === "") list[index].unit = undefined;
        else list[index].unit = value;
        break;
    }
    setIngredients(list);
  };

  const handleIngredientRemoveClick = (index:number) => {
    const list = [...ingredients];
    list.splice(index, 1);
    setIngredients(list);
  };

  const handleIngredientAddClick = () => {
    setIngredients([...ingredients, { name: "", amount: "", unit: "" }]);
  }

  const handelSubmit = (event:any) => {
    event.preventDefault();
    const data = {
      "name":recipeData.name,
      "time":recipeData.time,
      "level":recipeData.level,
      "rating":recipeData.rating,
      "ingredients":ingredients,
      "preparation":preparations
    };
    axios.post('http://localhost:3001/recipe', data,{
      headers: {
        'content-type': 'application/json',
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    navigate("/saved");
  }

  const handelChangeOnInput = (e:any) => {
    const {name , value} = e.target;
    const newData = recipeData;

    switch (name){
      case "name":
        newData.name=value;
        break;
      case "time":
        newData.time=value;
        break;
      case "level":
        newData.level=value;
        break;
      case "rating":
        newData.rating=value;
        break;
    }
    setRecipeData(newData);
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
            onChange={(e) => handelChangeOnInput(e)}
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
            onChange={(e) => handelChangeOnInput(e)}
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
              onChange={(e) => handelChangeOnInput(e)}
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
              onChange={(e) => handelChangeOnInput(e)}
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
                  onClick={handlePrepAddClick}
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