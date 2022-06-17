import React from 'react';
import {Grid, Typography, TextField as MUITextField} from "@mui/material";

interface Props {
  label: string,
  name: string,
  formik: any
}

export const TextField = ({label, name, formik}:Props) => {
  return (
    <Grid
      item
    >
      <MUITextField
        fullWidth
        label={label}
        name={name}
        variant="standard"
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.errors[name] && formik.touched[name] && <Typography variant="subtitle1" color="red">{formik.errors[name]}</Typography>}
    </Grid>
  );
};