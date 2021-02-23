import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import { setNameOfPage } from '../../../store/actions/nameOfPage';
import {
  getAll__CONTRACT,
  delete__CONTRACT,
} from '../../../store/actions/accountant/contract/contract';

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

const Contract = ({
  setNameOfPage,
  getAll__CONTRACT,
  delete__CONTRACT,

  state__CONTRACT,
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Договора');
    getAll__CONTRACT();
  }, [getAll__CONTRACT, setNameOfPage]);

  const onDeleteItem = (id) => {
    delete__CONTRACT(id);
  };
  // console.log(state__CONTRACT);

  const rows =
    state__CONTRACT.array__CONTRACT &&
    state__CONTRACT.array__CONTRACT.length > 0
      ? state__CONTRACT.array__CONTRACT.map((item) => {
          return {
            number__Contract: item.number__Contract,
            date_Contract: format(new Date(item.date_Contract), 'dd-MM-yyyy'),
            typesOf_WorkInTheContract: item.typesOf_WorkInTheContract,
            sum: item.sum ? item.sum : 'общий',
            ourFirm: item.ourFirm.name__Firm,
            client: item.client.name__Firm,

            edit: (
              <IconButton
                component={Link}
                href={`/accountant/contract/${item._id}`}
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
      title='Договора'
      columns={[
        { title: '№', field: 'number__Contract' },
        { title: 'Дата', field: 'date_Contract' },
        { title: 'Виды работ', field: 'typesOf_WorkInTheContract' },
        { title: 'Сумма', field: 'sum' },
        { title: 'Наша', field: 'ourFirm' },
        { title: 'Клиент', field: 'client' },

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
            width: 40,
            textAlign: 'center',
            // border: '1px solid #ff0000',
          },

          // headerStyle: {
          //   width: '10%',
          //   textAlign: 'center',
          //   // border: '1px solid #ffff00',
          // },
        },
      ]}
      data={rows}
    />
  );

  return (
    <Grid container className={classes.root} direction='column'>
      <Tooltip title='Добавить договор'>
        <Fab
          color='secondary'
          aria-label='add'
          component={Link}
          href={`/accountant/contract/add`}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <Grid item className={classes.item}>
        <Typography variant='h3' align='center'>
          Договора
        </Typography>
      </Grid>

      <Grid item className={classes.item}>
        {myMaterialTable}
      </Grid>
    </Grid>
  );
};

Contract.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll__CONTRACT: PropTypes.func.isRequired,
  delete__CONTRACT: PropTypes.func.isRequired,

  // state_auth: PropTypes.object.isRequired,
  state__CONTRACT: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // state_auth: state.auth,
  state__CONTRACT: state.contract,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll__CONTRACT,
  delete__CONTRACT,
})(Contract);
