import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../../store/actions/nameOfPage';
import {
  getAll__PRODUCT,
  delete__PRODUCT,
} from '../../../store/actions/referenceData/product';
import { getAll__UNIT } from '../../../store/actions/referenceData/unit';
import { getAll__GROUP_PRODUCT } from '../../../store/actions/referenceData/groupProduct';

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

const Product = ({
  setNameOfPage,
  getAll__PRODUCT,
  delete__PRODUCT,

  getAll__UNIT,
  getAll__GROUP_PRODUCT,

  state__PRODUCT,

  state__UNIT,
  state__GROUP_PRODUCT,
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Товары');
    getAll__PRODUCT();

    getAll__UNIT();
    getAll__GROUP_PRODUCT();
  }, [setNameOfPage, getAll__PRODUCT, getAll__UNIT, getAll__GROUP_PRODUCT]);

  const onDeleteItem = (id) => {
    delete__PRODUCT(id);
  };

  const rows =
    state__PRODUCT.array__PRODUCT && state__PRODUCT.array__PRODUCT.length > 0
      ? state__PRODUCT.array__PRODUCT.map((item) => {
          return {
            name__Product: item.name__Product,
            unit: item.unit.name__Unit,
            enteredPrice: item.enteredPrice,
            // group_Product: item.group_Product.name__Group_Product,

            edit: (
              <IconButton
                component={Link}
                href={`/reference-data/product/${item._id}`}
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
        { title: 'Товар', field: 'name__Product' },
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
          title: 'Цена Закуп',
          field: 'enteredPrice',
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
        // { title: 'Группа товаров', field: 'group_Product' },

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
      <Tooltip title='Добавить товар'>
        <Fab
          color='secondary'
          aria-label='add'
          component={Link}
          href={`/reference-data/product/add`}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <Grid item className={classes.item}>
        <Typography variant='h3' align='center'>
          Товары
        </Typography>
      </Grid>

      <Grid item className={classes.item}>
        {myMaterialTable}
      </Grid>
    </Grid>
  );
};

Product.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll__PRODUCT: PropTypes.func.isRequired,
  delete__PRODUCT: PropTypes.func.isRequired,

  getAll__UNIT: PropTypes.func.isRequired,
  getAll__GROUP_PRODUCT: PropTypes.func.isRequired,

  // state_auth: PropTypes.object.isRequired,
  state__PRODUCT: PropTypes.object.isRequired,
  state__UNIT: PropTypes.object.isRequired,
  state__GROUP_PRODUCT: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // state_auth: state.auth,
  state__PRODUCT: state.product,

  state__UNIT: state.unit,
  state__GROUP_PRODUCT: state.groupProduct,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll__PRODUCT,
  delete__PRODUCT,

  getAll__UNIT,
  getAll__GROUP_PRODUCT,
})(Product);
