import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';
import moment from 'moment';
import { Checkbox, Link, Button } from '@material-ui/core';

// import Moment from 'react-moment';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

let counter = 0;
function createData(name, calories, fat) {
  counter += 1;
  return { id: counter, name, calories, fat };
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class CustomPaginationActionsTable extends React.Component {
  state = {
    rows: [
    //   createData('Cupcake', 305, 3.7),
    //   createData('Donut', 452, 25.0),
    //   createData('Eclair', 262, 16.0),
    //   createData('Frozen yoghurt', 159, 6.0),
    //   createData('Gingerbread', 356, 16.0),
    //   createData('Honeycomb', 408, 3.2),
    //   createData('Ice cream sandwich', 237, 9.0),
    //   createData('Jelly Bean', 375, 0.0),
    //   createData('KitKat', 518, 26.0),
    //   createData('Lollipop', 392, 0.2),
    //   createData('Marshmallow', 318, 0),
    //   createData('Nougat', 360, 19.0),
    //   createData('Oreo', 437, 18.0),
    ],//.sort((a, b) => (a.calories < b.calories ? -1 : 1))
    page: 0,
    rowsPerPage: 2,
  };
  componentDidMount() {  //componente de ciclo de vida, integrar librerias de terceros (plugins jquery), 
    //realizar alguna petición ajax ó establecer algún timer de tipo setTimeout ó setInterval.
    console.log('componentDidMount');
  axios.get('/ws/rest/tasks/paginated', { params : { PageSize: this.state.rowsPerPage, page: this.state.page+1}})
  .then(res => {
      const tareas = res.data.tasks;
      console.log(tareas);
      // asignar un nuevo estado a la clase
      this.setState({ rows: tareas, count : res.data.count }); 
  })
  
  .catch(err => {
    console.log('Error');
      console.log(err);
})
  }
  //handleChangePage: Se ejecuta en cada pulsación de tecla para actualizar el estado Reaccionar, 
  //el valor mostrado se actualizará a medida que el usuario escriba.
  handleChangePage = (event, page) => {
    axios.get('/ws/rest/tasks/paginated', {params : {page: page +1, PageSize: this.state.rowsPerPage}})
      .then(res => {
        const tareas = res.data;
        this.setState({ page: page });
        this.setState({ rows: res.data.tasks });
      })
    .catch(err => {
        console.log('Error');
        console.log(err);
    })
  };
//filas por paginas
  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
      const tamañoDePagina = event.target.value; //puedo acceder al valor del campo
      axios.get('ws/rest/tasks/paginated', {params : {page: this.state.page +1, PageSize: this.state.tamañoDePagina }})
      .then(res => {
        const tareas = res.data;
        console.log(tareas);
        this.setState({ rows: tareas });
      })
    .catch(err => {
        console.log('Error');
        console.log(err);
    })
  };
  // Se intento agregar boton "nuevo"
  return (
    <>
      <Grid container spacing={3}>
        <Grid item x5={10}>
          </Grid>
          <Grid item x5={2}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            component={Link}
            to={`${match.url}/new`}
            >
            <AddIcon />
            Nuevo
          </Button>
        </Grid>
      </Grid>
    

  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    //Aqui estarmos creando nuestra tabla con sus respectivas filas
    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
             <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell align="left">Descripcion</TableCell>
                  <TableCell align="left">Fecha</TableCell>
                  <TableCell align="left">Estado</TableCell>
                  <TableCell align="left">Acciones</TableCell>
                </TableRow> 
              </TableHead>
                <TableBody>
                {this.state.rows.map( row => (
                  <TableRow key = {row.id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="left">{moment(row.limitDate).format('DD/MM/YYYY, h:mm')}</TableCell>
                    {/* Crear columna para mostrar un check si esta marcada*/}
                    <TableCell>
                      <Checkbox
                        checked={row.resuelta}
                        disabled
                        //onChange={handleChange('checkedA')}
                        value="checkedA" />
                    </TableCell>
                    {/* Acciones que habran en la tabla
                    <TableCell align="center">
                      <IconButton
                      aria-label="resolve"
                      className={classes.margin}
                      onClick={() => resolveTask(row)}>
                        {/* Para mostrar icono de acuerdo a si esta realizada
                      { row.resuelta ? <CloseIcon frontSize="default" /> : <CheckIcon>}  
                      </IconButton>
                      <IconButton
                      aria-label="edit"
                      className={classes.margin}
                      component={Link}
                      to={`${match.url}/edit/${row.id}`}>
                      <EditIcon fontSize="default" />
                      </IconButton> 

                    </TableCell> */}
                  </TableRow>
                ))
                }
                </TableBody>
          <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[2, 5, 10]}
                  colSpan={3}
                  count={this.state.count}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
          </TableFooter>
          </Table>
        </div>
      </Paper>
    )
  };
  



// CustomPaginationActionsTable.PropTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(CustomPaginationActionsTable);

