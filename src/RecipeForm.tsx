import React, {useState} from "react";
import {
  Box,
  Button, Grid,
  InputAdornment,
  List,
  ListItem,
  ListSubheader,
  Rating,
  Slider,
  TextField,
  Typography
} from "@mui/material";
import {styled} from "@mui/material/styles";
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: 'orange',
  },
  '& .MuiRating-iconHover': {
    color: 'orange',
  },
});

export default function RecipeForm() {
  const [ingredients, setIngredients] = useState([{name:"",amount:"",unit:""}]);
  const [preparations,setPreparations] = useState<string[]>([""]);

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
        <ListItem key={index}>
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
        list[index].amount = value;
        break;
      case "unit":
        list[index].unit = value;
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
      >
        <Grid
          container
          direction="column"
        >
          <TextField
            id="name"
            label="Name"
            variant="standard" />
          <TextField
            id="time"
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
          />
          <Slider
            aria-label="level"
            defaultValue={0}
            step={1}
            marks={levelMarks}
            min={0}
            max={2}
            sx={{width:200}}
            track={false}
          />
          <Box >
            <Typography component="legend">Bewertung</Typography>
            <StyledRating
              name="rating"
              defaultValue={2}
              precision={1}
              icon={<LocalDiningIcon fontSize="inherit" />}
              emptyIcon={<LocalDiningIcon fontSize="inherit" />}
              sx={{magin:'auto'}}
            />
          </Box>
          <Box>
            <List>
              <ListSubheader>Zutaten</ListSubheader>
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
          </Box>
          <Box>
            <List>
              <ListSubheader>Zubereitung</ListSubheader>
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
          </Box>
        </Grid>
      </Box>
    </>
  );
}