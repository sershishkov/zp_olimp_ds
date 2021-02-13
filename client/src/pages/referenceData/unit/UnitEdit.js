import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Fab from '@material-ui/core/Fab';

import { setNameOfPage } from '../../../store/actions/nameOfPage';
import {
  getOne__UNIT,
  update__UNIT,
} from '../../../store/actions/referenceData/unit';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Tooltip from '@material-ui/core/Tooltip';

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
}));

const UnitEdit = ({
  setNameOfPage,
  getOne__UNIT,
  update__UNIT,

  state__UNIT,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const [name__Unit, setName__Unit] = useState('');
  const [name__UnitHelper, setName__UnitHelper] = useState('');

  useEffect(() => {
    setNameOfPage('Редактировать еденицу');
    if (id) {
      getOne__UNIT(id);
    }
    return () => {
      setName__Unit('');
    };
  }, [setNameOfPage, getOne__UNIT, id]);

  useLayoutEffect(() => {
    if (state__UNIT.one__UNIT) {
      setName__Unit(state__UNIT.one__UNIT.name__Unit);
    }
  }, [state__UNIT.one__UNIT]);

  const onSubmit = () => {
    update__UNIT(id, name__Unit);

    setName__Unit('');
    history.goBack();
  };

  const onChangehandler = (event) => {
    setName__Unit(event.target.value);

    let valid;
    switch (event.target.id) {
      case 'name__Unit':
        valid = event.target.value.length >= 3;
        if (!valid) {
          setName__UnitHelper('Минимальная длина 3 знака');
        } else {
          setName__UnitHelper('');
        }
        break;

      default:
        break;
    }
  };

  return (
    <Grid container className={classes.root} direction='column' maxWidth='md'>
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
          Редактировать еденицу
        </Typography>
      </Grid>
      <Grid item className={classes.item}>
        <TextField
          autoFocus
          // margin="dense"
          id='name__Unit'
          name='name__Unit'
          value={name__Unit ? name__Unit : ''}
          label='Единица измерения'
          onChange={(e) => onChangehandler(e)}
          error={name__UnitHelper.length !== 0}
          helperText={name__UnitHelper}
          type='text'
          fullWidth
          autoComplete='text'
          // variant='outlined'
        />
      </Grid>
      <Grid item className={classes.item}>
        <Button
          disabled={
            (name__Unit && name__Unit.length === 0) ||
            name__UnitHelper.length !== 0
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

UnitEdit.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getOne__UNIT: PropTypes.func.isRequired,
  update__UNIT: PropTypes.func.isRequired,

  // state_auth: PropTypes.object.isRequired,
  state__UNIT: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // state_auth: state.auth,
  state__UNIT: state.unit,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getOne__UNIT,
  update__UNIT,
})(UnitEdit);
