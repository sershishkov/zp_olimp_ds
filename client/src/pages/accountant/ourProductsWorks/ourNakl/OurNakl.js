import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import { setNameOfPage } from '../../../../store/actions/nameOfPage';
import {
  getAll__OUR_NAKL,
  delete__OUR_NAKL,
} from '../../../../store/actions/accountant/ourProductsWorks/ourNakl';

import MaterialTable from '../../../../components/MaterialTable';
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
  getAll__OUR_NAKL,
  delete__OUR_NAKL,

  state__OUR_NAKL,
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Накладные');
    getAll__OUR_NAKL();
  }, [getAll__OUR_NAKL, setNameOfPage]);

  const onDeleteItem = (id) => {
    delete__OUR_NAKL(id);
  };

  const rows =
    state__OUR_NAKL.array__OUR_NAKL &&
    state__OUR_NAKL.array__OUR_NAKL.length > 0
      ? state__OUR_NAKL.array__OUR_NAKL.map((item) => {
          return {
            naklNumber: item.naklNumber,
            naclDate: format(item.naclDate, 'dd-MM-yyyy'),
            client: item.client.name__Firm,
            sum__Product: item.sum__Product,
            active: item.active ? 'да' : 'нет',

            edit: (
              <IconButton
                component={Link}
                href={`/accountant/our-products-works/our-nakl/${item._id}`}
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
        { title: '№ накл', field: 'naklNumber' },
        { title: 'Дата накл', field: 'naclDate' },
        { title: 'Клиент', field: 'client' },
        { title: 'Сумма', field: 'sum__Product' },
        { title: 'Активна?', field: 'active' },

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
      <Tooltip title='Добавить Накладную'>
        <Fab
          color='secondary'
          aria-label='add'
          component={Link}
          href={`/accountant/our-products-works/our-nakl/add`}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <Grid item className={classes.item}>
        <Typography variant='h3' align='center'>
          Накладные
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
  getAll__OUR_NAKL: PropTypes.func.isRequired,
  delete__OUR_NAKL: PropTypes.func.isRequired,

  // state_auth: PropTypes.object.isRequired,
  state__OUR_NAKL: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // state_auth: state.auth,
  state__OUR_NAKL: state.ourNakl,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll__OUR_NAKL,
  delete__OUR_NAKL,
})(Firm);
