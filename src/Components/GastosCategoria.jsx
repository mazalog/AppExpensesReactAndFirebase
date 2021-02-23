import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import CommuteIcon from "@material-ui/icons/Commute";
import ImageAspectRatioIcon from "@material-ui/icons/ImageAspectRatio";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import HomeIcon from "@material-ui/icons/Home";

const GastosCategoria = (props) => {
  const links = props.links;

  var gastocomida = 0;
  const CalcularGastoComida = (gastoco) => {
    const m = parseFloat(gastoco);
    gastocomida = gastocomida + m;
  };

  var gastodiversion = 0;
  const CalcularGastoDiversion = (gastodi) => {
    const m = parseFloat(gastodi);
    gastodiversion = gastodiversion + m;
  };

  var gastohogar = 0;
  const CalcularGastoHogar = (gastoho) => {
    const m = parseFloat(gastoho);
    gastohogar = gastohogar + m;
  };

  var gastocuentas = 0;
  const CalcularGastoCuenta = (gastocu) => {
    const m = parseFloat(gastocu);
    gastocuentas = gastocuentas + m;
  };

  var gastotransporte = 0;
  const CalcularGastoTransporte = (gastotrans) => {
    const m = parseFloat(gastotrans);
    gastotransporte = gastotransporte + m;
  };

  var gastoropa = 0;
  const CalcularGastoRopa = (gastoro) => {
    const m = parseFloat(gastoro);
    gastoro = gastoro + m;
  };

  var gastosalud = 0;
  const CalcularGastoSalud = (gastosa) => {
    const m = parseFloat(gastosa);
    gastosalud = gastosalud + m;
  };

  var gastocompras = 0;
  const CalcularGastoCompra = (gastocom) => {
    const m = parseFloat(gastocom);
    gastocompras = gastocompras + m;
  };

  const determinar = (categoria, gasto) => {
    switch (categoria) {
      case "Comida":
        CalcularGastoComida(gasto);
        return;
      case "Diversion":
          CalcularGastoDiversion(gasto);
        return;
      case "Hogar":
          CalcularGastoHogar(gasto);
        return;
      case "Cuentas y Pagos":
        CalcularGastoCuenta(gasto);
        return 
      case "Transporte":
          CalcularGastoTransporte(gasto);
        return 
      case "Ropa":
          CalcularGastoRopa(gasto);
        return 
      case "Salud e Higiene":
          CalcularGastoSalud(gasto);
        return 
      case "Compras ":
          CalcularGastoCompra(gasto);
        return 
        default:
        return
    }
  };

  return (
    <Fragment>
      {links.map((item, index) => (
        <div key={index}>{determinar(item.categoria, item.gasto)}</div>
      ))}

      <Grid container spacing={1}>
        <Grid item xs={6}>
          <FastfoodIcon fontSize="small" style={{ color: green[500] }} />
        </Grid>
        <Grid item xs={6}>
          <p><b>{gastocomida}$</b></p>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <SportsEsportsIcon fontSize="small" style={{ color: green[500] }} />
        </Grid>
        <Grid item xs={6}>
          <p><b>{gastodiversion}$</b></p>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <HomeIcon fontSize="small" style={{ color: green[500] }} />
        </Grid>
        <Grid item xs={6}>
          <p><b>{gastohogar}$</b></p>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <LocalAtmIcon fontSize="small" style={{ color: green[500] }} />
        </Grid>
        <Grid item xs={6}>
          <p><b>{gastocuentas}$</b></p>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <CommuteIcon fontSize="small" style={{ color: green[500] }} />
        </Grid>
        <Grid item xs={6}>
          <p><b>{gastotransporte}$</b></p>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <ImageAspectRatioIcon
            fontSize="small"
            style={{ color: green[500] }}
          />
        </Grid>
        <Grid item xs={6}>
          <p><b>{gastoropa}$</b></p>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <LocalHospitalIcon fontSize="small" style={{ color: green[500] }} />
        </Grid>
        <Grid item xs={6}>
          <p><b>{gastosalud}$</b></p>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <LocalMallIcon fontSize="small" style={{ color: green[500] }} />
        </Grid>
        <Grid item xs={6}>
          <p><b>{gastocompras}$</b></p>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default GastosCategoria;
