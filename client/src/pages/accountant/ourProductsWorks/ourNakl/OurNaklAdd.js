import React, { useEffect, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DatePicker } from '@material-ui/pickers';
import { format } from 'date-fns';

import { setNameOfPage } from '../../../../store/actions/nameOfPage';
import { add__OUR_NAKL } from '../../../../store/actions/accountant/ourProductsWorks/ourNakl';
import { getAll__CONTRACT } from '../../../../store/actions/accountant/contract/contract';
import { getAll__FIRM } from '../../../../store/actions/referenceData/firm';
import { getAll__PRODUCT } from '../../../../store/actions/referenceData/product';
import { getAll__GROUP_PRODUCT } from '../../../../store/actions/referenceData/groupProduct';
import FirmAdd from '../../../referenceData/firm/FirmAdd';

import {
  generateDocNumber,
  handleSearchInArray,
} from '../../../../utils/helperFunction';

import Fab from '@material-ui/core/Fab';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Tooltip from '@material-ui/core/Tooltip';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
// import InputLabel from '@material-ui/core/InputLabel';
// import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import DetailsIcon from '@material-ui/icons/Details';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import AddBoxIcon from '@material-ui/icons/AddBox';

import CloseIcon from '@material-ui/icons/Close';

import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

import ExpandMore from '@material-ui/icons/ExpandMore';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Switch from '@material-ui/core/Switch';

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
  wrapSearchList: {
    position: 'absolute',
    top: 50,
    left: 0,
    zIndex: 9999,
    backgroundColor: '#EEE',
  },
  searchList: {
    maxHeight: 150,
    overflowY: 'scroll',
  },
  markUp_input: {
    width: 40,
    color: '#ff0000',
    textAlign: 'center',
  },
  tableContainer: {
    width: theme.breakpoints.width('lg'),
    paddingBottom: 150,
  },
}));

