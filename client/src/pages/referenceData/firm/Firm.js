import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../../store/actions/nameOfPage';
import {
  getAll__FIRM,
  delete__FIRM,
} from '../../../store/actions/referenceData/firm';

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

const Firm = ({
  setNameOfPage,
  getAll__FIRM,
  delete__FIRM,

  state__FIRM,
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Фирмы');
    getAll__FIRM();
  }, [getAll__FIRM, setNameOfPage]);

  const onDeleteItem = (id) => {
    delete__FIRM(id);
  };

  const rows =
    state__FIRM.array__FIRM && state__FIRM.array__FIRM.length > 0
      ? state__FIRM.array__FIRM.map((item) => {
          return {
            name__Firm: item.name__Firm,
            address: item.address,
            who_is: item.who_is.join(', '),

            edit: (
              <IconButton
                component={Link}
                href={`/reference-data/firm/${item._id}`}
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
      title='Список Фирм'
      columns={[
        { title: 'Работа', field: 'name__Firm' },
        { title: 'Адрес', field: 'address' },
        { title: 'Кто есть', field: 'who_is' },

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
      <Tooltip title='Добавить фирму'>
        <Fab
          color='secondary'
          aria-label='add'
          component={Link}
          href={`/reference-data/firm/add`}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <Grid item className={classes.item}>
        <Typography variant='h3' align='center'>
          Cписок фирм
        </Typography>
      </Grid>

      <Grid item className={classes.item}>
        {myMaterialTable}
      </Grid>
    </Grid>
  );
};

Firm.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll__FIRM: PropTypes.func.isRequired,
  delete__FIRM: PropTypes.func.isRequired,

  // state_auth: PropTypes.object.isRequired,
  state__FIRM: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // state_auth: state.auth,
  state__FIRM: state.firm,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll__FIRM,
  delete__FIRM,
})(Firm);
