import React, {useState} from 'react';
import {RecipeData, UserData} from "../interface";
import {Button, Card, CardActionArea, CardContent, Collapse, Grid, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {styled} from "@mui/material/styles";

const ExpandMore = styled((props: any) => {
  const { expand, ...other } = props;
  return <ExpandMoreIcon {...other}/>;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface Props {
  userData:UserData,
  deleteUser:(id:number)=>void,
  loggOut:() => void,
  recipes:RecipeData[]
}

interface State {
  favorites:boolean,
  created:boolean
}

export const User = ({userData,deleteUser,loggOut,recipes}:Props) => {
  const [state, setState] = useState<State>( {favorites:false,created:false});
  const labelSize:number = 6;
  const varSize:number = 5;
  const navigate = useNavigate();

  const deleteAccount = ():void => {
    if (window.confirm('Sind sie sich sicher, dass sie ihren Account löschen wollen?')) {
      deleteUser(userData.id);
      loggOut();
      navigate("/");
    }
  }

  const handleExpandClickFavorites = ():void => {
    setState({created:state.created,favorites:!state.favorites});
  };

  const handleExpandClickCreated = ():void => {
    setState({created:!state.created,favorites:state.favorites});
  };

  const getCreatedRecipesCount = ():number => {
    return recipes.filter((recipeData:RecipeData)=>(recipeData.user===userData.id)).length;
  }


  const renderRecipes= (name:string,varName:string) => {
    return (
      <Stack direction="column" spacing={1} mt={2}>
        {recipes.filter((recipeData:RecipeData) => (varName === "favorites" ? userData.favorites.includes(recipeData.id):recipeData.user===userData.id))
          .map((recipe:RecipeData)=> (
          <Card>
            <CardActionArea
              onClick={()=>navigate(`/recipe/${recipe.id}`)}
            >
              <CardContent>
                <Typography variant="h5">{recipe.name}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
    );
  }

  return (
    <Grid
      container
      item
      direction="column"
      spacing={3}
      justifyContent="center"
      alignItems="center"
      sx={{
        borderColor: 'text.primary',
        m: 1,
        border: 1,
        borderRadius: '16px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}
      xs={8}
    >
      <Grid
        container
        item
        direction="row"
        spacing={2}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item xs={labelSize}>
          <Typography variant="h4">Name:</Typography>
        </Grid>
        <Grid item xs={varSize}>
          <Typography variant="h4">{userData.name}</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        item
        direction="row"
        spacing={2}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item xs={labelSize}>
          <Typography variant="h4">Benutzername:</Typography>
        </Grid>
        <Grid item xs={varSize}>
          <Typography variant="h4">{userData.username}</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        item
        direction="row"
        spacing={2}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item xs={labelSize}>
          <Typography variant="h4">Email:</Typography>
        </Grid>
        <Grid item xs={varSize}>
          <Typography variant="h4">{userData.email}</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        item
        direction="row"
        spacing={2}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item xs={labelSize}>
          <Typography variant="h4">Favoriten({userData.favorites.length})</Typography>
        </Grid>
        <Grid item xs={varSize}>
          <Button
            onClick={handleExpandClickFavorites}
            aria-expanded={state.favorites}
            aria-label="show more"
            variant="contained"
          >
            <ExpandMore expand={state.favorites} sx={{marginRight:"auto"}}/>
          </Button>
        </Grid>
      </Grid>
      <Collapse in={state.favorites} timeout="auto" unmountOnExit>
        {renderRecipes("Zubereitung","favorites")}
      </Collapse>
      <Grid
        container
        item
        direction="row"
        spacing={2}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item xs={labelSize}>
          <Typography variant="h4">Erstellte Rezepte({getCreatedRecipesCount()})</Typography>
        </Grid>
        <Grid item xs={varSize}>
          <Button
            onClick={handleExpandClickCreated}
            aria-expanded={state.created}
            aria-label="show more"
            variant="contained"
          >
            <ExpandMore expand={state.created} sx={{marginRight:"auto"}}/>
          </Button>
        </Grid>
      </Grid>
      <Collapse in={state.created} timeout="auto" unmountOnExit>
        {renderRecipes("Erstellte Rezepte","created")}
      </Collapse>
      <Grid item>
        <Button variant="contained" onClick={()=>navigate("/account/edit")}>
          Informationen bearbeiten
        </Button>
      </Grid>
      <Grid item mb={2}>
        <Button variant="contained" onClick={deleteAccount}>
          Account Löschen
        </Button>
      </Grid>

    </Grid>
  );
};