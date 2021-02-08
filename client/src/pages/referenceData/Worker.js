import React, { useEffect, useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { format } from 'date-fns';

import { DatePicker } from '@material-ui/pickers';

import IMask from 'imask';

import {
  add__WORKER,
  getAll__WORKER,
  getOne__WORKER,
  update__WORKER,
  delete__WORKER,
} from '../../store/actions/referenceData/worker';

import MaterialTable from '../../components/MaterialTable';
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

const Worker = ({
  add__WORKER,
  getAll__WORKER,
  getOne__WORKER,
  update__WORKER,
  delete__WORKER,

  state__WORKER,
}) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);

  const [formData, setFormData] = useState({
    name__Worker: '',
    middleName: '',
    surname: '',
    // dateOf_Birth:new Date(),
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
    // dateOf_Birth,
    postCode,
    address,
    individualTaxNumber,
    phoneNumber,
  } = formData;
  // console.log(phoneNumber);
  // console.log(phoneNumber.length);

  const [editId, setEditId] = useState('');
  const [buttonText, setButtonText] = useState('');

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
    getAll__WORKER();
    clearFormData();
  }, [getAll__WORKER]);

  useLayoutEffect(() => {
    if (state__WORKER.one__WORKER) {
      setFormData({
        name__Worker: state__WORKER.one__WORKER.name__Worker,
        middleName: state__WORKER.one__WORKER.middleName,
        surname: state__WORKER.one__WORKER.surname,
        postCode: state__WORKER.one__WORKER.postCode,
        address: state__WORKER.one__WORKER.address,
        individualTaxNumber: state__WORKER.one__WORKER.individualTaxNumber,
        phoneNumber: state__WORKER.one__WORKER.phoneNumber,
      });
      set_dateOf_Birth(state__WORKER.one__WORKER.dateOf_Birth);
    }
  }, [state__WORKER.one__WORKER]);

  const onDeleteItem = (id) => {
    delete__WORKER(id);
    setEditId('');
  };
  const onSubmit = () => {
    if (buttonText === 'Редактировать' && editId) {
      update__WORKER(
        editId,
        name__Worker,
        middleName,
        surname,
        dateOf_Birth,
        postCode,
        address,
        individualTaxNumber,
        phoneNumber
      );
    } else if (buttonText === 'Добавить' && name__Worker) {
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
    getOne__WORKER(id);
    setEditId(id);
    setButtonText('Редактировать');
    setOpenDialog(true);
  };

  const onChangehandler = (event) => {
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

  const rows =
    state__WORKER.array__WORKER && state__WORKER.array__WORKER.length > 0
      ? state__WORKER.array__WORKER.map((item) => {
          return {
            name__Worker: item.name__Worker,

            surname: item.surname,

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
      title='список работников'
      columns={[
        { title: 'Имя', field: 'name__Worker' },
        { title: 'Фамилия', field: 'surname' },

        {
          title: 'Редактировать',
          field: 'edit',
          sorting: false,
          filtering: false,
          cellStyle: {
            width: 40,
            textAlign: 'center',
          },

          headerStyle: {
            width: 40,
            textAlign: 'center',
          },
          columnStyle: {
            width: 40,
            textAlign: 'center',
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
          },

          headerStyle: {
            width: 40,
            textAlign: 'center',
          },
          columnStyle: {
            width: 40,
            textAlign: 'center',
          },
        },
      ]}
      data={rows}
    />
  );

  return (
    <Grid container className={classes.root} direction='column'>
      <Tooltip title='Добавить единицу'>
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
          Cписок работников
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
        <DialogTitle id='form-dialog-title'>Работник</DialogTitle>
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
                id='name__Worker'
                name='name__Worker'
                value={name__Worker ? name__Worker : ''}
                label='Имя'
                onChange={(e) => onChangehandler(e)}
                error={name_Worker_Helper.length !== 0}
                helperText={name_Worker_Helper}
                type='text'
                fullWidth
                autoComplete='text'
                // variant='outlined'
              />
            </Grid>
            <Grid item className={classes.dialogItem}>
              <TextField
                // autoFocus

                id='middleName'
                name='middleName'
                value={middleName ? middleName : ''}
                label='Отчество'
                onChange={(e) => onChangehandler(e)}
                error={middleName_Helper.length !== 0}
                helperText={middleName_Helper}
                type='text'
                fullWidth
                autoComplete='text'
                // variant='outlined'
              />
            </Grid>
            <Grid item className={classes.dialogItem}>
              <TextField
                // autoFocus

                id='surname'
                name='surname'
                value={surname ? surname : ''}
                label='Фамилия'
                onChange={(e) => onChangehandler(e)}
                error={surname_Helper.length !== 0}
                helperText={surname_Helper}
                type='text'
                fullWidth
                autoComplete='text'
                // variant='outlined'
              />
            </Grid>
            <Grid item className={classes.dialogItem}>
              <DatePicker
                autoOk
                format='dd-MM-yyyy'
                id='dateOf_Birth'
                name='dateOf_Birth'
                label='Дата рождения'
                value={dateOf_Birth ? dateOf_Birth : ''}
                onChange={(newDate) => {
                  set_dateOf_Birth(newDate);
                }}
                fullWidth
                animateYearScrolling
                disableFuture
                openTo='year'
              />
            </Grid>
            <Grid item className={classes.dialogItem}>
              <TextField
                // autoFocus

                id='postCode'
                name='postCode'
                value={postCode ? postCode : ''}
                label='Почтовый индекс'
                onChange={(e) => onChangehandler(e)}
                error={postCode_Helper.length !== 0}
                helperText={postCode_Helper}
                type='number'
                fullWidth
                autoComplete='text'
                maxLength={5}
                // variant='outlined'
                onInput={(e) => onInputHandler(e)}
              />
            </Grid>
            <Grid item className={classes.dialogItem}>
              <TextField
                // autoFocus

                id='address'
                name='address'
                value={address ? address : ''}
                label='Адрес'
                onChange={(e) => onChangehandler(e)}
                error={address_Helper.length !== 0}
                helperText={address_Helper}
                type='text'
                fullWidth
                autoComplete='text'
                // variant='outlined'
              />
            </Grid>
            <Grid item className={classes.dialogItem}>
              <TextField
                // autoFocus
                id='individualTaxNumber'
                name='individualTaxNumber'
                value={individualTaxNumber ? individualTaxNumber : ''}
                label='ИНН'
                onChange={(e) => onChangehandler(e)}
                error={individualTaxNumber_Helper.length !== 0}
                helperText={individualTaxNumber_Helper}
                type='number'
                fullWidth
                // autoComplete='text'
                onInput={(e) => onInputHandler(e)}
              />
            </Grid>
            <Grid item className={classes.dialogItem}>
              <TextField
                // autoFocus
                id='phoneNumber'
                name='phoneNumber'
                value={phoneNumber ? phoneNumber : ''}
                label='Телефон'
                onChange={(e) => onChangehandler(e)}
                error={phoneNumber_Helper.length !== 0}
                helperText={phoneNumber_Helper}
                type='tel'
                fullWidth
                autoComplete='text'
                onInput={(e) => onInputHandler(e)}
              />
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
              !name__Worker ||
              !surname ||
              surname_Helper.length !== 0 ||
              name_Worker_Helper.length !== 0
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

Worker.propTypes = {
  add__WORKER: PropTypes.func.isRequired,
  getAll__WORKER: PropTypes.func.isRequired,
  getOne__WORKER: PropTypes.func.isRequired,
  update__WORKER: PropTypes.func.isRequired,
  delete__WORKER: PropTypes.func.isRequired,

  // state_auth: PropTypes.object.isRequired,
  state__WORKER: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // state_auth: state.auth,
  state__WORKER: state.worker,
});

export default connect(mapStateToProps, {
  add__WORKER,
  getAll__WORKER,
  getOne__WORKER,
  update__WORKER,
  delete__WORKER,
})(Worker);
