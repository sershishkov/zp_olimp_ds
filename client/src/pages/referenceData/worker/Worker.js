import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../../store/actions/nameOfPage';
import {
  getAll__WORKER,
  delete__WORKER,
} from '../../../store/actions/referenceData/worker';

import MaterialTable from '../../../components/MaterialTable';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Tooltip from '@material-ui/core/Tooltip';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: 'auto',
  },
  item: {
    width: '100%',
    marginBottom: '2em',
  },
  dialogItem: {
    width: '100%',
  },
}));

const Worker = ({
  setNameOfPage,
  getAll__WORKER,
  delete__WORKER,

  state__WORKER,
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Работники');
    getAll__WORKER();
  }, [setNameOfPage, getAll__WORKER]);

  const onDeleteItem = (id) => {
    delete__WORKER(id);
  };

  const rows =
    state__WORKER.array__WORKER && state__WORKER.array__WORKER.length > 0
      ? state__WORKER.array__WORKER.map((item) => {
          return {
            name__Worker: item.name__Worker,
            surname: item.surname,

            edit: (
              <IconButton
                component={Link}
                href={`/reference-data/worker/${item._id}`}
              >
                <EditIcon color='primary' />
              </IconButton>
            ),
            delete: (
              <IconButton onClick={() => onDeleteItem(item._id)}>
                <DeleteForeverIcon color='error' />
              </IconButton>
            ),
          };
        })
      : [];

  //

  const myMaterialTable = (
    <MaterialTable
      title='список работников'
      columns={[
        { title: 'Имя', field: 'name__Worker' },
        { title: 'Фамилия', field: 'surname' },

        {
          title: 'Редактировать',
          field: 'edit',
          sorting: false,
          filtering: false,
          cellStyle: {
            width: '10%',
            textAlign: 'center',
            // border: '1px solid #ff0000',
          },

          headerStyle: {
            width: '10%',
            textAlign: 'center',
            // border: '1px solid #ffff00',
          },
        },
        {
          title: 'Удалить',
          field: 'delete',
          sorting: false,
          filtering: false,
          cellStyle: {
            width: '10%',
            textAlign: 'center',
            // border: '1px solid #ff0000',
          },

          headerStyle: {
            width: '10%',
            textAlign: 'center',
            // border: '1px solid #ffff00',
          },
        },
      ]}
      data={rows}
    />
  );

  return (
    <Grid container className={classes.root} direction='column'>
      <Tooltip title='Добавить работника '>
        <Fab
          color='secondary'
          aria-label='add'
          component={Link}
          href={`/reference-data/worker/add`}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <Grid item className={classes.item}>
        <Typography variant='h3' align='center'>
          Cписок работников
        </Typography>
      </Grid>

      <Grid item className={classes.item}>
        {myMaterialTable}
      </Grid>
    </Grid>
  );
};

Worker.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll__WORKER: PropTypes.func.isRequired,
  delete__WORKER: PropTypes.func.isRequired,

  // state_auth: PropTypes.object.isRequired,
  state__WORKER: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // state_auth: state.auth,
  state__WORKER: state.worker,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll__WORKER,
  delete__WORKER,
})(Worker);
