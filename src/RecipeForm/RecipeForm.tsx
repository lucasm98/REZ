import React from 'react';
import {Formik, useFormik} from 'formik';
import {Ingredient, RecipeData} from "../interface";
import {Box, Button, Grid, InputAdornment, Rating, Slider, TextField, Typography} from "@mui/material";
import {RecipeSchema} from "../Validation/RecipeValidation";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import {IngredientForm} from "./IngredientForm";
import {PreparationForm} from "./PreparationForm";
import {useNavigate, useParams} from "react-router-dom";

interface Props {
  updateRecipe: (recipe: RecipeData) => void,
  currentUser: number,
  recipeList?: RecipeData[],
  admin?: boolean,
}

export const RecipeForm = ({updateRecipe, currentUser, recipeList,admin}: Props) => {
  const navigate = useNavigate();
  const input = useParams();

  const initialValues:RecipeData = {
    name: "",
    time: 0,
    level: 0,
    rating: 1,
    user: currentUser,
    persons:0,
    ingredients: [],
    preparation: [],
    id: -1
  }

  const getRecipe = ():RecipeData => {
    if(input !== undefined && input.recipeId !== undefined && recipeList ) {
      const confirmUserRecipe:RecipeData = recipeList.filter((recipeData:RecipeData)=>(recipeData.id.toString() === input.recipeId))[0];
      if(confirmUserRecipe.user === currentUser || admin) return confirmUserRecipe;
      else {
        navigate(`/recipe/${confirmUserRecipe.id}`);
        return initialValues;
      }
    }
    else return initialValues;
  }

  const formik = useFormik({
      initialValues: getRecipe(),
      onSubmit: (values) => {
        updateRecipe(values);
        navigate(currentUser===0?"/admin/recipe":"/created");
      },
      validationSchema:RecipeSchema
  });

  const setIngredients = (ingredients:Ingredient[]):void => {
    formik.setValues(
      prevState => ({
        ...prevState,
          ingredients
      }
    ));
  }

  const setPreparation = (preparation:string[]):void => {
    formik.setValues(
      prevState => ({
        ...prevState,
        preparation
      })
    );
  }

  const setTouched = (name:string) => {
    formik.setTouched({...formik.touched,[name]:true});
  }

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

  return (
    <Formik
      initialValues={formik.initialValues}
      onSubmit={()=>formik.handleSubmit()}>
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
        onSubmit={formik.handleSubmit}
      >
        <Grid
          container
          direction="column"
        >
          <TextField
            label="Name"
            name="name"
            variant="standard"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && <Typography variant="subtitle1" color="red">{formik.errors.name}</Typography>}
          <TextField
            name="time"
            label="Zeit"
            type="text"
            variant="standard"
            InputProps={{
              endAdornment: <InputAdornment position="end">min</InputAdornment>,
            }}
            value={formik.values.time === 0 ? "" : formik.values.time }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.time && formik.touched.time && <Typography variant="subtitle1" color="red">{formik.errors.time}</Typography>}
          <TextField
            label="Anzahl der Personen"
            name="persons"
            variant="standard"
            value={formik.values.persons === 0 ? "" : formik.values.persons}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.persons && formik.touched.persons && <Typography variant="subtitle1" color="red">{formik.errors.persons}</Typography>}
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>
          {formik.errors.level && formik.touched.level && <Typography variant="subtitle1" color="red">{formik.errors.level}</Typography>}
          <Grid item sx={{marginTop:"35px"}}>
            <Typography>Bewertung</Typography>
            <Rating
              name="rating"
              defaultValue={1}
              precision={1}
              icon={<LocalDiningIcon fontSize="inherit" />}
              emptyIcon={<LocalDiningIcon fontSize="inherit" />}
              sx={{magin:'auto'}}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>
          {formik.errors.rating && formik.touched.rating && <Typography variant="subtitle1" color="red">{formik.errors.rating}</Typography>}
          <IngredientForm
            ingredientList={formik.values.ingredients}
            setIngredients={setIngredients}
            error={formik.errors.ingredients ? formik.errors.ingredients : undefined}
            setTouched={setTouched}
            touched={formik.touched ? formik.touched: undefined}
          />
          <PreparationForm
            preparationList={formik.values.preparation}
            setPreparation={setPreparation}
            error={formik.errors.preparation ? formik.errors.preparation : undefined}
            setTouched={setTouched}
            touched={formik.touched ? formik.touched: undefined}
          />
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
    </Formik>
  );
};