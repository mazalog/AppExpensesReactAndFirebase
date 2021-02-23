import React, { useState,useEffect,Suspense } from "react";
import { Grid, makeStyles, Paper, Box, IconButton } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ListaGastos from "./ListaGastos";
import FormAddGasto from "../FormAddGasto";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Tooltip from "@material-ui/core/Tooltip";
import { FirebaseAppProvider, useFirebaseApp, useFirestore } from "reactfire";
import "firebase/firestore";
import firebaseConfig from '../Firebase-config'
import GastosCategoria from "./GastosCategoria";
import DetailsIcon from '@material-ui/icons/Details';


const Contenedor = (props) => {

 var  usuario = props.userEmail;

  //style
  const style = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    padding: "6%",
 
  },
  }));
  const classes = style();

  //firebase
  const firebase = useFirebaseApp();
  const db = useFirestore();

  //inicializacion de gastos
  const gastos = [
    { categoria: "Inica", fecha:new Date() , descripcion:"Inicia", gasto: 0 },
  ];
  const [totalGastos, settotalGastos] = useState(gastos);
 
  //cerrar sesion
  function cierra() {
    firebase
      .auth()
      .signOut()
      .then(function () {
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //agregar gasto
  const addgasto = (gasto) => {
    settotalGastos([...totalGastos, gasto]);
    var categoria = gasto.categoria,
      fecha = gasto.fecha,
      descripcion = gasto.descripcion,
      gastoac = gasto.gasto;
     db.collection(usuario, "/gastos")
      .add({
        categoria: categoria,
        fecha: fecha,
        descripcion: descripcion,
        gasto: gastoac,
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  };
  
  //inicializacion de datos
    const [links, setLinks] = useState([]);

    //mostrar datos
    const getfirebase = () => {
      db.collection(usuario, "/gastos").onSnapshot((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setLinks(docs);
      });
    };
    useEffect(() => {
      getfirebase();
    }, []);


   return (
    <Paper className={classes.root}>
      <Router>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={4} md={3}>
            <Link to="/" className="btn btn-sm btn-dark" variant="outlined"> 
              <b>INGRESA</b>
            </Link>
          </Grid>
          <Grid item xs={4} md={3}>
            <Link to="ListaGastos" className="btn btn-sm btn-dark" variant="outlined">
              {" "}
              <b>GASTOS</b>{" "}
            </Link>
          </Grid>
          <Grid item xs={2} md={3}>
             <Link to="GastosCategoria">
             <Tooltip title="Gastos por categorias">
              <IconButton  color="primary" aria-label="Gastos por categorias">
              <DetailsIcon/>
              </IconButton>
            </Tooltip>
             </Link>
          </Grid>
          <Grid item xs={2} md={3}>
            <Tooltip title="Cerrar">
              <IconButton onClick={cierra} color="primary" aria-label="Cerrar">
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <Box marginTop={8}>
          <Switch>
          <Route path="/GastosCategoria">
                    <GastosCategoria links={links}/>
            </Route>
            <Route path="/ListaGastos">
            <FirebaseAppProvider firebaseConfig={firebaseConfig}>
                <ListaGastos gastos={totalGastos} links={links}  userEmail={usuario}  />
            </FirebaseAppProvider>
            </Route>
            <Route path="/">
              <FirebaseAppProvider firebaseConfig={firebaseConfig}>
                   <FormAddGasto addgasto={addgasto} totalGastos={links}  userEmail={usuario}/>
              </FirebaseAppProvider>
            </Route>
          </Switch>
        </Box>
      </Router>
    </Paper>
  );
};

export default Contenedor;
