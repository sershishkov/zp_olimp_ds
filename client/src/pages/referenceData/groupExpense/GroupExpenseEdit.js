import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../../store/actions/nameOfPage';
import {
  getOne__GROUP_EXPENSE,
  update__GROUP_EXPENSE,
} from '../../../store/actions/referenceData/groupExpense';

import Fab from '@material-ui/core/Fab';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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

const GroupExpenseEdit = ({
  setNameOfPage,
  getOne__GROUP_EXPENSE,
  update__GROUP_EXPENSE,

  state__GROUP_EXPENSE,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name__Group_Expense: '',
  });

  const { name__Group_Expense } = formData;

  const [name__GROUP_EXPENSE_Helper, set_name__GROUP_EXPENSE_Helper] = useState(
    ''
  );

  const clearFormData = () => {
    setFormData({
      name__Group_Expense: '',
    });
  };

  useEffect(() => {
    setNameOfPage('Редактировать группу');
    if (id) {
      getOne__GROUP_EXPENSE(id);
    }

    return () => {
      clearFormData();
    };
  }, [setNameOfPage, getOne__GROUP_EXPENSE, id]);

  useLayoutEffect(() => {
    if (state__GROUP_EXPENSE.one__GROUP_EXPENSE) {
      // console.log(state__GROUP_EXPENSE.one__GROUP_EXPENSE);

      setFormData({
        name__Group_Expense: state__GROUP_EXPENSE.one__GROUP_EXPENSE
          .name__Group_Expense
          ? state__GROUP_EXPENSE.one__GROUP_EXPENSE.name__Group_Expense
          : '',
      });
    }
  }, [state__GROUP_EXPENSE.one__GROUP_EXPENSE]);

  const onSubmit = () => {
    update__GROUP_EXPENSE(id, name__Group_Expense);

    clearFormData();
    history.goBack();
  };

  const onChangeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });

    let valid;
    switch (event.target.id) {
      case 'name__Group_Expense':
        valid = event.target.value.length >= 3;
        if (!valid) {
          set_name__GROUP_EXPENSE_Helper('Минимальная длина 3 знака');
        } else {
          set_name__GROUP_EXPENSE_Helper('');
        }
        break;

      default:
        break;
    }
  };

  return (
    <Grid container className={classes.root} direction='column'>
      <Tooltip title='Назад'>
        <Fab
          color='secondary'
          aria-label='go Back'
          onClick={() => history.goBack()}
        >
          <ArrowBackIcon />
        </Fab>
      </Tooltip>

      <Grid item className={classes.item}>
        <Typography variant='h3' align='center'>
          Редактировать группу расходов
        </Typography>
      </Grid>

      <Grid item className={classes.item}>
        <TextField
          autoFocus
          id='name__Group_Expense'
          name='name__Group_Expense'
          label='Группа расходов'
          type='text'
          value={name__Group_Expense ? name__Group_Expense : ''}
          error={name__GROUP_EXPENSE_Helper.length !== 0}
          helperText={name__GROUP_EXPENSE_Helper}
          fullWidth
          autoComplete='text'
          onChange={(e) => onChangeHandler(e)}
        />
      </Grid>

      <Grid item className={classes.item}>
        <Button
          disabled={
            !name__Group_Expense || name__GROUP_EXPENSE_Helper.length !== 0
          }
          variant='contained'
          onClick={() => onSubmit()}
          color='primary'
        >
          Редактировать
        </Button>
      </Grid>
    </Grid>
  );
};

GroupExpenseEdit.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getOne__GROUP_EXPENSE: PropTypes.func.isRequired,
  update__GROUP_EXPENSE: PropTypes.func.isRequired,

  // state_auth: PropTypes.object.isRequired,
  state__GROUP_EXPENSE: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // state_auth: state.auth,
  state__GROUP_EXPENSE: state.groupExpense,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getOne__GROUP_EXPENSE,
  update__GROUP_EXPENSE,
})(GroupExpenseEdit);
