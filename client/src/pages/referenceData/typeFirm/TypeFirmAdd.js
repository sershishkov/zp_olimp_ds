import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../../store/actions/nameOfPage';
import { add__TYPE_FIRM } from '../../../store/actions/referenceData/typeFirm';

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

const TypeFirmAdd = ({ setNameOfPage, add__TYPE_FIRM }) => {
  const classes = useStyles();
  const history = useHistory();

  const [formData, setFormData] = useState({
    name__Type_Firm: '',
    short_name__Type_Firm: '',
  });

  const { name__Type_Firm, short_name__Type_Firm } = formData;

  const [name__Type_Firm_Helper, set_name__Type_Firm_Helper] = useState('');
  const [
    nshort_name__Type_Firm_Helper,
    set_nshort_name__Type_Firm_Helper,
  ] = useState('');

  const clearFormData = () => {
    setFormData({
      name__Type_Firm: '',
      short_name__Type_Firm: '',
    });
  };

  useEffect(() => {
    setNameOfPage('Добавить форму собственности');
    return () => {
      clearFormData();
    };
  }, [setNameOfPage]);

  const onSubmit = () => {
    add__TYPE_FIRM(name__Type_Firm, short_name__Type_Firm);

    clearFormData();
    history.goBack();
  };

  const onChangeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });

    let valid;
    switch (event.target.id) {
      case 'name__Type_Firm':
        valid = event.target.value.length >= 3;
        if (!valid) {
          set_name__Type_Firm_Helper('Минимальная длина 3 знака');
        } else {
          set_name__Type_Firm_Helper('');
        }
        break;

      case 'short_name__Type_Firm':
        valid = event.target.value.length >= 3;
        if (!valid) {
          set_nshort_name__Type_Firm_Helper('Минимальная длина 3 знака');
        } else {
          set_nshort_name__Type_Firm_Helper('');
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
          Добавить форму собственности
        </Typography>
      </Grid>
      <Grid item className={classes.item}>
        <TextField
          autoFocus
          id='name__Type_Firm'
          name='name__Type_Firm'
          label='Полная форма собств'
          type='text'
          value={name__Type_Firm ? name__Type_Firm : ''}
          error={name__Type_Firm_Helper.length !== 0}
          helperText={name__Type_Firm_Helper}
          fullWidth
          autoComplete='text'
          onChange={(e) => onChangeHandler(e)}
        />
      </Grid>
      <Grid item className={classes.item}>
        <TextField
          id='short_name__Type_Firm'
          name='short_name__Type_Firm'
          label='Сокращ форма собств'
          type='text'
          value={short_name__Type_Firm ? short_name__Type_Firm : ''}
          error={nshort_name__Type_Firm_Helper.length !== 0}
          helperText={nshort_name__Type_Firm_Helper}
          fullWidth
          autoComplete='text'
          onChange={(e) => onChangeHandler(e)}
        />
      </Grid>
      <Grid item className={classes.item}>
        <Button
          disabled={
            !name__Type_Firm ||
            !short_name__Type_Firm ||
            name__Type_Firm_Helper.length !== 0 ||
            nshort_name__Type_Firm_Helper.length !== 0
          }
          fullWidth
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

TypeFirmAdd.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  add__TYPE_FIRM: PropTypes.func.isRequired,

  // state_auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // state_auth: state.auth,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  add__TYPE_FIRM,
})(TypeFirmAdd);
