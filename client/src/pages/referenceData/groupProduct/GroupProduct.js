import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../../store/actions/nameOfPage';
import {
  getAll__GROUP_PRODUCT,
  delete__GROUP_PRODUCT,
} from '../../../store/actions/referenceData/groupProduct';

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

const GroupProduct = ({
  setNameOfPage,
  getAll__GROUP_PRODUCT,
  delete__GROUP_PRODUCT,

  state__GROUP_PRODUCT,
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Группы товаров');
    getAll__GROUP_PRODUCT();
  }, [setNameOfPage, getAll__GROUP_PRODUCT]);

  const onDeleteItem = (id) => {
    delete__GROUP_PRODUCT(id);
  };

  const rows =
    state__GROUP_PRODUCT.array__GROUP_PRODUCT &&
    state__GROUP_PRODUCT.array__GROUP_PRODUCT.length > 0
      ? state__GROUP_PRODUCT.array__GROUP_PRODUCT.map((item) => {
          return {
            name__Group_Product: item.name__Group_Product,

            edit: (
              <IconButton
                component={Link}
                href={`/reference-data/group-product/${item._id}`}
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
      title='Группы товаров'
      columns={[
        { title: 'Группа', field: 'name__Group_Product' },

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
      <Tooltip title='Добавить группу'>
        <Fab
          color='secondary'
          aria-label='add'
          component={Link}
          href={`/reference-data/group-product/add`}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <Grid item className={classes.item}>
        <Typography variant='h3' align='center'>
          Группы товаров
        </Typography>
      </Grid>

      <Grid item className={classes.item}>
        {myMaterialTable}
      </Grid>
    </Grid>
  );
};

GroupProduct.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll__GROUP_PRODUCT: PropTypes.func.isRequired,
  delete__GROUP_PRODUCT: PropTypes.func.isRequired,

  // state_auth: PropTypes.object.isRequired,
  state__GROUP_PRODUCT: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // state_auth: state.auth,
  state__GROUP_PRODUCT: state.groupProduct,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll__GROUP_PRODUCT,
  delete__GROUP_PRODUCT,
})(GroupProduct);