const OurNaklAdd = ({
  setNameOfPage,
  add__OUR_NAKL,

  getAll__FIRM,
  getAll__CONTRACT,
  getAll__PRODUCT,
  getAll__GROUP_PRODUCT,

  // state__OUR_NAKL,
  state__FIRM,
  state__PRODUCT,
  state__CONTRACT,
  state__GROUP_PRODUCT,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const [formData, setFormData] = useState({
    naklNumber: `ВН-${generateDocNumber()}`,
    contract: '',
    ourFirm: '',
    client: '',
    formOfPayment: 'форма1',
  });
  const [naclDate, set__naclDate] = useState(new Date());
  const [active, set__active] = useState(true);

  const [taxAndMarkUp, set__taxAndMarkUp] = useState({
    our__Tax: 7,
    our__MarkUp: 20,
    markUp__Budget: 0,
  });
  const [tempRowData, set__tempRowData] = useState({
    temp__productId: '',
    temp__name__Product: '',
    temp_description: '',
    temp__unit: '',
    temp__amount: 0,
    temp__enteredPrice: 0,
    temp__sellingPrice: 0,
    temp__Sum: 0,
  });
  const [tempContractData, set__tempContractData] = useState({
    temp__number__Contract: '',
    temp__date_Contract: '',
    temp__typesOf_WorkInTheContract: '',
  });
  const [rows__Product, set__rows__Product] = useState([]);
  const [displayNewRow, set__displayNewRow] = useState(false);

  const [openSelectProduct, set__openSelectProduct] = useState(false);
  const [openSelectContract, set__openSelectContract] = useState(false);
  const [openSelectOurFirm, set__openSelectOurFirm] = useState(false);
  const [openSelectClient, set__openSelectClient] = useState(false);
  const [openAddFirm, set__openAddFirm] = useState(false);

  const {
    temp__number__Contract,
    temp__date_Contract,
    temp__typesOf_WorkInTheContract,
  } = tempContractData;

  // console.log({
  //   temp__number__Contract,
  //   temp__date_Contract,
  //   temp__typesOf_WorkInTheContract,
  // });

  const {
    temp__productId,
    temp__name__Product,
    temp_description,
    temp__unit,
    temp__amount,
    temp__enteredPrice,
    temp__sellingPrice,
    temp__Sum,
  } = tempRowData;

  const { our__Tax, our__MarkUp, markUp__Budget } = taxAndMarkUp;

  const { naklNumber, contract, ourFirm, client, formOfPayment } = formData;

  const [searchOurFirm, set__searchOurFirm] = useState('');
  const [searchClient, set__searchClient] = useState('');
  const [searchProduct, set__searchProduct] = useState('');

  const [array_of_OurFirm, set__array_of_OurFirm] = useState(
    state__FIRM.array__FIRM.filter((item) => item.who_is.includes('наша фирма'))
  );
  const [array_of_Client, set__array_of_Client] = useState(
    state__FIRM.array__FIRM.filter((item) => item.who_is.includes('клиент'))
  );
  const [array_of_Product, set__array_of_Product] = useState(
    state__PRODUCT.array__PRODUCT
  );
  const [array_of_CONTRACT, set__array_of_CONTRACT] = useState([]);

  const getRelatedContacts = () => {
    if (ourFirm && ourFirm.length > 0 && client && client.length > 0) {
      const relatedContracts = full_array_of_CONTRACT.filter(
        (item) => item.ourFirm._id === ourFirm && item.client._id === client
      );
      if (relatedContracts && relatedContracts.length > 0) {
        set__array_of_CONTRACT(relatedContracts);
      } else {
        set__array_of_CONTRACT([]);
      }
    }
  };

  const [openSearchListOurFirm, set__openSearchListOurFirm] = useState(false);
  const [openSearchListClient, set__openSearchListClient] = useState(false);
  const [openSearchListProduct, set__openSearchListProduct] = useState(false);

  // const [full_array_of_OurFirm, set__full_array_of_OurFirm] = useState([]);
  // const [full_array_of_Client, set__full_array_of_Client] = useState([]);
  // const [full_array_of_Product, set__full_array_of_Product] = useState([]);
  // const [
  //   full_array_of_Group_Product,
  //   set__full_array_of_Group_Product,
  // ] = useState([]);
  // const [full_array_of_CONTRACT, set__full_array_of_CONTRACT] = useState([]);
  // console.log(array_of_CONTRACT);

  let full_array_of_CONTRACT = useMemo(() => state__CONTRACT.array__CONTRACT, [
    state__CONTRACT.array__CONTRACT,
  ]);

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

  let full_array_of_Product = useMemo(() => state__PRODUCT.array__PRODUCT, [
    state__PRODUCT.array__PRODUCT,
  ]);

  let full_array_of_Group_Product = useMemo(
    () => state__GROUP_PRODUCT.array__GROUP_PRODUCT,
    [state__GROUP_PRODUCT.array__GROUP_PRODUCT]
  );

  const handleChangeSwitch = (event) => {
    set__active(event.target.checked);
  };
  const clearFormData = () => {
    setFormData({
      naklNumber: `ВН-${generateDocNumber()}`,
      contract: '',
      ourFirm: '',
      client: '',
      formOfPayment: 'форма1',
    });
    set__naclDate(new Date());
    set__active(true);
  };

  const clear__tempRowData = () => {
    set__tempRowData({
      temp__productId: '',
      temp__name__Product: '',
      temp_description: '',
      temp__unit: '',
      temp__amount: 0,
      temp__enteredPrice: 0,
      temp__sellingPrice: 0,
      temp__Sum: 0,
    });
  };

  const deleteRow = (index) => {
    const newArr = [...rows__Product];
    newArr.splice(index, 1);

    set__rows__Product(newArr);
  };

  const editRow = (index) => {
    const editObj = rows__Product[index];
    set__tempRowData({
      temp__productId: editObj.temp__productId,
      temp__name__Product: editObj.temp__name__Product,
      temp_description: editObj.temp_description,
      temp__unit: editObj.temp__unit,
      temp__amount: editObj.temp__amount,
      temp__enteredPrice: editObj.temp__enteredPrice,
      temp__sellingPrice: editObj.temp__sellingPrice,
      temp__Sum: editObj.temp__Sum,
    });
  };

  const saveRow = () => {
    let row_sum = 0;
    let price_with_tax = 0;
    let price_with_murkUP = 0;
    let price_client = 0;

    let total_row_sum = 0;

    if (temp__sellingPrice && temp__sellingPrice > 0) {
      row_sum = temp__amount * temp__sellingPrice;
      total_row_sum = row_sum + (row_sum * markUp__Budget) / 100;
      price_client = temp__sellingPrice;
    } else {
      price_with_tax =
        temp__enteredPrice + (temp__enteredPrice * our__Tax) / 100;
      price_with_murkUP = price_with_tax + (price_with_tax * our__MarkUp) / 100;
      price_client =
        price_with_murkUP + (price_with_murkUP * markUp__Budget) / 100;

      total_row_sum = temp__amount * price_client;
    }

    const newRow = {
      temp__productId,
      temp__name__Product,
      temp_description,
      temp__unit,
      temp__amount: Number(temp__amount).toFixed(2),
      temp__enteredPrice: Number(temp__enteredPrice).toFixed(2),
      temp__sellingPrice: Number(price_client).toFixed(2),
      temp__Sum: Number(total_row_sum).toFixed(2),
    };
    const newArr = [...rows__Product, newRow];

    set__rows__Product(newArr);
    clear__tempRowData();
    set__displayNewRow(false);
    set__searchProduct('');
  };

  useEffect(() => {
    setNameOfPage('Добавить накладную');

    getAll__FIRM();
    getAll__CONTRACT();
    getAll__PRODUCT();
    getAll__GROUP_PRODUCT();

    return () => {
      clearFormData();
    };
  }, [
    setNameOfPage,
    getAll__FIRM,
    getAll__CONTRACT,
    getAll__PRODUCT,
    getAll__GROUP_PRODUCT,
  ]);

  const onSubmit = () => {
    const products = rows__Product.map((item) => {
      return {
        product: item.temp__productId,
        description: item.temp_description,
        amount: Number(item.temp__amount).toFixed(2),
        enteredPrice: Number(item.temp__enteredPrice).toFixed(2),
        sellingPrice: Number(item.temp__sellingPrice).toFixed(2),
        row__Sum: Number(item.temp__Sum).toFixed(2),
      };
    });

    add__OUR_NAKL(
      naklNumber,
      naclDate,
      contract,
      ourFirm,
      client,
      products,
      formOfPayment,
      active
    );
    set__rows__Product([]);

    clearFormData();
    // history.goBack();
  };

  const onChangeHandler = (event) => {
    // console.log(event);
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onMarkUpChangeHandler = (event) => {
    // console.log(event);
    set__taxAndMarkUp({
      ...taxAndMarkUp,
      [event.target.name]: event.target.value,
    });
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

    if (event.target.name === 'searchProduct') {
      set__openSearchListProduct(true);

      set__searchProduct(event.target.value);

      set__array_of_Product(
        handleSearchInArray(full_array_of_Product, event.target.value)
      );
    }
  };

  const onTempRowDataHandler = (event) => {
    set__tempRowData({
      ...tempRowData,

      [event.target.name]: event.target.value,
    });
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
          Добавить накладную
        </Typography>
      </Grid>

      <Grid item className={classes.item}>
        <Grid container justify='space-between' alignItems='center'>
          <Grid item style={{ width: 150 }}>
            <TextField
              // autoFocus
              id='naklNumber'
              name='naklNumber'
              label='Номер накладной'
              type='text'
              value={naklNumber ? naklNumber : ''}
              // error={name__OUR_NAKL_Helper.length !== 0}
              // helperText={name__OUR_NAKL_Helper}
              fullWidth
              autoComplete='text'
              onChange={(e) => onChangeHandler(e)}
            />
          </Grid>
          <Grid item style={{ width: 100 }}>
            <DatePicker
              id='naclDate'
              name='naclDate'
              label='Дата '
              format='dd-MM-yyyy'
              value={naclDate ? naclDate : ''}
              fullWidth
              autoOk
              animateYearScrolling
              disableFuture
              // openTo='year'
              onChange={(newDate) => {
                set__naclDate(newDate);
              }}
            />
          </Grid>
          <Grid item>
            <Grid container>
              <Grid item style={{ position: 'relative', width: 250 }}>
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
                            // belongContract();
                          }}
                        >
                          <ListItemText>{item.name__Firm}</ListItemText>
                        </ListItem>
                      ))}
                  </List>
                </Grid>
              </Grid>
              <Grid item>
                <Tooltip title='Подбор иcполнителя'>
                  <IconButton onClick={() => set__openSelectOurFirm(true)}>
                    <DetailsIcon color='primary' style={{ fontSize: 35 }} />
                  </IconButton>
                </Tooltip>
                <Dialog
                  open={openSelectOurFirm}
                  onClose={() => set__openSelectOurFirm(false)}
                >
                  <DialogTitle>Подбор иполнителя</DialogTitle>
                  <DialogContent dividers>
                    <List>
                      {full_array_of_OurFirm &&
                        full_array_of_OurFirm.length > 0 &&
                        full_array_of_OurFirm.map((item) => (
                          <ListItem
                            key={item._id}
                            button
                            onClick={() => {
                              set__openSearchListOurFirm(false);
                              set__searchOurFirm(item.name__Firm);
                              setFormData({ ...formData, ourFirm: item._id });
                              set__openSelectOurFirm(false);
                              // belongContract();
                            }}
                          >
                            <ListItemText disableTypography>
                              {item.name__Firm}
                            </ListItemText>
                          </ListItem>
                        ))}
                    </List>
                  </DialogContent>
                </Dialog>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container>
              <Grid item style={{ position: 'relative', width: 250 }}>
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
                            // belongContract();
                          }}
                        >
                          <ListItemText>{item.name__Firm}</ListItemText>
                        </ListItem>
                      ))}
                  </List>
                </Grid>
              </Grid>
              <Grid item>
                <Tooltip title='Подбор заказчика'>
                  <IconButton onClick={() => set__openSelectClient(true)}>
                    <DetailsIcon color='primary' style={{ fontSize: 35 }} />
                  </IconButton>
                </Tooltip>
                <Dialog
                  open={openSelectClient}
                  onClose={() => set__openSelectClient(false)}
                >
                  <DialogTitle>Подбор заказчика</DialogTitle>
                  <DialogContent dividers>
                    <List>
                      {full_array_of_Client &&
                        full_array_of_Client.length > 0 &&
                        full_array_of_Client.map((item) => (
                          <ListItem
                            key={item._id}
                            button
                            onClick={() => {
                              set__openSearchListClient(false);
                              set__searchClient(item.name__Firm);
                              setFormData({ ...formData, client: item._id });
                              set__openSelectClient(false);
                              // belongContract();
                            }}
                          >
                            <ListItemText disableTypography>
                              {item.name__Firm}
                            </ListItemText>
                          </ListItem>
                        ))}
                    </List>
                  </DialogContent>
                </Dialog>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{}}>
            <Tooltip title='Добавить фирму'>
              <IconButton
                // onClick={() => history.push(`/reference-data/firm/add`)}
                onClick={() => {
                  set__openAddFirm(true);
                }}
              >
                <AddBoxIcon color='primary' />
              </IconButton>
            </Tooltip>
            <Dialog open={openAddFirm} onClose={() => set__openAddFirm(false)}>
              <DialogTitle>Добавить фирму</DialogTitle>
              <DialogContent dividers>
                <FirmAdd />
              </DialogContent>
              <DialogActions>
                <IconButton
                  // onClick={() => history.push(`/reference-data/firm/add`)}
                  onClick={() => {
                    set__openAddFirm(false);
                  }}
                >
                  <CloseIcon color='primary' />
                </IconButton>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Grid>

      <Grid item className={classes.item}>
        <Grid container justify='flex-start' alignItems='center'>
          <Grid item>
            <Typography>
              {temp__number__Contract && `Договор № ${temp__number__Contract} `}
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              {' '}
              {temp__date_Contract &&
                ` вiд ${format(new Date(temp__date_Contract), 'dd-MM-yyyy')}`}
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              {' '}
              {temp__typesOf_WorkInTheContract &&
                ` работы: ${temp__typesOf_WorkInTheContract}`}
            </Typography>
          </Grid>
          <Grid item>
            <Tooltip title='Подбор договора'>
              <span>
                <IconButton
                  onClick={() => {
                    set__openSelectContract(true);
                    getRelatedContacts();
                  }}
                  disabled={
                    !(
                      ourFirm &&
                      ourFirm.length > 0 &&
                      client &&
                      client.length > 0
                    )
                  }
                >
                  <DetailsIcon
                    color={
                      !(
                        ourFirm &&
                        ourFirm.length > 0 &&
                        client &&
                        client.length > 0
                      )
                        ? 'disabled'
                        : 'primary'
                    }
                    style={{
                      fontSize: 35,
                    }}
                  />
                </IconButton>
              </span>
            </Tooltip>
          </Grid>

          <Dialog
            open={openSelectContract}
            onClose={() => set__openSelectContract(false)}
          >
            <DialogTitle>Договора контрагентов</DialogTitle>
            <DialogContent dividers>
              <List>
                {array_of_CONTRACT &&
                  array_of_CONTRACT.length > 0 &&
                  array_of_CONTRACT.map((item) => (
                    <ListItem
                      key={item._id}
                      button
                      onClick={() => {
                        set__openSelectContract(false);
                        set__tempContractData({
                          ...tempContractData,
                          temp__number__Contract: item.number__Contract,
                          temp__date_Contract: item.date_Contract,
                          temp__typesOf_WorkInTheContract:
                            item.typesOf_WorkInTheContract,
                        });
                        setFormData({
                          ...formData,
                          contract: item._id,
                        });
                      }}
                    >
                      <ListItemText disableTypography>
                        <Typography>
                          {item.number__Contract &&
                            `Договор № ${item.number__Contract}`}
                        </Typography>
                        <Typography>
                          {' '}
                          {item.date_Contract &&
                            ` вiд ${format(
                              new Date(item.date_Contract),
                              'dd-MM-yyyy'
                            )}`}
                          {/* {item.date_Contract} */}
                        </Typography>
                        <Typography>{`работы: ${item.typesOf_WorkInTheContract}`}</Typography>
                      </ListItemText>
                    </ListItem>
                  ))}
              </List>
            </DialogContent>
          </Dialog>
        </Grid>
      </Grid>
      <Grid item className={classes.item}>
        <Grid container direction='row' justify='flex-start' spacing={3}>
          <Grid item>
            <Grid
              container
              direction='column'
              justify='flex-start'
              alignItems='flex-start'
              // spacing={3}
              style={{ width: 150 }}
            >
              <Grid item style={{ width: '100%' }}>
                <Grid container justify='space-between' alignItems='center'>
                  <Grid item>
                    <Typography>Налог</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      // autoFocus
                      id='our__Tax'
                      name='our__Tax'
                      // label='налог'
                      type='number'
                      value={our__Tax ? our__Tax : ''}
                      color='secondary'
                      // error={name__OUR_NAKL_Helper.length !== 0}
                      // helperText={name__OUR_NAKL_Helper}
                      // fullWidth
                      // autoComplete='text'
                      InputProps={{
                        className: classes.markUp_input,
                      }}
                      // className={classes.markUp_input}
                      onChange={(e) => onMarkUpChangeHandler(e)}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item style={{ width: '100%' }}>
                <Grid container justify='space-between' alignItems='center'>
                  <Grid item>
                    <Typography> Наценка</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      // autoFocus
                      id='our__MarkUp'
                      name='our__MarkUp'
                      // label='налог'
                      type='number'
                      value={our__MarkUp ? our__MarkUp : ''}
                      // error={name__OUR_NAKL_Helper.length !== 0}
                      // helperText={name__OUR_NAKL_Helper}
                      // fullWidth
                      // autoComplete='text'
                      InputProps={{
                        className: classes.markUp_input,
                      }}
                      // className={classes.markUp_input}
                      onChange={(e) => onMarkUpChangeHandler(e)}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item style={{ width: '100%' }}>
                <Grid container justify='space-between' alignItems='center'>
                  <Grid item>
                    <Typography>% бюджет</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      // autoFocus
                      id='markUp__Budget'
                      name='markUp__Budget'
                      // label='налог'
                      type='number'
                      value={markUp__Budget ? markUp__Budget : ''}
                      // error={name__OUR_NAKL_Helper.length !== 0}
                      // helperText={name__OUR_NAKL_Helper}
                      // fullWidth
                      // autoComplete='text'
                      InputProps={{
                        className: classes.markUp_input,
                      }}
                      // className={classes.markUp_input}
                      onChange={(e) => onMarkUpChangeHandler(e)}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <FormControl component='fieldset'>
              <FormLabel component='legend'>Форма оплаты</FormLabel>
              <RadioGroup
                aria-label='genformOfPaymentder'
                id='formOfPayment'
                name='formOfPayment'
                value={formOfPayment ? formOfPayment : ''}
                onChange={(e) => onChangeHandler(e)}
              >
                <FormControlLabel
                  value='форма1'
                  control={<Radio />}
                  label='форма1'
                />
                <FormControlLabel
                  value='форма2'
                  control={<Radio />}
                  label='форма2'
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item>
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
        </Grid>
      </Grid>
      <Grid item className={classes.item}>
        <Paper className={classes.tablePaper}>
          <TableContainer className={classes.tableContainer}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  <TableCell style={{ display: 'none' }}>
                    temp__productId
                  </TableCell>
                  <TableCell style={{ width: 20 }}>№</TableCell>
                  <TableCell>Будматеріал</TableCell>
                  <TableCell style={{ width: 120 }}>Доп ИНФО</TableCell>
                  <TableCell style={{ width: 70 }}>Од. Вимиру</TableCell>
                  <TableCell style={{ width: 80 }}>Кількість</TableCell>
                  <TableCell style={{ width: 80 }}>Ціна зак</TableCell>
                  <TableCell style={{ width: 80 }}>Ціна клиент</TableCell>
                  <TableCell style={{ width: 80 }}>Сума</TableCell>
                  <TableCell style={{ width: 120 }}>
                    <Tooltip title='Добавить товар'>
                      <IconButton onClick={() => set__displayNewRow(true)}>
                        <AddBoxIcon color='primary' style={{ fontSize: 35 }} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows__Product &&
                  rows__Product.length > 0 &&
                  rows__Product.map((item, index) => (
                    <TableRow key={item.temp__productId}>
                      <TableCell style={{ display: 'none' }}>
                        {item.temp__productId}
                      </TableCell>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.temp__name__Product}</TableCell>
                      <TableCell>{item.temp_description}</TableCell>
                      <TableCell>{item.temp__unit}</TableCell>
                      <TableCell>{item.temp__amount}</TableCell>
                      <TableCell>{item.temp__enteredPrice}</TableCell>
                      <TableCell>{item.temp__sellingPrice}</TableCell>
                      <TableCell>{item.temp__Sum}</TableCell>
                      <TableCell>
                        <Grid container>
                          <Grid item>
                            <IconButton onClick={() => editRow(index)}>
                              <EditIcon color='primary' />
                            </IconButton>
                          </Grid>
                          <Grid item>
                            <IconButton onClick={() => deleteRow(index)}>
                              <DeleteForeverIcon color='error' />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  ))}

                <TableRow
                  style={{
                    display: displayNewRow ? 'table-row' : 'none',
                    border: '1px solid #ff0000',
                  }}
                >
                  <TableCell style={{ display: 'none' }}>
                    <TextField
                      // autoFocus
                      id='temp__productId'
                      name='temp__productId'
                      label='temp__productId'
                      type='text'
                      value={temp__productId ? temp__productId : ''}
                      // error={name__OUR_NAKL_Helper.length !== 0}
                      // helperText={name__OUR_NAKL_Helper}
                      // fullWidth
                      autoComplete='text'
                      onChange={(e) => onTempRowDataHandler(e)}
                    />
                  </TableCell>
                  <TableCell>{rows__Product.length + 1}</TableCell>
                  <TableCell>
                    <Grid
                      container
                      style={{ position: 'relative' }}
                      justify='flex-start'
                      alignItems='center'
                    >
                      <Grid item>
                        <TextField
                          autoFocus
                          id='searchProduct'
                          name='searchProduct'
                          label='Товар'
                          type='search'
                          value={searchProduct ? searchProduct : ''}
                          // error={name__OUR_NAKL_Helper.length !== 0}
                          // helperText={name__OUR_NAKL_Helper}
                          fullWidth
                          autoComplete='off'
                          onChange={(e) => {
                            onInputHandler(e);
                          }}
                        />
                      </Grid>

                      <Grid item>
                        <Tooltip title='Подбор товара'>
                          <IconButton
                            onClick={() => set__openSelectProduct(true)}
                          >
                            <DetailsIcon
                              color='primary'
                              style={{ fontSize: 35 }}
                            />
                          </IconButton>
                        </Tooltip>
                      </Grid>

                      <Dialog
                        open={openSelectProduct}
                        onClose={() => set__openSelectProduct(false)}
                      >
                        <DialogTitle>Подбор товара</DialogTitle>
                        <DialogContent dividers>
                          <Accordion className={classes.accordion}>
                            <AccordionSummary
                              expandIcon={<ExpandMore />}
                              aria-controls={`panel-accountant-content`}
                              id={`panel-accountant-header`}
                              className={classes.accordionSummary}
                            >
                              <Typography
                                className={classes.accordionSummaryHeading}
                              >
                                Группы
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails
                              className={classes.accordionSummaryDetails}
                            >
                              <List
                                disablePadding
                                className={classes.listAccoprdion}
                              >
                                {full_array_of_Group_Product &&
                                  full_array_of_Group_Product.length > 0 &&
                                  full_array_of_Group_Product.map((group) => (
                                    <ListItem key={group._id}>
                                      <ListItemText
                                        disableTypography
                                        className={classes.drawerItem_level2}
                                      >
                                        <Accordion
                                          className={classes.accordion}
                                        >
                                          <AccordionSummary
                                            expandIcon={<ExpandMore />}
                                            aria-controls={`panel-${group._id}-content`}
                                            id={`panel-${group._id}-header`}
                                            className={classes.accordionSummary}
                                          >
                                            <Typography
                                              className={
                                                classes.accordionSummaryHeading
                                              }
                                            >
                                              {group.name__Group_Product}
                                            </Typography>
                                          </AccordionSummary>
                                          <AccordionDetails
                                            className={
                                              classes.accordionSummaryDetails
                                            }
                                          >
                                            <List
                                              disablePadding
                                              className={classes.listAccoprdion}
                                            >
                                              {full_array_of_Product &&
                                                full_array_of_Product.length >
                                                  0 &&
                                                full_array_of_Product
                                                  .filter(
                                                    (item) =>
                                                      item.group_Product._id ===
                                                      group._id
                                                  )
                                                  .map((item) => (
                                                    <ListItem
                                                      key={item._id}
                                                      button
                                                      onClick={() => {
                                                        set__openSearchListProduct(
                                                          false
                                                        );
                                                        set__openSelectProduct(
                                                          false
                                                        );
                                                        set__searchProduct(
                                                          item.name__Product
                                                        );
                                                        set__tempRowData({
                                                          ...tempRowData,
                                                          temp__productId: item._id
                                                            ? item._id
                                                            : '',
                                                          temp__name__Product: item.name__Product
                                                            ? item.name__Product
                                                            : '',
                                                          temp__unit: item.unit
                                                            ? item.unit
                                                                .name__Unit
                                                            : '',
                                                          temp__enteredPrice: item.enteredPrice
                                                            ? item.enteredPrice
                                                            : 0,
                                                          temp__sellingPrice: item.sellingPrice
                                                            ? item.sellingPrice
                                                            : 0,
                                                        });
                                                      }}
                                                    >
                                                      <ListItemText
                                                        disableTypography
                                                        className={
                                                          classes.drawerItem_level3
                                                        }
                                                      >
                                                        {item.name__Product}
                                                      </ListItemText>
                                                    </ListItem>
                                                  ))}
                                            </List>
                                          </AccordionDetails>
                                        </Accordion>
                                      </ListItemText>
                                    </ListItem>
                                  ))}
                              </List>
                            </AccordionDetails>
                          </Accordion>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            autoFocus
                            onClick={() => set__openSelectProduct(false)}
                            color='primary'
                          >
                            Закрыть
                          </Button>
                        </DialogActions>
                      </Dialog>

                      <Grid
                        item
                        className={classes.wrapSearchList}
                        style={{
                          display:
                            openSearchListProduct && searchProduct.length > 0
                              ? 'block'
                              : 'none',
                        }}
                      >
                        <List className={classes.searchList}>
                          {array_of_Product &&
                            array_of_Product.length > 0 &&
                            array_of_Product.map((item) => (
                              <ListItem
                                key={item._id}
                                button
                                onClick={() => {
                                  set__openSearchListProduct(false);
                                  // set__temp__select__productId(item._id);
                                  set__searchProduct(item.name__Product);
                                  set__tempRowData({
                                    ...tempRowData,
                                    temp__productId: item._id ? item._id : '',
                                    temp__name__Product: item.name__Product
                                      ? item.name__Product
                                      : '',
                                    temp__unit: item.unit
                                      ? item.unit.name__Unit
                                      : '',
                                    temp__enteredPrice: item.enteredPrice
                                      ? item.enteredPrice
                                      : 0,
                                    temp__sellingPrice: item.sellingPrice
                                      ? item.sellingPrice
                                      : 0,
                                  });
                                }}
                              >
                                <ListItemText>
                                  {item.name__Product}
                                </ListItemText>
                              </ListItem>
                            ))}
                        </List>
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell>
                    <TextField
                      // autoFocus
                      id='temp_description'
                      name='temp_description'
                      label='доп'
                      type='text'
                      multiline
                      value={temp_description ? temp_description : ''}
                      // error={name__OUR_NAKL_Helper.length !== 0}
                      // helperText={name__OUR_NAKL_Helper}
                      fullWidth
                      // autoComplete='text'
                      onChange={(e) => onTempRowDataHandler(e)}
                    />
                  </TableCell>

                  <TableCell>
                    <Typography>{temp__unit ? temp__unit : '?'}</Typography>
                  </TableCell>
                  <TableCell>
                    <TextField
                      // autoFocus
                      id='temp__amount'
                      name='temp__amount'
                      label='кол-во'
                      type='number'
                      step='0.001'
                      value={temp__amount ? temp__amount : ''}
                      // error={name__OUR_NAKL_Helper.length !== 0}
                      // helperText={name__OUR_NAKL_Helper}
                      fullWidth
                      // autoComplete='text'
                      onChange={(e) => onTempRowDataHandler(e)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      // autoFocus
                      id='temp__enteredPrice'
                      name='temp__enteredPrice'
                      label='цена 1'
                      type='number'
                      step='0.01'
                      value={temp__enteredPrice ? temp__enteredPrice : ''}
                      // error={name__OUR_NAKL_Helper.length !== 0}
                      // helperText={name__OUR_NAKL_Helper}
                      fullWidth
                      // autoComplete='text'
                      onChange={(e) => onTempRowDataHandler(e)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      // autoFocus
                      id='temp__sellingPrice'
                      name='temp__sellingPrice'
                      label='цена 2'
                      type='number'
                      step='0.01'
                      value={temp__sellingPrice ? temp__sellingPrice : ''}
                      // error={name__OUR_NAKL_Helper.length !== 0}
                      // helperText={name__OUR_NAKL_Helper}
                      fullWidth
                      // autoComplete='text'
                      onChange={(e) => onTempRowDataHandler(e)}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography>{temp__Sum ? temp__Sum : '?'}</Typography>
                  </TableCell>
                  <TableCell>
                    <Grid container>
                      <Grid item>
                        <IconButton
                          // disabled={
                          //   !temp__productId ||
                          //   !temp__name__Product ||
                          //   !temp__amount ||
                          //   !temp__enteredPrice
                          // }

                          disabled={
                            !temp__productId ||
                            temp__productId.length === 0 ||
                            !temp__name__Product ||
                            temp__name__Product.length === 0 ||
                            !temp__amount ||
                            temp__amount === 0 ||
                            !temp__enteredPrice ||
                            temp__enteredPrice === 0
                          }
                          onClick={() => saveRow()}
                        >
                          <SaveIcon
                            // color={
                            //   !temp__productId ||
                            //   !temp__name__Product ||
                            //   !temp__amount ||
                            //   !temp__enteredPrice
                            //     ? 'disabled'
                            //     : 'primary'
                            // }
                            color={
                              !temp__productId ||
                              temp__productId.length === 0 ||
                              !temp__name__Product ||
                              temp__name__Product.length === 0 ||
                              !temp__amount ||
                              temp__amount === 0 ||
                              !temp__enteredPrice ||
                              temp__enteredPrice.length === 0
                                ? 'disabled'
                                : 'primary'
                            }
                          />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton
                          onClick={() => {
                            set__displayNewRow(false);
                            clear__tempRowData();
                            set__searchProduct('');
                          }}
                        >
                          <CloseIcon color='error' />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>

      <Grid item className={classes.item}>
        <Button
          disabled={
            !naklNumber ||
            !naclDate ||
            !contract ||
            !ourFirm ||
            !client ||
            (rows__Product && rows__Product.length === 0) ||
            !formOfPayment
          }
          variant='contained'
          onClick={() => onSubmit()}
          color='primary'
        >
          Провести
        </Button>
      </Grid>
    </Grid>
  );
};

OurNaklAdd.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  add__OUR_NAKL: PropTypes.func.isRequired,

  getAll__FIRM: PropTypes.func.isRequired,
  getAll__CONTRACT: PropTypes.func.isRequired,
  getAll__PRODUCT: PropTypes.func.isRequired,

  // state_auth: PropTypes.object.isRequired,
  // state__OUR_NAKL: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // state_auth: state.auth,
  // state__OUR_NAKL: state.ourNakl,

  state__PRODUCT: state.product,
  state__CONTRACT: state.contract,
  state__FIRM: state.firm,
  state__GROUP_PRODUCT: state.groupProduct,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  add__OUR_NAKL,

  getAll__FIRM,
  getAll__CONTRACT,
  getAll__PRODUCT,
  getAll__GROUP_PRODUCT,
})(OurNaklAdd);
