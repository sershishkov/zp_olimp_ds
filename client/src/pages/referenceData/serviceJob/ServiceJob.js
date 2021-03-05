import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../../store/actions/nameOfPage';
import {
  getAll__SERVICE_JOB,
  delete__SERVICE_JOB,
} from '../../../store/actions/referenceData/serviceJob';

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

const ServiceJob = ({
  setNameOfPage,
  getAll__SERVICE_JOB,
  delete__SERVICE_JOB,

  state__SERVICE_JOB,
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Работники');
    getAll__SERVICE_JOB();
  }, [setNameOfPage, getAll__SERVICE_JOB]);

  const onDeleteItem = (id) => {
    delete__SERVICE_JOB(id);
  };

  const rows =
    state__SERVICE_JOB.array__SERVICE_JOB &&
    state__SERVICE_JOB.array__SERVICE_JOB.length > 0
      ? state__SERVICE_JOB.array__SERVICE_JOB.map((item) => {
          return {
            name__ServiceJob: item.name__ServiceJob,
            unit: item.unit.name__Unit,
            employeePrice: item.employeePrice,
            sellingPrice: item.sellingPrice,
            edit: (
              <IconButton
                component={Link}
                href={`/reference-data/service-job/${item._id}`}
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
      title='Список работ'
      columns={[
        { title: 'Работа', field: 'name__ServiceJob' },
        {
          title: 'Ед.изм',
          field: 'unit',
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
          title: 'Цена работникам',
          field: 'employeePrice',

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
          title: 'Цена клиентам',
          field: 'sellingPrice',
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
      <Tooltip title='Добавить работу'>
        <Fab
          color='secondary'
          aria-label='add'
          component={Link}
          href={`/reference-data/service-job/add`}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <Grid item className={classes.item}>
        <Typography variant='h3' align='center'>
          Работы
        </Typography>
      </Grid>

      <Grid item className={classes.item}>
        {myMaterialTable}
      </Grid>
    </Grid>
  );
};

ServiceJob.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll__SERVICE_JOB: PropTypes.func.isRequired,
  delete__SERVICE_JOB: PropTypes.func.isRequired,

  // state_auth: PropTypes.object.isRequired,
  state__SERVICE_JOB: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // state_auth: state.auth,
  state__SERVICE_JOB: state.serviceJob,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll__SERVICE_JOB,
  delete__SERVICE_JOB,
})(ServiceJob);
