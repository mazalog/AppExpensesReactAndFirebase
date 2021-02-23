import { Grid, makeStyles, Paper, Box } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import FormIngreso from "./formIngreso";
import FormRegistro from "./FormRegistro";

const Ingreso = () => {

  //Style
  const style = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(9),
      padding: "6%",
    },
  }));
  const classes = style();

  return (
    <Paper className={classes.root}>
      <Router>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={6} md={3} container justify="center">
            <Link to="/" className="btn btn-dark" variant="outlined">
              {" "}
              <b>Iniciar </b>{" "}
            </Link>
          </Grid>
          <Grid item xs={6} md={3} container justify="center">
            <Link to="Registro" className="btn btn-success">
              {" "}
              <b>Registrate </b>{" "}
            </Link>
          </Grid>
        </Grid>
        <Box marginTop={8}>
          <Switch>
            <Route path="/Registro">
              <FormRegistro />
            </Route>
            <Route path="/">
              <FormIngreso />
            </Route>
          </Switch>
        </Box>
      </Router>
    </Paper>
  );
};

export default Ingreso;
