import React, { useEffect, useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IMask from 'imask';

import {
  add__FIRM,
  getAll__FIRM,
  getOne__FIRM,
  update__FIRM,
  delete__FIRM,
} from '../../store/actions/referenceData/firm';
import { getAll__TYPE_FIRM } from '../../store/actions/referenceData/typeFirm';

import { whoIsThisFirm } from '../../utils/allOurPagesList';

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

import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
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

const Firm = ({
  add__FIRM,
  getAll__FIRM,
  getOne__FIRM,
  update__FIRM,
  delete__FIRM,

  getAll__TYPE_FIRM,

  state__FIRM,
  state__TYPE_FIRM,
}) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);

  const [formData, setFormData] = useState({
    name__Firm: '',
    short_name__Firm: '',
    type_Firm: '',
    postCode: '',
    address: '',
    EDRPOU: '',
    ibanOwn: '',
    ibanGazBank: '',
    firstPerson__Position: '',
    firstPerson__Position_RoditelPadej: '',
    firstPerson__Full_Name: '',
    firstPerson__Full_Name_RoditelPadej: '',
    firstPerson__Short_Name: '',
    whichActsOnTheBasis: '',
    issuedBy: '',
    taxPayerOn: '',
    certificate_PDV: '',
    email: '',
    phoneNumber: '',
    who_is: [],
  });

  const {
    name__Firm,
    short_name__Firm,
    type_Firm,
    postCode,
    address,
    EDRPOU,
    ibanOwn,
    ibanGazBank,
    firstPerson__Position,
    firstPerson__Position_RoditelPadej,
    firstPerson__Full_Name,
    firstPerson__Full_Name_RoditelPadej,
    firstPerson__Short_Name,
    whichActsOnTheBasis,
    issuedBy,
    taxPayerOn,
    certificate_PDV,
    email,
    phoneNumber,
    who_is,
  } = formData;

  const [editId, setEditId] = useState('');
  const [buttonText, setButtonText] = useState('');

  const [name__FIRM_Helper, set_name__FIRM_Helper] = useState('');
  const [short_name__Firm_Helper, set_short_name__Firm_Helper] = useState('');
  // const [type_Firm_Helper, set_type_Firm_Helper] = useState('');
  const [postCode_Helper, set_postCode_Helper] = useState('');
  const [address_Helper, set_address_Helper] = useState('');
  const [EDRPOU_Helper, set_EDRPOU_Helper] = useState('');
  const [ibanOwn_Helper, set_ibanOwn_Helper] = useState('');
  const [ibanGazBank_Helper, set_ibanGazBank_Helper] = useState('');
  const [
    firstPerson__Position_Helper,
    set_firstPerson__Position_Helper,
  ] = useState('');
  const [
    firstPerson__Position_RoditelPadej_Helper,
    set_firstPerson__Position_RoditelPadej_Helper,
  ] = useState('');
  const [
    firstPerson__Full_Name_Helper,
    set_firstPerson__Full_Name_Helper,
  ] = useState('');
  const [
    firstPerson__Full_Name_RoditelPadej_Helper,
    set_firstPerson__Full_Name_RoditelPadej_Helper,
  ] = useState('');
  const [
    firstPerson__Short_Name_Helper,
    set_firstPerson__Short_Name_Helper,
  ] = useState('');
  const [whichActsOnTheBasis_Helper, set_whichActsOnTheBasis_Helper] = useState(
    ''
  );
  const [issuedBy_Helper, set_issuedBy_Helper] = useState('');
  const [taxPayerOn_Helper, set_taxPayerOn_Helper] = useState('');
  const [certificate_PDV_Helper, set_certificate_PDV_Helper] = useState('');
  const [email_Helper, set_email_Helper] = useState('');
  const [phoneNumber_Helper, set_phoneNumber_Helper] = useState('');
  const [who_is_Helper, set_who_is_Helper] = useState('');

  const clearFormData = () => {
    setFormData({
      name__Firm: '',
      short_name__Firm: '',
      type_Firm: '',
      postCode: '',
      address: '',
      EDRPOU: '',
      ibanOwn: '',
      ibanGazBank: '',
      firstPerson__Position: '',
      firstPerson__Position_RoditelPadej: '',
      firstPerson__Full_Name: '',
      firstPerson__Full_Name_RoditelPadej: '',
      firstPerson__Short_Name: '',
      whichActsOnTheBasis: '',
      issuedBy: '',
      taxPayerOn: '',
      certificate_PDV: '',
      email: '',
      phoneNumber: '',
      who_is: [],
    });
    setEditId('');
  };

  useEffect(() => {
    getAll__FIRM();
    getAll__TYPE_FIRM();

    clearFormData();

    return () => {
      clearFormData();
    };
  }, [getAll__FIRM, getAll__TYPE_FIRM]);

  useLayoutEffect(() => {
    if (state__FIRM.one__FIRM) {
      // console.log(state__FIRM.one__FIRM);

      setFormData({
        name__Firm: state__FIRM.one__FIRM.name__Firm
          ? state__FIRM.one__FIRM.name__Firm
          : '',

        short_name__Firm: state__FIRM.one__FIRM.short_name__Firm
          ? state__FIRM.one__FIRM.short_name__Firm
          : '',

        type_Firm: state__FIRM.one__FIRM.type_Firm
          ? state__FIRM.one__FIRM.type_Firm._id
          : '',

        postCode: state__FIRM.one__FIRM.postCode
          ? state__FIRM.one__FIRM.postCode
          : '',

        address: state__FIRM.one__FIRM.address
          ? state__FIRM.one__FIRM.address
          : '',

        EDRPOU: state__FIRM.one__FIRM.EDRPOU
          ? state__FIRM.one__FIRM.EDRPOU
          : '',

        ibanOwn: state__FIRM.one__FIRM.ibanOwn
          ? state__FIRM.one__FIRM.ibanOwn
          : '',

        ibanGazBank: state__FIRM.one__FIRM.ibanGazBank
          ? state__FIRM.one__FIRM.ibanGazBank
          : '',

        firstPerson__Position: state__FIRM.one__FIRM.firstPerson__Position
          ? state__FIRM.one__FIRM.firstPerson__Position
          : '',

        firstPerson__Position_RoditelPadej: state__FIRM.one__FIRM
          .firstPerson__Position_RoditelPadej
          ? state__FIRM.one__FIRM.firstPerson__Position_RoditelPadej
          : '',

        firstPerson__Full_Name: state__FIRM.one__FIRM.firstPerson__Full_Name
          ? state__FIRM.one__FIRM.firstPerson__Full_Name
          : '',

        firstPerson__Full_Name_RoditelPadej: state__FIRM.one__FIRM
          .firstPerson__Full_Name_RoditelPadej
          ? state__FIRM.one__FIRM.firstPerson__Full_Name_RoditelPadej
          : '',

        firstPerson__Short_Name: state__FIRM.one__FIRM.firstPerson__Short_Name
          ? state__FIRM.one__FIRM.firstPerson__Short_Name
          : '',

        whichActsOnTheBasis: state__FIRM.one__FIRM.whichActsOnTheBasis
          ? state__FIRM.one__FIRM.whichActsOnTheBasis
          : '',

        issuedBy: state__FIRM.one__FIRM.issuedBy
          ? state__FIRM.one__FIRM.issuedBy
          : '',

        taxPayerOn: state__FIRM.one__FIRM.taxPayerOn
          ? state__FIRM.one__FIRM.taxPayerOn
          : '',

        certificate_PDV: state__FIRM.one__FIRM.certificate_PDV
          ? state__FIRM.one__FIRM.certificate_PDV
          : '',

        email: state__FIRM.one__FIRM.email ? state__FIRM.one__FIRM.email : '',

        phoneNumber: state__FIRM.one__FIRM.phoneNumber
          ? state__FIRM.one__FIRM.phoneNumber
          : '',

        who_is: state__FIRM.one__FIRM.who_is
          ? state__FIRM.one__FIRM.who_is
          : [],
      });
    }
  }, [state__FIRM.one__FIRM]);

  const onDeleteItem = (id) => {
    delete__FIRM(id);
    setEditId('');
  };
  const onSubmit = () => {
    if (buttonText === 'Редактировать' && editId) {
      update__FIRM(
        editId,
        name__Firm,
        short_name__Firm,
        type_Firm,
        postCode,
        address,
        EDRPOU,
        ibanOwn,
        ibanGazBank,
        firstPerson__Position,
        firstPerson__Position_RoditelPadej,
        firstPerson__Full_Name,
        firstPerson__Full_Name_RoditelPadej,
        firstPerson__Short_Name,
        whichActsOnTheBasis,
        issuedBy,
        taxPayerOn,
        certificate_PDV,
        email,
        phoneNumber,
        who_is
      );
    } else if (buttonText === 'Добавить') {
      add__FIRM(
        name__Firm,
        short_name__Firm,
        type_Firm,
        postCode,
        address,
        EDRPOU,
        ibanOwn,
        ibanGazBank,
        firstPerson__Position,
        firstPerson__Position_RoditelPadej,
        firstPerson__Full_Name,
        firstPerson__Full_Name_RoditelPadej,
        firstPerson__Short_Name,
        whichActsOnTheBasis,
        issuedBy,
        taxPayerOn,
        certificate_PDV,
        email,
        phoneNumber,
        who_is
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
    getOne__FIRM(id);
    setEditId(id);
    setButtonText('Редактировать');

    setOpenDialog(true);
  };

  const onChangeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });

    let valid;
    switch (event.target.id) {
      case 'name__Firm':
        valid = event.target.value.length >= 3;
        if (!valid) {
          set_name__FIRM_Helper('Минимальная длина 3 знака');
        } else {
          set_name__FIRM_Helper('');
        }
        break;

      case 'short_name__Firm':
        valid = event.target.value.length >= 1;
        if (!valid) {
          set_short_name__Firm_Helper('Минимальная длина 3 знака');
        } else {
          set_short_name__Firm_Helper('');
        }
        break;

      // case 'type_Firm':
      //   valid = event.target.value.length >= 3;
      //   if (!valid) {
      //     set_name__FIRM_Helper('Минимальная длина 3 знака');
      //   } else {
      //     set_name__FIRM_Helper('');
      //   }
      //   break;

      case 'postCode':
        valid = event.target.value.length === 5;
        if (!valid) {
          set_postCode_Helper('Почтовый индекс состоит из 5 цифр');
        } else {
          set_postCode_Helper('');
        }
        break;

      case 'address':
        valid = event.target.value.length >= 3;
        if (!valid) {
          set_address_Helper('Минимальная длина 3 знака');
        } else {
          set_address_Helper('');
        }
        break;

      case 'EDRPOU':
        valid = /^\d{8,10}$/.test(event.target.value);
        if (!valid) {
          set_EDRPOU_Helper('количество знаков 8 или 10');
        } else {
          set_EDRPOU_Helper('');
        }
        break;

      case 'ibanOwn':
        valid = event.target.value.length >= 27;
        if (!valid) {
          set_ibanOwn_Helper('Минимальная длина 27 знаков');
        } else {
          set_ibanOwn_Helper('');
        }
        break;

      case 'ibanGazBank':
        valid = event.target.value.length >= 27;
        if (!valid) {
          set_ibanGazBank_Helper('Минимальная длина 27 знаков');
        } else {
          set_ibanGazBank_Helper('');
        }
        break;

      case 'firstPerson__Position':
        valid = event.target.value.length >= 3;
        if (!valid) {
          set_firstPerson__Position_Helper('Минимальная длина 3 знака');
        } else {
          set_firstPerson__Position_Helper('');
        }
        break;

      case 'firstPerson__Position_RoditelPadej':
        valid = event.target.value.length >= 3;
        if (!valid) {
          set_firstPerson__Position_RoditelPadej_Helper(
            'Минимальная длина 3 знака'
          );
        } else {
          set_firstPerson__Position_RoditelPadej_Helper('');
        }
        break;

      case 'firstPerson__Full_Name':
        valid = event.target.value.length >= 3;
        if (!valid) {
          set_firstPerson__Full_Name_Helper('Минимальная длина 3 знака');
        } else {
          set_firstPerson__Full_Name_Helper('');
        }
        break;

      case 'firstPerson__Full_Name_RoditelPadej':
        valid = event.target.value.length >= 3;
        if (!valid) {
          set_firstPerson__Full_Name_RoditelPadej_Helper(
            'Минимальная длина 3 знака'
          );
        } else {
          set_firstPerson__Full_Name_RoditelPadej_Helper('');
        }
        break;

      case 'firstPerson__Short_Name':
        valid = event.target.value.length >= 3;
        if (!valid) {
          set_firstPerson__Short_Name_Helper('Минимальная длина 3 знака');
        } else {
          set_firstPerson__Short_Name_Helper('');
        }
        break;

      case 'whichActsOnTheBasis':
        valid = event.target.value.length >= 3;
        if (!valid) {
          set_whichActsOnTheBasis_Helper('Минимальная длина 3 знака');
        } else {
          set_whichActsOnTheBasis_Helper('');
        }
        break;

      case 'issuedBy':
        valid = event.target.value.length >= 3;
        if (!valid) {
          set_issuedBy_Helper('Минимальная длина 3 знака');
        } else {
          set_issuedBy_Helper('');
        }
        break;

      case 'taxPayerOn':
        valid = event.target.value.length >= 3;
        if (!valid) {
          set_taxPayerOn_Helper('Минимальная длина 3 знака');
        } else {
          set_taxPayerOn_Helper('');
        }
        break;

      case 'certificate_PDV':
        valid = event.target.value.length >= 3;
        if (!valid) {
          set_certificate_PDV_Helper('Минимальная длина 3 знака');
        } else {
          set_certificate_PDV_Helper('');
        }
        break;

      case 'email':
        valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
          event.target.value
        );
        if (!valid) {
          set_email_Helper('не верный email');
        } else {
          set_email_Helper('');
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

      case 'who_is':
        valid = event.target.value.length > 0;
        if (!valid) {
          set_who_is_Helper('Ничего не выбрано');
        } else {
          set_who_is_Helper('');
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
    const inputMask_EDRPOU = {
      mask: /^(\d{0,10})$/,
    };

    const inputMask_postCode = {
      mask: /^(\d{0,5})$/,
    };

    switch (event.target.name) {
      case 'phoneNumber':
        IMask(event.target, inputMask_phoneNumber);

        break;
      case 'EDRPOU':
        IMask(event.target, inputMask_EDRPOU);

        break;
      case 'postCode':
        IMask(event.target, inputMask_postCode);

        break;

      default:
        break;
    }
  };

  const rows =
    state__FIRM.array__FIRM && state__FIRM.array__FIRM.length > 0
      ? state__FIRM.array__FIRM.map((item) => {
          return {
            name__Firm: item.name__Firm,
            address: item.address,
            who_is: item.who_is.join(', '),

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
      title='Список Фирм'
      columns={[
        { title: 'Работа', field: 'name__Firm' },
        { title: 'Адрес', field: 'address' },
        { title: 'Кто есть', field: 'who_is' },

        {
          title: 'Редактировать',
          field: 'edit',
          sorting: false,
          filtering: false,
          // cellStyle: {
          //   width: 40,
          //   textAlign: 'center',
          // },

          // headerStyle: {
          //   width: 40,
          //   textAlign: 'center',
          // },
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
          // cellStyle: {
          //   width: 40,
          //   textAlign: 'center',
          // },

          // headerStyle: {
          //   width: 40,
          //   textAlign: 'center',
          // },
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
      <Tooltip title='Добавить фирму'>
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
          Cписок фирм
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
        <DialogTitle id='form-dialog-title'>Фирма</DialogTitle>
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
                id='name__Firm'
                name='name__Firm'
                label='Фирма полн'
                type='text'
                value={name__Firm ? name__Firm : ''}
                error={name__FIRM_Helper.length !== 0}
                helperText={name__FIRM_Helper}
                fullWidth
                autoComplete='text'
                onChange={(e) => onChangeHandler(e)}
              />
            </Grid>

            <Grid item className={classes.dialogItem}>
              <TextField
                autoFocus
                id='short_name__Firm'
                name='short_name__Firm'
                label='Фирма сокр'
                type='text'
                value={short_name__Firm ? short_name__Firm : ''}
                error={short_name__Firm_Helper.length !== 0}
                helperText={short_name__Firm_Helper}
                fullWidth
                autoComplete='text'
                onChange={(e) => onChangeHandler(e)}
              />
            </Grid>

            <Grid item className={classes.dialogItem}>
              <InputLabel id='type_Firm-label'>Форма Собств.</InputLabel>
              <Select
                labelId='type_Firm-label'
                id='type_Firm'
                name='type_Firm'
                // multiple
                required
                fullWidth
                value={type_Firm ? type_Firm : ''}
                onChange={(e) => onChangeHandler(e)}
                // input={<Input />}
                // renderValue={(selected) => selected.join(', ')}
                className={classes.select}
              >
                {state__TYPE_FIRM.array__TYPE_FIRM &&
                  state__TYPE_FIRM.array__TYPE_FIRM.length > 0 &&
                  state__TYPE_FIRM.array__TYPE_FIRM.map((item) => (
                    <MenuItem
                      key={item._id}
                      value={item._id}
                      className={classes.selectItem}
                    >
                      {/* <Checkbox checked={unit && unit.indexOf(item._id) > -1} /> */}
                      {item.name__Type_Firm}
                    </MenuItem>
                  ))}
              </Select>
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
                id='EDRPOU'
                name='EDRPOU'
                label='ЄДРПОУ'
                type='number'
                value={EDRPOU ? EDRPOU : ''}
                error={EDRPOU_Helper.length !== 0}
                helperText={EDRPOU_Helper}
                fullWidth
                // autoComplete='text'
                onChange={(e) => onChangeHandler(e)}
                onInput={(e) => onInputHandler(e)}
              />
            </Grid>

            <Grid item className={classes.dialogItem}>
              <TextField
                id='ibanOwn'
                name='ibanOwn'
                label='Расчетн. счет собств.'
                type='text'
                value={ibanOwn ? ibanOwn : ''}
                error={ibanOwn_Helper.length !== 0}
                helperText={ibanOwn_Helper}
                fullWidth
                autoComplete='text'
                onChange={(e) => onChangeHandler(e)}
              />
            </Grid>

            <Grid item className={classes.dialogItem}>
              <TextField
                id='ibanGazBank'
                name='ibanGazBank'
                label='Расчетн. счет бюдж.'
                type='text'
                value={ibanGazBank ? ibanGazBank : ''}
                error={ibanGazBank_Helper.length !== 0}
                helperText={ibanGazBank_Helper}
                fullWidth
                autoComplete='text'
                onChange={(e) => onChangeHandler(e)}
              />
            </Grid>

            <Grid item className={classes.dialogItem}>
              <TextField
                id='firstPerson__Position'
                name='firstPerson__Position'
                label='Должность'
                type='text'
                value={firstPerson__Position ? firstPerson__Position : ''}
                error={firstPerson__Position_Helper.length !== 0}
                helperText={firstPerson__Position_Helper}
                fullWidth
                autoComplete='text'
                onChange={(e) => onChangeHandler(e)}
              />
            </Grid>

            <Grid item className={classes.dialogItem}>
              <TextField
                id='firstPerson__Position_RoditelPadej'
                name='firstPerson__Position_RoditelPadej'
                label='Должность в родительном'
                type='text'
                value={
                  firstPerson__Position_RoditelPadej
                    ? firstPerson__Position_RoditelPadej
                    : ''
                }
                error={firstPerson__Position_RoditelPadej_Helper.length !== 0}
                helperText={firstPerson__Position_RoditelPadej_Helper}
                fullWidth
                autoComplete='text'
                onChange={(e) => onChangeHandler(e)}
              />
            </Grid>

            <Grid item className={classes.dialogItem}>
              <TextField
                id='firstPerson__Full_Name'
                name='firstPerson__Full_Name'
                label='Полное имя'
                type='text'
                value={firstPerson__Full_Name ? firstPerson__Full_Name : ''}
                error={firstPerson__Full_Name_Helper.length !== 0}
                helperText={firstPerson__Full_Name_Helper}
                fullWidth
                autoComplete='text'
                onChange={(e) => onChangeHandler(e)}
              />
            </Grid>

            <Grid item className={classes.dialogItem}>
              <TextField
                id='firstPerson__Full_Name_RoditelPadej'
                name='firstPerson__Full_Name_RoditelPadej'
                label='Полное имя в родительном'
                type='text'
                value={
                  firstPerson__Full_Name_RoditelPadej
                    ? firstPerson__Full_Name_RoditelPadej
                    : ''
                }
                error={firstPerson__Full_Name_RoditelPadej_Helper.length !== 0}
                helperText={firstPerson__Full_Name_RoditelPadej_Helper}
                fullWidth
                autoComplete='text'
                onChange={(e) => onChangeHandler(e)}
              />
            </Grid>

            <Grid item className={classes.dialogItem}>
              <TextField
                id='firstPerson__Short_Name'
                name='firstPerson__Short_Name'
                label='Сокращенное имя'
                type='text'
                value={firstPerson__Short_Name ? firstPerson__Short_Name : ''}
                error={firstPerson__Short_Name_Helper.length !== 0}
                helperText={firstPerson__Short_Name_Helper}
                fullWidth
                autoComplete='text'
                onChange={(e) => onChangeHandler(e)}
              />
            </Grid>

            <Grid item className={classes.dialogItem}>
              <TextField
                id='whichActsOnTheBasis'
                name='whichActsOnTheBasis'
                label='Действует на основании'
                type='text'
                value={whichActsOnTheBasis ? whichActsOnTheBasis : ''}
                error={whichActsOnTheBasis_Helper.length !== 0}
                helperText={whichActsOnTheBasis_Helper}
                fullWidth
                autoComplete='text'
                onChange={(e) => onChangeHandler(e)}
              />
            </Grid>
            <Grid item className={classes.dialogItem}>
              <TextField
                id='issuedBy'
                name='issuedBy'
                label='Кем выдан и когда (только ФОП)'
                type='text'
                value={issuedBy ? issuedBy : ''}
                error={issuedBy_Helper.length !== 0}
                helperText={issuedBy_Helper}
                fullWidth
                autoComplete='text'
                onChange={(e) => onChangeHandler(e)}
              />
            </Grid>

            <Grid item className={classes.dialogItem}>
              <TextField
                id='taxPayerOn'
                name='taxPayerOn'
                label='Налогооблажение'
                type='text'
                value={taxPayerOn ? taxPayerOn : ''}
                error={taxPayerOn_Helper.length !== 0}
                helperText={taxPayerOn_Helper}
                fullWidth
                autoComplete='text'
                onChange={(e) => onChangeHandler(e)}
              />
            </Grid>

            <Grid item className={classes.dialogItem}>
              <TextField
                id='certificate_PDV'
                name='certificate_PDV'
                label='Св-во ПДВ '
                type='text'
                value={certificate_PDV ? certificate_PDV : ''}
                error={certificate_PDV_Helper.length !== 0}
                helperText={certificate_PDV_Helper}
                fullWidth
                autoComplete='text'
                onChange={(e) => onChangeHandler(e)}
              />
            </Grid>

            <Grid item className={classes.dialogItem}>
              <TextField
                id='email'
                name='email'
                label='Почта '
                type='email'
                value={email ? email : ''}
                error={email_Helper.length !== 0}
                helperText={email_Helper}
                fullWidth
                autoComplete='email'
                onChange={(e) => onChangeHandler(e)}
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
              <InputLabel id='who_is-label'>Роли</InputLabel>
              <Select
                labelId='who_is-label'
                id='who_is'
                name='who_is'
                multiple
                required
                fullWidth
                value={who_is ? who_is : []}
                onChange={(e) => onChangeHandler(e)}
                input={<Input />}
                renderValue={(selected) => selected.join(', ')}
                className={classes.select}
              >
                {whoIsThisFirm.map((role) => (
                  <MenuItem
                    key={role}
                    value={role}
                    className={classes.selectItem}
                  >
                    <Checkbox checked={who_is && who_is.indexOf(role) > -1} />
                    {role}
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
              !name__Firm ||
              !short_name__Firm ||
              !type_Firm ||
              !postCode ||
              !address ||
              !EDRPOU ||
              !ibanOwn ||
              !firstPerson__Position ||
              // !firstPerson__Position_RoditelPadej ||
              !firstPerson__Full_Name ||
              // !firstPerson__Full_Name_RoditelPadej ||
              !firstPerson__Short_Name ||
              !phoneNumber ||
              (who_is && who_is.length === 0) ||
              name__FIRM_Helper.length !== 0 ||
              short_name__Firm_Helper.length !== 0 ||
              postCode_Helper.length !== 0 ||
              address_Helper.length !== 0 ||
              EDRPOU_Helper.length !== 0 ||
              ibanOwn_Helper.length !== 0 ||
              firstPerson__Position_Helper.length !== 0 ||
              // firstPerson__Position_RoditelPadej_Helper.length !== 0 ||
              firstPerson__Full_Name_Helper.length !== 0 ||
              // firstPerson__Full_Name_RoditelPadej_Helper.length !== 0 ||
              firstPerson__Short_Name_Helper.length !== 0 ||
              whichActsOnTheBasis_Helper.length !== 0 ||
              taxPayerOn_Helper.length !== 0 ||
              email_Helper.length !== 0 ||
              phoneNumber_Helper.length !== 0 ||
              who_is_Helper.length !== 0
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

Firm.propTypes = {
  add__FIRM: PropTypes.func.isRequired,
  getAll__FIRM: PropTypes.func.isRequired,
  getOne__FIRM: PropTypes.func.isRequired,
  update__FIRM: PropTypes.func.isRequired,
  delete__FIRM: PropTypes.func.isRequired,

  getAll__TYPE_FIRM: PropTypes.func.isRequired,

  // state_auth: PropTypes.object.isRequired,
  state__FIRM: PropTypes.object.isRequired,
  state__TYPE_FIRM: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // state_auth: state.auth,
  state__FIRM: state.firm,

  state__TYPE_FIRM: state.typeFirm,
});

export default connect(mapStateToProps, {
  add__FIRM,
  getAll__FIRM,
  getOne__FIRM,
  update__FIRM,
  delete__FIRM,

  getAll__TYPE_FIRM,
})(Firm);
