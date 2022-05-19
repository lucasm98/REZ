import React, {useState} from "react";
import {RecipeData} from "../interface";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  CardActions,
  Collapse,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useNavigate} from "react-router-dom";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface Props {
  recipeData: RecipeData;
  deleteRecipe?: (id:number)=> void;
  favorite?: boolean;
  setUserData?: (data:string,value:string)=>void,
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeCard({recipeData , deleteRecipe, favorite, setUserData}:Props) {
  const [expanded, setExpanded] = useState(false);
  const [favoriteLocal, setFavoriteLocal] = useState(favorite);
  const navigate = useNavigate();


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return(
    <Card>
      <CardHeader title={recipeData.name}/>
      <CardContent sx={{display: "flex"}}>
        <Box sx={{ display: 'flex', flexDirection: 'column',margin:"auto"}}>
          <Typography variant="body1" paragraph>
            Dauer: {recipeData.time} min
          </Typography>
          <Typography variant={"body1"} paragraph>
            Schwierigkeit: {recipeData.level}
          </Typography>
          <Typography variant={"body1"} paragraph>
            Bewertung: {recipeData.rating}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column',margin:"auto"}}>
          <Typography variant={"body1"} paragraph>
           Zutaten:
          </Typography>
            {recipeData.ingredients?.map((ingredient, index) => {
              return <Typography key={index} variant={"body1"} color="text.secondary">{ingredient?.amount} {ingredient?.unit} {ingredient?.name} </Typography>;
            })}
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        {(setUserData) && <IconButton
          aria-label="add to favorites"
          onClick={()=>{
            setUserData("toggleFavorite",recipeData.id.toString());
            setFavoriteLocal(!favoriteLocal);
          }}
        >
          {favoriteLocal?<FavoriteIcon />:<FavoriteBorderIcon/>}
        </IconButton>}
        {deleteRecipe && <IconButton
          aria-label="delete recipe"
          onClick={()=>
            {
              deleteRecipe(recipeData.id!);
              navigate("/created");
            }
          }
        >
          <DeleteForeverIcon />
        </IconButton>}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          Zubereitung
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Zubereitung:</Typography>
          {recipeData.preparation?.map((step, index) => (
            <Typography paragraph key={index}>{index+1}. {step}</Typography>
            ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}

