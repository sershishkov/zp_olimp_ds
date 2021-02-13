import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DatePicker } from '@material-ui/pickers';
import IMask from 'imask';

import { setNameOfPage } from '../../../store/actions/nameOfPage';
import { add__WORKER } from '../../../store/actions/referenceData/worker';

import Fab from '@material-ui/core/Fab';

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
  dialogItem: {
    width: '100%',
  },
}));

const WorkerAdd = ({ setNameOfPage, add__WORKER }) => {
  const classes = useStyles();
  const history = useHistory();

  const [formData, setFormData] = useState({
    name__Worker: '',
    middleName: '',
    surname: '',
    postCode: '',
    address: '',
    individualTaxNumber: '',
    phoneNumber: '',
  });
  const [dateOf_Birth, set_dateOf_Birth] = useState(new Date());

  const {
    name__Worker,
    middleName,
    surname,
    postCode,
    address,
    individualTaxNumber,
    phoneNumber,
  } = formData;

  const [name_Worker_Helper, setName_Worker_Helper] = useState('');
  const [middleName_Helper, set_middleName_Helper] = useState('');
  const [surname_Helper, set_surname_Helper] = useState('');

  const [postCode_Helper, set_postCode_Helper] = useState('');
  const [address_Helper, set_address_Helper] = useState('');
  const [individualTaxNumber_Helper, set_individualTaxNumber_Helper] = useState(
    ''
  );
  const [phoneNumber_Helper, set_phoneNumber_Helper] = useState('');

  const clearFormData = () => {
    setFormData({
      name__Worker: '',
      middleName: '',
      surname: '',
      postCode: '',
      address: '',
      individualTaxNumber: '',
      phoneNumber: '',
    });
    set_dateOf_Birth(new Date());
  };

  useEffect(() => {
    setNameOfPage('Добавить работника');
    return () => {
      clearFormData();
    };
  }, [setNameOfPage]);

  const onSubmit = () => {
    add__WORKER(
      name__Worker,
      middleName,
      surname,
      dateOf_Birth,
      postCode,
      address,
      individualTaxNumber,
      phoneNumber
    );

    clearFormData();
    history.goBack();
  };

  const onChangeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });

    let valid;
    switch (event.target.id) {
      case 'name__Worker':
        valid = event.target.value.length >= 3;
        if (!valid) {
          setName_Worker_Helper('Минимальная длина 3 знака');
        } else {
          setName_Worker_Helper('');
        }
        break;

      case 'middleName':
        valid = event.target.value.length >= 3;
        if (!valid) {
          set_middleName_Helper('Минимальная длина 3 знака');
        } else {
          set_middleName_Helper('');
        }
        break;

      case 'surname':
        valid = event.target.value.length >= 3;
        if (!valid) {
          set_surname_Helper('Минимальная длина 3 знака');
        } else {
          set_surname_Helper('');
        }
        break;

      case 'postCode':
        valid = event.target.value.length === 5;
        if (!valid) {
          set_postCode_Helper('Почтовый индекс состоит из 5 цифр');
        } else {
          set_postCode_Helper('');
        }
        break;

      case 'address':
        valid = event.target.value.length >= 5;
        if (!valid) {
          set_address_Helper('Минимальная длина 5 знака');
        } else {
          set_address_Helper('');
        }
        break;

      case 'individualTaxNumber':
        valid = /\d{10}/.test(event.target.value);
        if (!valid) {
          set_individualTaxNumber_Helper('Длинна Инн  10 цифр');
        } else {
          set_individualTaxNumber_Helper('');
        }
        break;

      case 'phoneNumber':
        valid = event.target.value.length === 17;
        if (!valid) {
          set_phoneNumber_Helper('не достаточно цифр');
        } else {
          set_phoneNumber_Helper('');
        }
        break;

      default:
        break;
    }
  };
  const onInputHandler = (event) => {
    const inputMask_phoneNumber = {
      mask: '+{38}(000)000-00-00',
    };
    const inputMask_individualTaxNumber = {
      mask: /^(\d{0,10})$/,
    };

    const inputMask_postCode = {
      mask: /^(\d{0,5})$/,
    };

    switch (event.target.name) {
      case 'phoneNumber':
        IMask(event.target, inputMask_phoneNumber);

        break;
      case 'individualTaxNumber':
        IMask(event.target, inputMask_individualTaxNumber);

        break;
      case 'postCode':
        IMask(event.target, inputMask_postCode);

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
          Добавить работника
        </Typography>
      </Grid>

      <Grid
        container
        direction='column'
        justify='flex-start'
        alignItems='center'
      >
        <Grid item className={classes.dialogItem}>
          <TextField
            autoFocus
            id='name__Worker'
            name='name__Worker'
            label='Имя'
            type='text'
            value={name__Worker ? name__Worker : ''}
            error={name_Worker_Helper.length !== 0}
            helperText={name_Worker_Helper}
            fullWidth
            autoComplete='text'
            onChange={(e) => onChangeHandler(e)}
          />
        </Grid>
        <Grid item className={classes.dialogItem}>
          <TextField
            id='middleName'
            name='middleName'
            label='Отчество'
            type='text'
            value={middleName ? middleName : ''}
            error={middleName_Helper.length !== 0}
            helperText={middleName_Helper}
            fullWidth
            autoComplete='text'
            onChange={(e) => onChangeHandler(e)}
          />
        </Grid>
        <Grid item className={classes.dialogItem}>
          <TextField
            id='surname'
            name='surname'
            label='Фамилия'
            type='text'
            value={surname ? surname : ''}
            error={surname_Helper.length !== 0}
            helperText={surname_Helper}
            fullWidth
            autoComplete='text'
            onChange={(e) => onChangeHandler(e)}
          />
        </Grid>
        <Grid item className={classes.dialogItem}>
          <DatePicker
            id='dateOf_Birth'
            name='dateOf_Birth'
            label='Дата рождения'
            format='dd-MM-yyyy'
            value={dateOf_Birth ? dateOf_Birth : ''}
            fullWidth
            autoOk
            animateYearScrolling
            disableFuture
            openTo='year'
            onChange={(newDate) => {
              set_dateOf_Birth(newDate);
            }}
          />
        </Grid>
        <Grid item className={classes.dialogItem}>
          <TextField
            id='postCode'
            name='postCode'
            label='Почтовый индекс'
            type='number'
            value={postCode ? postCode : ''}
            error={postCode_Helper.length !== 0}
            helperText={postCode_Helper}
            fullWidth
            autoComplete='text'
            onChange={(e) => onChangeHandler(e)}
            onInput={(e) => onInputHandler(e)}
          />
        </Grid>
        <Grid item className={classes.dialogItem}>
          <TextField
            id='address'
            name='address'
            label='Адрес'
            type='text'
            value={address ? address : ''}
            error={address_Helper.length !== 0}
            helperText={address_Helper}
            fullWidth
            autoComplete='text'
            onChange={(e) => onChangeHandler(e)}
          />
        </Grid>
        <Grid item className={classes.dialogItem}>
          <TextField
            id='individualTaxNumber'
            name='individualTaxNumber'
            label='ИНН'
            type='number'
            value={individualTaxNumber ? individualTaxNumber : ''}
            error={individualTaxNumber_Helper.length !== 0}
            helperText={individualTaxNumber_Helper}
            fullWidth
            // autoComplete='text'
            onChange={(e) => onChangeHandler(e)}
            onInput={(e) => onInputHandler(e)}
          />
        </Grid>
        <Grid item className={classes.dialogItem}>
          <TextField
            id='phoneNumber'
            name='phoneNumber'
            label='Телефон'
            type='tel'
            value={phoneNumber ? phoneNumber : ''}
            error={phoneNumber_Helper.length !== 0}
            helperText={phoneNumber_Helper}
            fullWidth
            autoComplete='text'
            onChange={(e) => onChangeHandler(e)}
            onInput={(e) => onInputHandler(e)}
          />
        </Grid>
        <Grid item className={classes.dialogItem}>
          <Button
            disabled={
              !name__Worker ||
              !surname ||
              surname_Helper.length !== 0 ||
              name_Worker_Helper.length !== 0
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
    </Grid>
  );
};

WorkerAdd.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  add__WORKER: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  // state_auth: state.auth,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  add__WORKER,
})(WorkerAdd);
