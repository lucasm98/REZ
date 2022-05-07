import React from "react";
import {RecipeData} from "./interface";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  List,
  ListItem,
  ListSubheader,
  Box,
  CardActions,
  Collapse,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
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

export default function RecipeCard(recipeData: RecipeData) {
  const [expanded, setExpanded] = React.useState(false);

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
              console.log(ingredient);
              return <Typography key={index} variant={"body1"} color="text.secondary">{ingredient?.amount} {ingredient?.unit} {ingredient?.name} </Typography>;
            })}
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
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
            <Typography paragraph>{index+1}. {step}</Typography>
            ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}

