import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MaterialTable from '../../../components/MaterialTable';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { setNameOfPage } from '../../../store/actions/nameOfPage';
import {
  getAll__UNIT,
  delete__UNIT,
} from '../../../store/actions/referenceData/unit';

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
}));

const Unit = ({
  setNameOfPage,
  getAll__UNIT,
  delete__UNIT,

  state__UNIT,
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Единицы измерения');
    getAll__UNIT();
  }, [setNameOfPage, getAll__UNIT]);

  const onDeleteItem = (id) => {
    delete__UNIT(id);
  };

  const rows =
    state__UNIT.array__UNIT && state__UNIT.array__UNIT.length > 0
      ? state__UNIT.array__UNIT.map((item) => {
          return {
            name__Unit: item.name__Unit,
            edit: (
              <IconButton
                component={Link}
                href={`/reference-data/unit/${item._id}`}
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
      title='Единицы измерения'
      columns={[
        { title: 'Единица измерения', field: 'name__Unit' },

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
      <Tooltip title='Добавить единицу'>
        <Fab
          color='secondary'
          aria-label='add'
          component={Link}
          href={`/reference-data/unit/add`}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <Grid item className={classes.item}>
        <Typography variant='h3' align='center'>
          Cписок единиц измерения
        </Typography>
      </Grid>

      <Grid item className={classes.item}>
        {myMaterialTable}
      </Grid>
    </Grid>
  );
};

Unit.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll__UNIT: PropTypes.func.isRequired,
  delete__UNIT: PropTypes.func.isRequired,

  // state_auth: PropTypes.object.isRequired,
  state__UNIT: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // state_auth: state.auth,
  state__UNIT: state.unit,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll__UNIT,
  delete__UNIT,
})(Unit);
