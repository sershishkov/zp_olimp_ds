import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../../store/actions/nameOfPage';
import {
  getOne__GROUP_SERVICE_JOB,
  update__GROUP_SERVICE_JOB,
} from '../../../store/actions/referenceData/groupServiceJob';

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

const GroupServiceJobEdit = ({
  setNameOfPage,
  getOne__GROUP_SERVICE_JOB,
  update__GROUP_SERVICE_JOB,

  state__GROUP_SERVICE_JOB,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

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
    setNameOfPage('Редактировать группу');
    if (id) {
      getOne__GROUP_SERVICE_JOB(id);
    }
    return () => {
      clearFormData();
    };
  }, [setNameOfPage, getOne__GROUP_SERVICE_JOB, id]);

  useLayoutEffect(() => {
    if (state__GROUP_SERVICE_JOB.one__GROUP_SERVICE_JOB) {
      // console.log(state__GROUP_SERVICE_JOB.one__GROUP_SERVICE_JOB);

      setFormData({
        name__Group_ServiceJob: state__GROUP_SERVICE_JOB.one__GROUP_SERVICE_JOB
          .name__Group_ServiceJob
          ? state__GROUP_SERVICE_JOB.one__GROUP_SERVICE_JOB
              .name__Group_ServiceJob
          : '',
      });
    }
  }, [state__GROUP_SERVICE_JOB.one__GROUP_SERVICE_JOB]);

  const onSubmit = () => {
    update__GROUP_SERVICE_JOB(id, name__Group_ServiceJob);

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
          Редактировать работу
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
          Редактировать
        </Button>
      </Grid>
    </Grid>
  );
};

GroupServiceJobEdit.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getOne__GROUP_SERVICE_JOB: PropTypes.func.isRequired,
  update__GROUP_SERVICE_JOB: PropTypes.func.isRequired,

  // state_auth: PropTypes.object.isRequired,
  state__GROUP_SERVICE_JOB: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // state_auth: state.auth,
  state__GROUP_SERVICE_JOB: state.groupServiceJob,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getOne__GROUP_SERVICE_JOB,
  update__GROUP_SERVICE_JOB,
})(GroupServiceJobEdit);
