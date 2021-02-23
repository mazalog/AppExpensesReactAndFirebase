import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FastfoodIcon from '@material-ui/icons/Fastfood';
import HomeIcon from '@material-ui/icons/Home';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import CommuteIcon from '@material-ui/icons/Commute';
import ImageAspectRatioIcon from '@material-ui/icons/ImageAspectRatio';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import LocalMallIcon from '@material-ui/icons/LocalMall';

export default function MultilineTextFields(props) {

    const{label,helperText,name,value,onChange}=props
  return (
    <>
      <TextField
        select
        label={label}
        helperText={helperText}
        name={name}
        value={value}
        onChange={onChange}
    >
        <MenuItem value="Comida">
          <FastfoodIcon></FastfoodIcon> Comida
        </MenuItem>
        <MenuItem value="Diversion">
        <SportsEsportsIcon></SportsEsportsIcon> Diversion
        </MenuItem>
        <MenuItem value="Hogar">
        <HomeIcon></HomeIcon>   Hogar
        </MenuItem>
        <MenuItem value="Cuentas y pagos">
        <LocalAtmIcon></LocalAtmIcon>   Cuentas y pagos
        </MenuItem>
        <MenuItem value="Transporte">
        <CommuteIcon></CommuteIcon>   Transporte 
        </MenuItem>
        <MenuItem value="Ropa">
        <ImageAspectRatioIcon></ImageAspectRatioIcon>   Ropa
        </MenuItem>
        <MenuItem value="Salud e ingiene">
        <LocalHospitalIcon></LocalHospitalIcon>   Salud e higiene
        </MenuItem>
        <MenuItem value="Compras">
        <LocalMallIcon></LocalMallIcon>   Compras
        </MenuItem>
      </TextField>
    </>
  );
}
