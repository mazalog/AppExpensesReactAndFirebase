import React from 'react'
import { IconButton, Grid } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import DateRangeIcon from "@material-ui/icons/DateRange";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import EditIcon from "@material-ui/icons/Edit";




const Gastos = (props) => {
    return (
        <div>
              {props.links.map((item, index) => (
        <div className="card mb-4 mt-4" key={index}>
          {props.GastoResultado(item.gasto)}
          <div className="card-header">
            <p>
              {" "}
              <small className="text-muted">
                <DateRangeIcon color="primary"> </DateRangeIcon>
                {props.fechaDeGasto(item.fecha.toDate())}
              </small>{" "}
            </p>
          </div>
          <div className="card-body">
            <blockquote className=" mb-0">
              <Grid container>
                <Grid container justify="center" item xs={2} sm={2} md={2}>
                  {props.Icono(item.categoria)}
                </Grid>

                <Grid container justify="center" item xs={10} sm={6} md={6}>
                  <p>{item.descripcion}</p>
                </Grid>
                <Grid container justify="center" item xs={2} sm={2} md={2}>
                  <p className="mt-1">{item.gasto}$</p>
                </Grid>
                <Grid container justify="center" item xs={10} sm={2} md={2}>
                  <div className="d-flex">
                    <Tooltip title="Editar">
                      <IconButton
                        type="button"
                        onClick={() =>
                          props.modal(
                            item.id,
                            item.categoria,
                            item.fecha.toDate(),
                            item.descripcion,
                            item.gasto
                          )
                        }
                        color="primary"
                        aria-label="Editar"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar" placement="top">
                      <div>
                        <IconButton
                          type="button"
                          onClick={() => props.eliminar(item.id)}
                          color="secondary"
                          aria-label="Eliminar"
                        >
                          <DeleteSweepIcon fontSize="small" />
                        </IconButton>
                      </div>
                    </Tooltip>
                  </div>
                </Grid>
              </Grid>
            </blockquote>
          </div>
        </div>
      ))}
        </div>
    )
}

export default Gastos
