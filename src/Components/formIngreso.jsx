import React, { useState } from "react";
import { makeStyles, Grid, Button, Box } from "@material-ui/core";
import Input from "../ComponentsForm/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import PersonIcon from "@material-ui/icons/Person";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useFirebaseApp } from "reactfire";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const FormIngreso = () => {
  //firebase
  const firebase = useFirebaseApp();

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
    correo: "",
    contrasena: "",
  };
  const [values, setValues] = useState(initialValues);

  //Snackbar
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
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  //Estado
  const handleInputChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  //Ingreso firebase
  function Ingresar(valores) {
    const email = valores.correo;
    const contrasena = valores.contrasena;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, contrasena)
      .then((user) => {})
      .catch((error) => {
        //var errorCode = error.code;
        //var errorMessage = error.message;
        handleClick();
      });
  }

  const enviardatos = (event) => {
    event.preventDefault();
    event.target.reset();
    Ingresar(values);
  };

  return (
    <div>
      <form className={classes.root} onSubmit={enviardatos}>
        <Grid container>
          <Grid container justify="center" item xs={12}>
            <Input
              label="Correo"
              name="correo"
              type="email"
              id="email"
              value={values.descripcion}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon></PersonIcon>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid container justify="center" item xs={12}>
            <Input
              label="Contraseña"
              name="contrasena"
              type="password"
              id="contrasena"
              value={values.gasto}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyIcon></VpnKeyIcon>
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
                endIcon={<LockOpenIcon />}
              >
                Ingresar
              </Button>
            </Box>
          </Grid>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              Error !
            </Alert>
          </Snackbar>
        </Grid>
      </form>
    </div>
  );
};

export default FormIngreso;
