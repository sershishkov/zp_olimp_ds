import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../../store/actions/nameOfPage';
import {
  getAll__GROUP_EXPENSE,
  delete__GROUP_EXPENSE,
} from '../../../store/actions/referenceData/groupExpense';

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

const GroupExpense = ({
  setNameOfPage,
  getAll__GROUP_EXPENSE,
  delete__GROUP_EXPENSE,

  state__GROUP_EXPENSE,
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Группы затрат');
    getAll__GROUP_EXPENSE();
  }, [setNameOfPage, getAll__GROUP_EXPENSE]);

  const onDeleteItem = (id) => {
    delete__GROUP_EXPENSE(id);
  };

  const rows =
    state__GROUP_EXPENSE.array__GROUP_EXPENSE &&
    state__GROUP_EXPENSE.array__GROUP_EXPENSE.length > 0
      ? state__GROUP_EXPENSE.array__GROUP_EXPENSE.map((item) => {
          return {
            name__Group_Expense: item.name__Group_Expense,

            edit: (
              <IconButton
                component={Link}
                href={`/reference-data/group-expense/${item._id}`}
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
      title='Группы расходов'
      columns={[
        { title: 'Группа', field: 'name__Group_Expense' },

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
          href={`/reference-data/group-expense/add`}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <Grid item className={classes.item}>
        <Typography variant='h3' align='center'>
          Группы расходов
        </Typography>
      </Grid>

      <Grid item className={classes.item}>
        {myMaterialTable}
      </Grid>
    </Grid>
  );
};

GroupExpense.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll__GROUP_EXPENSE: PropTypes.func.isRequired,
  delete__GROUP_EXPENSE: PropTypes.func.isRequired,

  // state_auth: PropTypes.object.isRequired,
  state__GROUP_EXPENSE: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // state_auth: state.auth,
  state__GROUP_EXPENSE: state.groupExpense,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll__GROUP_EXPENSE,
  delete__GROUP_EXPENSE,
})(GroupExpense);
