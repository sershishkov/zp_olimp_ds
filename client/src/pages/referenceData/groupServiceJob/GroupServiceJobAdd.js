import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../../store/actions/nameOfPage';
import { add__GROUP_SERVICE_JOB } from '../../../store/actions/referenceData/groupServiceJob';

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

const GroupServiceJobAdd = ({
  setNameOfPage,
  add__GROUP_SERVICE_JOB,

  // state__GROUP_SERVICE_JOB,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const [formData, setFormData] = useState({
    name__Group_ServiceJob: '',
  });

  const { name__Group_ServiceJob } = formData;

  const [
    name__GROUP_SERVICE_JOB_Helper,
    set_name__GROUP_SERVICE_JOB_Helper,
  ] = useState('');

  const clearFormData = () => {
    setFormData({
      name__Group_ServiceJob: '',
    });
  };

  useEffect(() => {
    setNameOfPage('Добавить группу');
    return () => {
      clearFormData();
    };
  }, [setNameOfPage]);

  const onSubmit = () => {
    add__GROUP_SERVICE_JOB(name__Group_ServiceJob);

    clearFormData();
    history.goBack();
  };

  const onChangeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });

    let valid;
    switch (event.target.id) {
      case 'name__Group_ServiceJob':
        valid = event.target.value.length >= 3;
        if (!valid) {
          set_name__GROUP_SERVICE_JOB_Helper('Минимальная длина 3 знака');
        } else {
          set_name__GROUP_SERVICE_JOB_Helper('');
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
          Добавить работу
        </Typography>
      </Grid>

      <Grid item className={classes.item}>
        <TextField
          autoFocus
          id='name__Group_ServiceJob'
          name='name__Group_ServiceJob'
          label='Группа работ'
          type='text'
          value={name__Group_ServiceJob ? name__Group_ServiceJob : ''}
          error={name__GROUP_SERVICE_JOB_Helper.length !== 0}
          helperText={name__GROUP_SERVICE_JOB_Helper}
          fullWidth
          autoComplete='text'
          onChange={(e) => onChangeHandler(e)}
        />
      </Grid>

      <Grid item className={classes.item}>
        <Button
          disabled={
            !name__Group_ServiceJob ||
            name__GROUP_SERVICE_JOB_Helper.length !== 0
          }
          variant='contained'
          onClick={() => onSubmit()}
          color='primary'
        >
          Добавить
        </Button>
      </Grid>
    </Grid>
  );
};

GroupServiceJobAdd.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  add__GROUP_SERVICE_JOB: PropTypes.func.isRequired,

  // state_auth: PropTypes.object.isRequired,
  // state__GROUP_SERVICE_JOB: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // state_auth: state.auth,
  // state__GROUP_SERVICE_JOB: state.groupServiceJob,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  add__GROUP_SERVICE_JOB,
})(GroupServiceJobAdd);
