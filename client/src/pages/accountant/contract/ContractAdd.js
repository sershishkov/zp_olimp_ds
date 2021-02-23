import React, { useEffect, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DatePicker } from '@material-ui/pickers';

import { setNameOfPage } from '../../../store/actions/nameOfPage';
import { add__CONTRACT } from '../../../store/actions/accountant/contract/contract';
import { getAll__FIRM } from '../../../store/actions/referenceData/firm';

import { typeOfContracts } from '../../../utils/allOurPagesList';

import {
  generateDocNumber,
  handleSearchInArray,
} from '../../../utils/helperFunction';

import Fab from '@material-ui/core/Fab';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
// import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

// import { FixedSizeList as List } from 'react-window';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
  wrapSelectAndLink: {
    // border: '1px solid #ff0000',
  },
  wrapSelect: {
    // border: '1px solid #00ff00',
    width: '30px',
  },
  select: {},
  wrapLink: {
    // border: '1px solid #0000ff',
  },
  wrapSearchList: {
    position: 'absolute',
    top: 40,
    left: 0,
    zIndex: 1235,
    backgroundColor: '#EEE',
  },
  searchList: {
    maxHeight: 150,
    overflowY: 'scroll',
  },
}));

const FirmAdd = ({
  setNameOfPage,
  add__CONTRACT,

  getAll__FIRM,

  // state__CONTRACT,
  state__FIRM,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const [openSearchListOurFirm, set__openSearchListOurFirm] = useState(false);
  const [openSearchListClient, set__openSearchListClient] = useState(false);

  const [formData, setFormData] = useState({
    number__Contract: generateDocNumber(),
    type_Contract: '',
    typesOf_WorkInTheContract: '',
    sum: '',
    ourFirm: '',
    client: '',
  });
  const [date_Contract, set_date_Contract] = useState(new Date());
  const [active, setActive] = useState(true);
  const [searchOurFirm, set__searchOurFirm] = useState('');
  const [searchClient, set__searchClient] = useState('');
  const [array_of_OurFirm, set__array_of_OurFirm] = useState(
    state__FIRM.array__FIRM.filter((item) => item.who_is.includes('наша фирма'))
  );
  const [array_of_Client, set__array_of_Client] = useState(
    state__FIRM.array__FIRM.filter((item) => item.who_is.includes('клиент'))
  );

  const handleChangeSwitch = (event) => {
    setActive(event.target.checked);
  };

  const {
    number__Contract,
    type_Contract,
    typesOf_WorkInTheContract,
    sum,
    ourFirm,
    client,
  } = formData;

  const [number__Contract_Helper, set_number__Contract_Helper] = useState('');
  const [
    typesOf_WorkInTheContract_Helper,
    set_typesOf_WorkInTheContract_Helper,
  ] = useState('');
  const [sum_Helper, set_sum_Helper] = useState('');

  const clearFormData = () => {
    setFormData({
      number__Contract: generateDocNumber(),
      type_Contract: '',
      typesOf_WorkInTheContract: '',
      sum: '',
      ourFirm: '',
      client: '',
      active: true,
    });
    set_date_Contract(new Date());
  };

  useEffect(() => {
    setNameOfPage('Добавить договор');
    getAll__FIRM();

    return () => {
      clearFormData();
    };
  }, [setNameOfPage, getAll__FIRM]);

  let full_array_of_OurFirm = useMemo(
    () =>
      state__FIRM.array__FIRM.filter((item) =>
        item.who_is.includes('наша фирма')
      ),
    [state__FIRM.array__FIRM]
  );

  let full_array_of_Client = useMemo(
    () =>
      state__FIRM.array__FIRM.filter((item) => item.who_is.includes('клиент')),
    [state__FIRM.array__FIRM]
  );

  const onSubmit = () => {
    add__CONTRACT(
      number__Contract,
      date_Contract,
      type_Contract,
      typesOf_WorkInTheContract,
      sum,
      ourFirm,
      client,
      active
    );

    clearFormData();
    history.goBack();
  };

  const onInputHandler = (event) => {
    if (event.target.name === 'searchOurFirm') {
      set__openSearchListOurFirm(true);

      set__searchOurFirm(event.target.value);

      set__array_of_OurFirm(
        handleSearchInArray(full_array_of_OurFirm, event.target.value)
      );
    }

    if (event.target.name === 'searchClient') {
      set__openSearchListClient(true);

      set__searchClient(event.target.value);

      set__array_of_Client(
        handleSearchInArray(full_array_of_Client, event.target.value)
      );
    }
  };

  const onChangeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });

    let valid;
    switch (event.target.id) {
      case 'number__Contract':
        valid = event.target.value.length >= 3;
        if (!valid) {
          set_number__Contract_Helper('Минимальная длина 3 знака');
        } else {
          set_number__Contract_Helper('');
        }
        break;

      case 'typesOf_WorkInTheContract':
        valid = event.target.value.length >= 3;
        if (!valid) {
          set_typesOf_WorkInTheContract_Helper('Минимальная длина 3 знака');
        } else {
          set_typesOf_WorkInTheContract_Helper('');
        }
        break;

      case 'sum':
        valid = event.target.value.length >= 1;
        if (!valid) {
          set_sum_Helper('Ввелите хоть одну цифру');
        } else {
          set_sum_Helper('');
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
          Добавить договор
        </Typography>
      </Grid>

      <Grid item className={classes.item}>
        <TextField
          autoFocus
          id='number__Contract'
          name='number__Contract'
          label='№ Дог'
          type='text'
          value={number__Contract ? number__Contract : ''}
          error={number__Contract_Helper.length !== 0}
          helperText={number__Contract_Helper}
          fullWidth
          autoComplete='text'
          onChange={(e) => onChangeHandler(e)}
        />
      </Grid>
      <Grid item className={classes.dialogItem}>
        <DatePicker
          id='date_Contract'
          name='date_Contract'
          label='Дата договора'
          format='dd-MM-yyyy'
          value={date_Contract ? date_Contract : ''}
          fullWidth
          autoOk
          animateYearScrolling
          disableFuture
          // openTo='year'
          onChange={(newDate) => {
            set_date_Contract(newDate);
          }}
        />
      </Grid>

      <Grid item className={classes.item}>
        <InputLabel id='type_Contract-label'>Тип договора</InputLabel>
        <Select
          labelId='type_Contract-label'
          id='type_Contract'
          name='type_Contract'
          // multiple
          required
          fullWidth
          value={type_Contract ? type_Contract : ''}
          onChange={(e) => onChangeHandler(e)}
          className={classes.select}
        >
          {typeOfContracts &&
            typeOfContracts.map((item) => (
              <MenuItem key={item} value={item} className={classes.selectItem}>
                {item}
              </MenuItem>
            ))}
        </Select>
      </Grid>

      <Grid item className={classes.item}>
        <TextField
          id='typesOf_WorkInTheContract'
          name='typesOf_WorkInTheContract'
          label='Виды работ в договоре'
          type='text'
          value={typesOf_WorkInTheContract ? typesOf_WorkInTheContract : ''}
          error={typesOf_WorkInTheContract_Helper.length !== 0}
          helperText={typesOf_WorkInTheContract_Helper}
          fullWidth
          autoComplete='text'
          onChange={(e) => onChangeHandler(e)}
        />
      </Grid>
      <Grid item className={classes.item}>
        <TextField
          id='sum'
          name='sum'
          label='Сумма договора'
          type='number'
          value={sum ? sum : ''}
          error={sum_Helper.length !== 0}
          helperText={sum_Helper}
          fullWidth
          // autoComplete='text'
          onChange={(e) => onChangeHandler(e)}
        />
      </Grid>

      <Grid item className={classes.item}>
        <Grid
          container
          className={classes.wrapSelectAndLink}
          justify='center'
          alignItems='center'
          direction='row'
        >
          <Grid item>
            <Grid container>
              <Grid item style={{ position: 'relative', width: 300 }}>
                <TextField
                  id='searchOurFirm'
                  name='searchOurFirm'
                  label='Выбери нашу фирму'
                  type='search'
                  value={searchOurFirm ? searchOurFirm : ''}
                  fullWidth
                  autoComplete='off'
                  // onChange={(e) => onChangeHandler(e)}
                  onInput={(e) => onInputHandler(e)}
                />

                <Grid
                  item
                  className={classes.wrapSearchList}
                  style={{
                    display:
                      openSearchListOurFirm && searchOurFirm.length > 0
                        ? 'block'
                        : 'none',
                  }}
                >
                  <List className={classes.searchList}>
                    {array_of_OurFirm &&
                      array_of_OurFirm.length > 0 &&
                      array_of_OurFirm.map((item) => (
                        <ListItem
                          key={item._id}
                          button
                          onClick={() => {
                            set__openSearchListOurFirm(false);
                            set__searchOurFirm(item.name__Firm);
                            setFormData({ ...formData, ourFirm: item._id });
                          }}
                        >
                          <ListItemText>{item.name__Firm}</ListItemText>
                        </ListItem>
                      ))}
                  </List>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item className={classes.wrapLink}>
            <Tooltip title='Добавить фирму'>
              <IconButton
                onClick={() => history.push(`/reference-data/firm/add`)}
              >
                <Icon color='primary'>add_circle</Icon>
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>

      <Grid item className={classes.item}>
        <Grid
          container
          className={classes.wrapSelectAndLink}
          justify='center'
          alignItems='center'
          direction='row'
        >
          <Grid item>
            <Grid container>
              <Grid item style={{ position: 'relative', width: 300 }}>
                <TextField
                  id='searchClient'
                  name='searchClient'
                  label='Выбери клиента'
                  type='search'
                  value={searchClient ? searchClient : ''}
                  fullWidth
                  autoComplete='off'
                  // onChange={(e) => onChangeHandler(e)}
                  onInput={(e) => onInputHandler(e)}
                />

                <Grid
                  item
                  className={classes.wrapSearchList}
                  style={{
                    display:
                      openSearchListClient && searchClient.length > 0
                        ? 'block'
                        : 'none',
                  }}
                >
                  <List className={classes.searchList}>
                    {array_of_Client &&
                      array_of_Client.length > 0 &&
                      array_of_Client.map((item) => (
                        <ListItem
                          key={item._id}
                          button
                          onClick={() => {
                            set__openSearchListClient(false);
                            set__searchClient(item.name__Firm);
                            setFormData({ ...formData, client: item._id });
                          }}
                        >
                          <ListItemText>{item.name__Firm}</ListItemText>
                        </ListItem>
                      ))}
                  </List>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item className={classes.wrapLink}>
            <Tooltip title='Добавить фирму'>
              <IconButton
                onClick={() => history.push(`/reference-data/firm/add`)}
              >
                <Icon color='primary'>add_circle</Icon>
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>

      <Grid item className={classes.item}>
        <FormControlLabel
          control={
            <Switch
              checked={active}
              onChange={(e) => handleChangeSwitch(e)}
              name='active'
            />
          }
          label='Активный'
        />
      </Grid>

      <Grid item className={classes.item}>
        <Button
          disabled={
            !number__Contract ||
            !type_Contract ||
            !typesOf_WorkInTheContract ||
            !ourFirm ||
            !client ||
            number__Contract_Helper.length !== 0 ||
            typesOf_WorkInTheContract_Helper.length !== 0
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

FirmAdd.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  add__CONTRACT: PropTypes.func.isRequired,

  getAll__FIRM: PropTypes.func.isRequired,

  // state__auth: PropTypes.object.isRequired,
  // state__CONTRACT: PropTypes.object.isRequired,
  state__FIRM: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // state__auth: state.auth,
  // state__CONTRACT: state.conract,

  state__FIRM: state.firm,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  add__CONTRACT,

  getAll__FIRM,
})(FirmAdd);
