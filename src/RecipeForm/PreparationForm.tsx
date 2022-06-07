 import React from 'react';
import {Button, Grid, List, ListItem, TextField, Typography} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

 interface Props {
   preparation:  string[],
   setPreparation: (preparation:string[]) => void,
   error?: any,
   setTouched?: any,
   touched?: any
 }

export const PreparationForm = ({preparation,setPreparation,touched,setTouched,error}:Props) => {

  const removePreparation = (index:number) => {
    const list = [...preparation];
    list.splice(index, 1);
    setPreparation(list);
  };

  const addPreparation = () => {
    setPreparation([...preparation,""]);
    setTouched("preparation");
  }

  const handelBlur = (index:number):void => {
    setTouched(`step_${index}`);
  }

  const handleChange = (e: React.ChangeEvent<any>, index:number):void => {
    const {value} = e.target;
    const list:string[] = [...preparation];
    list[index] = value;
    setPreparation(list);
  }

  return (
    <Grid item sx={{marginTop:"25px"}}>
      <List>
        <Typography >Zubereitung</Typography>
        {
          preparation.map((step:string, index:number)=>(
            <ListItem key={index}>
              <TextField
                type="text"
                label={"Schritt "+(index+1)}
                variant="standard"
                name="name"
                value={step ?? ""}
                onChange={(e)=>handleChange(e,index)}
                onBlur={()=>handelBlur(index)}
              />
              <Button
                onClick={()=>removePreparation(index)}
              >
                <DeleteIcon/>
              </Button>
              {error !== undefined &&
                error[index] !== undefined &&
                error !== "Mindestends einen Schritt" &&
                <Typography variant="subtitle1" color="red">{error[index]}</Typography>}
            </ListItem>
          ))
        }
        {
          error !== undefined &&
          typeof error === "string" &&
          touched !== undefined &&
          touched.preparation &&
          <Typography variant="subtitle1" color="red">{error}</Typography>
        }
        <ListItem>
          <Button
            sx={{margin:"auto"}}
            onClick={addPreparation}
          >
            <AddCircleIcon/>
          </Button>
        </ListItem>
      </List>
    </Grid>
  );
};