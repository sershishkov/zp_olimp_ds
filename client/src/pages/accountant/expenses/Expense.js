import React, { useEffect, useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  add__EXPENSE,
  getAll__EXPENSE,
  getOne__EXPENSE,
  update__EXPENSE,
  delete__EXPENSE,
} from '../../../store/actions/accountant/expenses/expense';
import { getAll__GROUP_EXPENSE } from '../../../store/actions/referenceData/groupExpense';

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

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import InputLabel from '@material-ui/core/InputLabel';

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

const Expense = ({
  add__EXPENSE,
  getAll__EXPENSE,
  getOne__EXPENSE,
  update__EXPENSE,
  delete__EXPENSE,

  getAll__GROUP_EXPENSE,

  state__EXPENSE,
  state__GROUP_EXPENSE,
}) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);

  const [formData, setFormData] = useState({
    name__Expense: '',
    group_Expense: '',
  });

  const { name__Expense, group_Expense } = formData;

  const [editId, setEditId] = useState('');
  const [buttonText, setButtonText] = useState('');

  const [name__EXPENSE_Helper, set_name__EXPENSE_Helper] = useState('');

  const clearFormData = () => {
    setFormData({
      name__Expense: '',
      group_Expense: '',
    });
    setEditId('');
  };

  useEffect(() => {
    getAll__EXPENSE();
    getAll__GROUP_EXPENSE();

    clearFormData();

    return () => {
      clearFormData();
    };
  }, [getAll__EXPENSE, getAll__GROUP_EXPENSE]);

  useLayoutEffect(() => {
    if (state__EXPENSE.one__EXPENSE) {
      // console.log(state__EXPENSE.one__EXPENSE);

      setFormData({
        name__Expense: state__EXPENSE.one__EXPENSE.name__Expense
          ? state__EXPENSE.one__EXPENSE.name__Expense
          : '',
        group_Expense: state__EXPENSE.one__EXPENSE.group_Expense
          ? state__EXPENSE.one__EXPENSE.group_Expense._id
          : '',
      });
    }
  }, [state__EXPENSE.one__EXPENSE]);

  const onDeleteItem = (id) => {
    delete__EXPENSE(id);
    setEditId('');
  };
  const onSubmit = () => {
    if (buttonText === 'Редактировать' && editId) {
      update__EXPENSE(editId, name__Expense, group_Expense);
    } else if (buttonText === 'Добавить') {
      add__EXPENSE(name__Expense, group_Expense);
    }

    setOpenDialog(false);
    clearFormData();
    setEditId('');
  };

  const buttonAddHandler = () => {
    setOpenDialog(true);
    setButtonText('Добавить');
    setEditId('');
    clearFormData();
  };

  const buttonEditHandler = (id) => {
    getOne__EXPENSE(id);
    setEditId(id);
    setButtonText('Редактировать');

    setOpenDialog(true);
  };

  const onChangeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });

    let valid;
    switch (event.target.id) {
      case 'name__Expense':
        valid = event.target.value.length >= 3;
        if (!valid) {
          set_name__EXPENSE_Helper('Минимальная длина 3 знака');
        } else {
          set_name__EXPENSE_Helper('');
        }
        break;

      default:
        break;
    }
  };
  // console.log(state__EXPENSE.array__EXPENSE);
  const rows =
    state__EXPENSE.array__EXPENSE && state__EXPENSE.array__EXPENSE.length > 0
      ? state__EXPENSE.array__EXPENSE.map((item) => {
          return {
            name__Expense: item.name__Expense,
            group_Expense: item.group_Expense.name__Group_Expense,

            edit: (
              <IconButton onClick={() => buttonEditHandler(item._id)}>
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
      title='Список расходов'
      columns={[
        { title: 'Расход', field: 'name__Expense' },
        { title: 'Группа', field: 'group_Expense' },

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
      <Tooltip title='Добавить расход'>
        <Fab
          color='secondary'
          aria-label='add'
          onClick={() => buttonAddHandler()}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <Grid item className={classes.item}>
        <Typography variant='h3' align='center'>
          Расходы
        </Typography>
      </Grid>

      <Grid item className={classes.item}>
        {myMaterialTable}
      </Grid>
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          clearFormData();
        }}
        aria-labelledby='form-dialog-title'
        aria-describedby='alert-dialog-description'
        fullWidth
      >
        <DialogTitle id='form-dialog-title'>Расходы</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {buttonText ? buttonText : 'Поехали'}
          </DialogContentText>
          <Grid
            container
            direction='column'
            justify='flex-start'
            alignItems='center'
          >
            <Grid item className={classes.dialogItem}>
              <TextField
                autoFocus
                id='name__Expense'
                name='name__Expense'
                label='Расход'
                type='text'
                value={name__Expense ? name__Expense : ''}
                error={name__EXPENSE_Helper.length !== 0}
                helperText={name__EXPENSE_Helper}
                fullWidth
                autoComplete='text'
                onChange={(e) => onChangeHandler(e)}
              />
            </Grid>

            <Grid item className={classes.dialogItem}>
              <InputLabel id='group_Expense-label'>Группа</InputLabel>
              <Select
                labelId='group_Expense-label'
                id='group_Expense'
                name='group_Expense'
                // multiple
                required
                fullWidth
                value={group_Expense ? group_Expense : ''}
                onChange={(e) => onChangeHandler(e)}
                className={classes.select}
              >
                {state__GROUP_EXPENSE.array__GROUP_EXPENSE &&
                  state__GROUP_EXPENSE.array__GROUP_EXPENSE.length > 0 &&
                  state__GROUP_EXPENSE.array__GROUP_EXPENSE.map((item) => (
                    <MenuItem
                      key={item._id}
                      value={item._id}
                      className={classes.selectItem}
                    >
                      {item.name__Group_Expense}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            onClick={() => {
              setOpenDialog(false);
              clearFormData();
            }}
            color='primary'
          >
            Выход
          </Button>
          <Button
            disabled={
              !name__Expense ||
              !group_Expense ||
              name__EXPENSE_Helper.length !== 0
            }
            variant='contained'
            onClick={() => onSubmit()}
            color='primary'
          >
            {buttonText ? buttonText : 'Поехали'}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

Expense.propTypes = {
  add__EXPENSE: PropTypes.func.isRequired,
  getAll__EXPENSE: PropTypes.func.isRequired,
  getOne__EXPENSE: PropTypes.func.isRequired,
  update__EXPENSE: PropTypes.func.isRequired,
  delete__EXPENSE: PropTypes.func.isRequired,

  getAll__GROUP_EXPENSE: PropTypes.func.isRequired,

  // state_auth: PropTypes.object.isRequired,
  state__EXPENSE: PropTypes.object.isRequired,
  state__GROUP_EXPENSE: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // state_auth: state.auth,
  state__EXPENSE: state.expense,
  state__GROUP_EXPENSE: state.groupExpense,
});

export default connect(mapStateToProps, {
  add__EXPENSE,
  getAll__EXPENSE,
  getOne__EXPENSE,
  update__EXPENSE,
  delete__EXPENSE,

  getAll__GROUP_EXPENSE,
})(Expense);
