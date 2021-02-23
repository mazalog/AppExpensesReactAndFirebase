import React, { useState } from "react";
import { makeStyles, Grid, Button, Box } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Input from "./ComponentsForm/Input";
import InputSelect from "./ComponentsForm/InputSelect";
import InputDate from "./ComponentsForm/InputDate";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import InputAdornment from "@material-ui/core/InputAdornment";
import DescriptionIcon from "@material-ui/icons/Description";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";



const FormAddGasto = (props) => {

 //style 
const style = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(2),
    },
  },
}));
const classes = style();

//inicializacion
const initialValues = {
  categoria: "",
  fecha: new Date(),
  descripcion: "",
  gasto:0
};
const [values, setValues] = useState(initialValues);

//handleclick
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  //Estado
  const handleInputChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const enviardatos = (event) => {
    event.preventDefault();
    event.target.reset();
    props.addgasto(values);
    handleClick()
  };

    var gastot=0
    const GastoResultado=(gasto)=>{
    const gastoActual= parseFloat(gasto)
     gastot=gastot+gastoActual
   }

  return (
    <div>
      <form className={classes.root} onSubmit={enviardatos}>
        <Grid container>
          <Grid container item xs={6}>
            <InputSelect
              helperText="Categoria"
              label="Categoria"
              name="categoria"
              value={values.categoria}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid container item xs={6}>
            <InputDate
              label="Fecha"
              name="fecha"
              value={values.fecha}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid container justify="center" item xs={12}>
            <Input
              label="Descripcion"
              name="descripcion"
              type="text"
              value={values.descripcion}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DescriptionIcon></DescriptionIcon>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid container justify="center" item xs={12}>
            <Input
              label="Gasto"
              name="gasto"
              type="number"
              value={values.gasto}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon></AttachMoneyIcon>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid container justify="center" item xs={12}>
            <Box marginTop={8}>
              <Button
                size="large"
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<AddToPhotosIcon />}
              >
                Agregar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Gasto agregado!
        </Alert>
      </Snackbar>
      <Box
      mt={2}
      >
      {props.totalGastos.forEach(function(item, index) {  
                   GastoResultado(item.gasto)
       })}
      <Alert severity="info"><b>TOTAL GASTADO: {gastot}$ </b></Alert>
      </Box>
    </div>
  );
};

export default FormAddGasto;


