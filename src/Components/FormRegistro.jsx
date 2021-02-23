import React, { useState } from "react";
import { makeStyles, Grid, Button, Box , Snackbar } from "@material-ui/core";
import Input from "../ComponentsForm/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import ContactMailIcon from '@material-ui/icons/ContactMail';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import 'firebase/auth'
import {  useFirebaseApp } from 'reactfire'
import MuiAlert from "@material-ui/lab/Alert";


const style = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(2),
    },
  },
}));

const initialValues = {
    correo2: "",
    contrasena2:"",
    contrasena3:"",
  };

  const FormRegistro = () => {

  const firebase=useFirebaseApp();

  const classes = style();

  const [values, setValues] = useState(initialValues);

  
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
 

  const handleInputChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const registrar = (valores) => {
    var email2 = valores.correo2;
    var contrasena2 = valores.contrasena2;

    firebase.auth().createUserWithEmailAndPassword(email2, contrasena2)
    .then(function () {
      verificar()
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    
        handleClick()
      
      console.log(errorCode);
      console.log(errorMessage);
  
    });
  };
   const verificar =()=>{

    var user = firebase.auth().currentUser;
    user
      .sendEmailVerification()
      .then(function () {
        console.log("enviando correo");
        window.location="/"
      })
      .catch(function (error) {
        console.log(error);
      });
   }

  
  const enviardatos = (event) => {
    event.preventDefault();
    event.target.reset();
    registrar(values)
  };


  return (
    <div>
      <form className={classes.root} onSubmit={enviardatos}>
        <Grid container>
          <Grid container justify="center" item xs={12}>
            <Input
              label="Correo"
              name="correo2"
              type="email"
              value={values.correo2}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ContactMailIcon></ContactMailIcon>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid container justify="center" item xs={12}>
            <Input
              label="Contraseña"
              name="contrasena2"
              type="password"
              value={values.contrasena2}
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
            <Input
              label="Repetir contraseña"
              name="contrasena3"
              type="password"
              value={values.contrasena3}
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
                endIcon={<PersonAddIcon />}
              >
                Registrarme
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                Error !
            </Alert>
        </Snackbar>
      </form>


    </div>
  );
};

export default FormRegistro;


