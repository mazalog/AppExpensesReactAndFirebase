import React, { useState } from "react";
import { Grid, Button, Box } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Input from "../ComponentsForm/Input";
import InputSelect from "../ComponentsForm/InputSelect";
import InputDate from "../ComponentsForm/InputDate";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import InputAdornment from "@material-ui/core/InputAdornment";
import DescriptionIcon from "@material-ui/icons/Description";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { makeStyles } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';

export default function FormDialog(props) {


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

  //Inicializacion de valores

  const initialValues = {
    categoria: props.categoria,
    fecha: props.fecha,
    descripcion: props.descripcion,
    gasto: props.gasto,
  };
  const [values, setValues] = useState(initialValues);

   const  handleInputChange=(event)=>{
    setValues({...values,[event.target.name]:event.target.value})
  }

  const [open, setOpen] = React.useState(props.dialogo);

  const handleClose = () => {
    setOpen(false);
    props.bajar();
  };

  const enviardatos = (event) => {
   event.preventDefault()    
   event.target.reset()
   props.editar(props.id,values.categoria,values.fecha,values.descripcion,values.gasto)
   handleClose()
  };



  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
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
                <InputDate label="Fecha" name="fecha" value={values.fecha} />
              </Grid>
              <Grid container justify="center" item xs={12}>
                <Input
                  label="Descripcion"
                  name="descripcion"
                  type="text"
                  value={values.descripcion}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DescriptionIcon></DescriptionIcon>
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid container justify="center" item xs={12}>
                <Input
                  label="Gasto"
                  name="gasto"
                  type="number"
                  value={values.gasto}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon></AttachMoneyIcon>
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleInputChange}
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
                    Editar
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary" endIcon={<CancelIcon/>}>
            Cancelar
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  );
}
