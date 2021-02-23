import React, { useEffect, useState, Fragment, Suspense } from "react";
import "firebase/firestore";
import { useFirestore } from "reactfire";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import HomeIcon from "@material-ui/icons/Home";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import { green } from "@material-ui/core/colors";
import { Box, makeStyles } from "@material-ui/core";
import Dialogo from "./Dialogo";
import ReactDOM from "react-dom";
import MuiAlert from "@material-ui/lab/Alert";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import CommuteIcon from "@material-ui/icons/Commute";
import ImageAspectRatioIcon from "@material-ui/icons/ImageAspectRatio";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function FolderList(props) {
  const classes = useStyles();

  var usuario = props.userEmail;
  //firebase
  const db = useFirestore();

  const bajar = () => {
    ReactDOM.render(<p></p>, document.getElementById("editar"));
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  //eliminar datos
  const eliminar = (id) => {
    db.collection(usuario, "/gastos")
      .doc(id)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  };
  //edit data
  const editar = (id, categoriaed, fechaed, descripcioned, gastoed) => {
    var washingtonRef = db.collection(usuario, "/gastos").doc(id);
    var categoria = categoriaed,
      fecha = fechaed,
      descripcion = descripcioned,
      gasto = gastoed;
    return washingtonRef
      .update({
        categoria: categoria,
        fecha: fecha,
        descripcion: descripcion,
        gasto: gasto,
      })
      .then(function () {
        console.log("Document successfully updated!");
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };

  const modal = (id, categoria, fecha, descripcion, gasto) => {
    ReactDOM.render(
      <Dialogo
        dialogo={true}
        bajar={bajar}
        id={id}
        categoria={categoria}
        fecha={fecha}
        descripcion={descripcion}
        gasto={gasto}
        editar={editar}
      ></Dialogo>,
      document.getElementById("editar")
    );
  };

  const Icono = (categoria) => {
    switch (categoria) {
      case "Comida":
        return <FastfoodIcon fontSize="small" style={{ color: green[500] }} />;
      case "Diversion":
        return (
          <SportsEsportsIcon fontSize="small" style={{ color: green[500] }} />
        );
      case "Hogar":
        return <HomeIcon fontSize="small" style={{ color: green[500] }} />;
      case "Cuentas y Pagos":
        return <LocalAtmIcon fontSize="small" style={{ color: green[500] }} />;
      case "Transporte":
        return <CommuteIcon fontSize="small" style={{ color: green[500] }} />;
      case "Ropa":
        return (
          <ImageAspectRatioIcon
            fontSize="small"
            style={{ color: green[500] }}
          />
        );
      case "Salud e Higiene":
        return (
          <LocalHospitalIcon fontSize="small" style={{ color: green[500] }} />
        );
      case "Compras ":
        return <LocalMallIcon fontSize="small" style={{ color: green[500] }} />;
      default:
        return <LocalAtmIcon fontSize="small" style={{ color: green[500] }} />;
    }
  };

  const  fechaDeGasto=(fecha)=> {
    var dia = fecha.getDate(),
      mes = fecha.getMonth(),
      año = fecha.getFullYear();
    var meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Otubre",
      "Noviembre",
      "Diciembre",
    ];
    var pdia = dia,
      pmes = meses[mes],
      paño = año;
    return pdia + " de " + pmes + " del " + paño;
  }

  var gastot = 0;
  const GastoResultado = (gasto) => {
    const gastoActual = parseFloat(gasto);
    gastot = gastot + gastoActual;
    return ReactDOM.render(
      <p>TOTAL GASTADO:{gastot}$</p>,
      document.getElementById("gasto")
    );
  };

  const Gastos = React.lazy(() => import("./Gastos")); // Carga diferida

  return (
    <Fragment>

      <Suspense
        fallback={
          <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
          <CircularProgress />
        </Box>
        }
      >
        <Gastos
          links={props.links}
          GastoResultado={GastoResultado}
          fechaDeGasto={fechaDeGasto}
          Icono={Icono}
          modal={modal}
          eliminar={eliminar}
        />
      </Suspense>
      <Box mt={2}>
        <Alert severity="info">
          <b id="gasto"> </b>
        </Alert>
      </Box>
      <div id="editar"></div>
    </Fragment>
  );
}
