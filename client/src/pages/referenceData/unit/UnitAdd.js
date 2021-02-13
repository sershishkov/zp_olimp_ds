import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Fab from '@material-ui/core/Fab';

import { setNameOfPage } from '../../../store/actions/nameOfPage';
import { add__UNIT } from '../../../store/actions/referenceData/unit';

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

const UnitAdd = ({ setNameOfPage, add__UNIT }) => {
  const classes = useStyles();
  const history = useHistory();

  const [name__Unit, setName__Unit] = useState('');
  const [name__UnitHelper, setName__UnitHelper] = useState('');

  useEffect(() => {
    setNameOfPage('Добавить еденицу');
    return () => {
      setName__Unit('');
    };
  }, [setNameOfPage]);

  const onSubmit = () => {
    add__UNIT(name__Unit);

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
          Добавить еденицу
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
          Добавить
        </Button>
      </Grid>
    </Grid>
  );
};

UnitAdd.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  add__UNIT: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  // state_auth: state.auth,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  add__UNIT,
})(UnitAdd);
