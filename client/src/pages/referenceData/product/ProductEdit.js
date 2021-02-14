import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../../store/actions/nameOfPage';
import {
  getOne__PRODUCT,
  update__PRODUCT,
} from '../../../store/actions/referenceData/product';
import { getAll__UNIT } from '../../../store/actions/referenceData/unit';
import { getAll__GROUP_PRODUCT } from '../../../store/actions/referenceData/groupProduct';

import Fab from '@material-ui/core/Fab';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
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

const ProductEdit = ({
  setNameOfPage,
  getOne__PRODUCT,
  update__PRODUCT,

  getAll__UNIT,
  getAll__GROUP_PRODUCT,

  state__PRODUCT,
  state__UNIT,
  state__GROUP_PRODUCT,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name__Product: '',
    unit: '',
    group_Product: '',
    enteredPrice: '',
    sellingPrice: '',
    amountInPackage: '',
    expenseFor: '',
    length: '',
    width: '',
    height: '',
    weight: '',
  });

  const {
    name__Product,
    unit,
    group_Product,
    enteredPrice,
    sellingPrice,
    amountInPackage,
    expenseFor,
    length,
    width,
    height,
    weight,
  } = formData;

  const [name__PRODUCT_Helper, set_name__PRODUCT_Helper] = useState('');
  const [enteredPrice_Helper, set_enteredPrice_Helper] = useState('');
  const [sellingPrice_Helper, set_sellingPrice_Helper] = useState('');
  const [amountInPackage_Helper, set_amountInPackage_Helper] = useState('');
  const [expenseFor_Helper, set_expenseFor_Helper] = useState('');
  const [length_Helper, set_length_Helper] = useState('');
  const [width_Helper, set_width_Helper] = useState('');
  const [height_Helper, set_height_Helper] = useState('');
  const [weight_Helper, set_weight_Helper] = useState('');

  const clearFormData = () => {
    setFormData({
      name__Product: '',
      unit: '',
      group_Product: '',
      enteredPrice: '',
      sellingPrice: '',
      amountInPackage: '',
      expenseFor: '',
      length: '',
      width: '',
      height: '',
      weight: '',
    });
  };

  useEffect(() => {
    setNameOfPage('Редактировать товар');
    getAll__UNIT();
    getAll__GROUP_PRODUCT();

    if (id) {
      getOne__PRODUCT(id);
    }

    clearFormData();

    return () => {
      clearFormData();
    };
  }, [setNameOfPage, getAll__UNIT, getAll__GROUP_PRODUCT, getOne__PRODUCT, id]);

  useLayoutEffect(() => {
    if (state__PRODUCT.one__PRODUCT) {
      // console.log(state__PRODUCT.one__PRODUCT);
      setFormData({
        name__Product: state__PRODUCT.one__PRODUCT.name__Product
          ? state__PRODUCT.one__PRODUCT.name__Product
          : '',
        unit: state__PRODUCT.one__PRODUCT.unit
          ? state__PRODUCT.one__PRODUCT.unit._id
          : '',
        group_Product: state__PRODUCT.one__PRODUCT.group_Product
          ? state__PRODUCT.one__PRODUCT.group_Product._id
          : '',
        enteredPrice: state__PRODUCT.one__PRODUCT.enteredPrice
          ? state__PRODUCT.one__PRODUCT.enteredPrice
          : '',
        sellingPrice: state__PRODUCT.one__PRODUCT.sellingPrice
          ? state__PRODUCT.one__PRODUCT.sellingPrice
          : '',
        amountInPackage: state__PRODUCT.one__PRODUCT.amountInPackage
          ? state__PRODUCT.one__PRODUCT.amountInPackage
          : '',
        expenseFor: state__PRODUCT.one__PRODUCT.expenseFor
          ? state__PRODUCT.one__PRODUCT.expenseFor
          : '',
        length: state__PRODUCT.one__PRODUCT.length
          ? state__PRODUCT.one__PRODUCT.length
          : '',
        width: state__PRODUCT.one__PRODUCT.width
          ? state__PRODUCT.one__PRODUCT.width
          : '',
        height: state__PRODUCT.one__PRODUCT.height
          ? state__PRODUCT.one__PRODUCT.height
          : '',
        weight: state__PRODUCT.one__PRODUCT.weight
          ? state__PRODUCT.one__PRODUCT.weight
          : '',
      });
    }
  }, [state__PRODUCT.one__PRODUCT]);

  const onSubmit = () => {
    update__PRODUCT(
      id,
      name__Product,
      unit,
      group_Product,
      enteredPrice,
      sellingPrice,
      amountInPackage,
      expenseFor,
      length,
      width,
      height,
      weight
    );

    clearFormData();
    history.goBack();
  };

  const onChangeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });

    let valid;
    switch (event.target.id) {
      case 'name__Product':
        valid = event.target.value.length >= 3;
        if (!valid) {
          set_name__PRODUCT_Helper('Минимальная длина 3 знака');
        } else {
          set_name__PRODUCT_Helper('');
        }
        break;
      case 'enteredPrice':
        valid = event.target.value.length >= 1;
        if (!valid) {
          set_enteredPrice_Helper('Минимальная длина 1 цифра');
        } else {
          set_enteredPrice_Helper('');
        }
        break;

      case 'sellingPrice':
        valid = event.target.value.length >= 1;
        if (!valid) {
          set_sellingPrice_Helper('Минимальная длина 1 цифра');
        } else {
          set_sellingPrice_Helper('');
        }
        break;

      case 'amountInPackage':
        valid = event.target.value.length >= 1;
        if (!valid) {
          set_amountInPackage_Helper('Минимальная длина 1 цифра');
        } else {
          set_amountInPackage_Helper('');
        }
        break;

      case 'expenseFor':
        valid = event.target.value.length >= 1;
        if (!valid) {
          set_expenseFor_Helper('Минимальная длина 1 цифра');
        } else {
          set_expenseFor_Helper('');
        }
        break;

      case 'length':
        valid = event.target.value.length >= 1;
        if (!valid) {
          set_length_Helper('Минимальная длина 1 цифра');
        } else {
          set_length_Helper('');
        }
        break;
      case 'width':
        valid = event.target.value.length >= 1;
        if (!valid) {
          set_width_Helper('Минимальная длина 1 цифра');
        } else {
          set_width_Helper('');
        }
        break;
      case 'height':
        valid = event.target.value.length >= 1;
        if (!valid) {
          set_height_Helper('Минимальная длина 1 цифра');
        } else {
          set_height_Helper('');
        }
        break;
      case 'weight':
        valid = event.target.value.length >= 1;
        if (!valid) {
          set_weight_Helper('Минимальная длина 1 цифра');
        } else {
          set_weight_Helper('');
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
          Редактировать товар
        </Typography>
      </Grid>

      <Grid item className={classes.item}>
        <TextField
          autoFocus
          id='name__Product'
          name='name__Product'
          label='Товар'
          type='text'
          value={name__Product ? name__Product : ''}
          error={name__PRODUCT_Helper.length !== 0}
          helperText={name__PRODUCT_Helper}
          fullWidth
          autoComplete='text'
          onChange={(e) => onChangeHandler(e)}
        />
      </Grid>
      <Grid item className={classes.item}>
        <InputLabel id='unit-label'>Единицы изм.</InputLabel>
        <Select
          labelId='unit-label'
          id='unit'
          name='unit'
          // multiple
          required
          fullWidth
          value={unit ? unit : ''}
          onChange={(e) => onChangeHandler(e)}
          className={classes.select}
        >
          {state__UNIT.array__UNIT &&
            state__UNIT.array__UNIT.length > 0 &&
            state__UNIT.array__UNIT.map((item) => (
              <MenuItem
                key={item._id}
                value={item._id}
                className={classes.selectItem}
              >
                {item.name__Unit}
              </MenuItem>
            ))}
        </Select>
      </Grid>
      <Grid item className={classes.item}>
        <InputLabel id='group_Product-label'>Группа товаров</InputLabel>
        <Select
          labelId='group_Product-label'
          id='group_Product'
          name='group_Product'
          // multiple
          required
          fullWidth
          value={group_Product ? group_Product : ''}
          onChange={(e) => onChangeHandler(e)}
          className={classes.select}
        >
          {state__GROUP_PRODUCT.array__GROUP_PRODUCT &&
            state__GROUP_PRODUCT.array__GROUP_PRODUCT.length > 0 &&
            state__GROUP_PRODUCT.array__GROUP_PRODUCT.map((item) => (
              <MenuItem
                key={item._id}
                value={item._id}
                className={classes.selectItem}
              >
                {item.name__Group_Product}
              </MenuItem>
            ))}
        </Select>
      </Grid>

      <Grid item className={classes.item}>
        <TextField
          // autoFocus
          id='enteredPrice'
          name='enteredPrice'
          label='Закупочная цена'
          type='number'
          value={enteredPrice ? enteredPrice : ''}
          error={enteredPrice_Helper.length !== 0}
          helperText={enteredPrice_Helper}
          fullWidth
          // autoComplete='text'
          onChange={(e) => onChangeHandler(e)}
        />
      </Grid>

      <Grid item className={classes.item}>
        <TextField
          // autoFocus
          id='sellingPrice'
          name='sellingPrice'
          label='Рекоменд. цена продажи'
          type='number'
          value={sellingPrice ? sellingPrice : ''}
          error={sellingPrice_Helper.length !== 0}
          helperText={sellingPrice_Helper}
          fullWidth
          // autoComplete='text'
          onChange={(e) => onChangeHandler(e)}
        />
      </Grid>

      <Grid item className={classes.item}>
        <TextField
          // autoFocus
          id='amountInPackage'
          name='amountInPackage'
          label='Кол-во в упаковке'
          type='number'
          value={amountInPackage ? amountInPackage : ''}
          error={amountInPackage_Helper.length !== 0}
          helperText={amountInPackage_Helper}
          fullWidth
          // autoComplete='text'
          onChange={(e) => onChangeHandler(e)}
        />
      </Grid>
      <Grid item className={classes.item}>
        <TextField
          // autoFocus
          id='expenseFor'
          name='expenseFor'
          label='Расход на еденицу'
          type='number'
          value={expenseFor ? expenseFor : ''}
          error={expenseFor_Helper.length !== 0}
          helperText={expenseFor_Helper}
          fullWidth
          // autoComplete='text'
          onChange={(e) => onChangeHandler(e)}
        />
      </Grid>
      <Grid item className={classes.item}>
        <TextField
          // autoFocus
          id='length'
          name='length'
          label='Длина (м)'
          type='number'
          value={length ? length : ''}
          error={length_Helper.length !== 0}
          helperText={length_Helper}
          fullWidth
          // autoComplete='text'
          onChange={(e) => onChangeHandler(e)}
        />
      </Grid>
      <Grid item className={classes.item}>
        <TextField
          // autoFocus
          id='width'
          name='width'
          label='Ширина (м)'
          type='number'
          value={width ? width : ''}
          error={width_Helper.length !== 0}
          helperText={width_Helper}
          fullWidth
          // autoComplete='text'
          onChange={(e) => onChangeHandler(e)}
        />
      </Grid>
      <Grid item className={classes.item}>
        <TextField
          // autoFocus
          id='height'
          name='height'
          label='Высота (м)'
          type='number'
          value={height ? height : ''}
          error={height_Helper.length !== 0}
          helperText={height_Helper}
          fullWidth
          // autoComplete='text'
          onChange={(e) => onChangeHandler(e)}
        />
      </Grid>
      <Grid item className={classes.item}>
        <TextField
          // autoFocus
          id='weight'
          name='weight'
          label='Вес (кг)'
          type='number'
          value={weight ? weight : ''}
          error={weight_Helper.length !== 0}
          helperText={weight_Helper}
          fullWidth
          // autoComplete='text'
          onChange={(e) => onChangeHandler(e)}
        />
      </Grid>
      <Grid item className={classes.item}>
        <Button
          disabled={
            !name__Product ||
            !unit ||
            !group_Product ||
            !enteredPrice ||
            // !amountInPackage ||
            // !expenseFor ||
            // !length ||
            // !width ||
            // !height ||
            // !weight ||
            name__PRODUCT_Helper.length !== 0 ||
            enteredPrice_Helper.length !== 0 ||
            amountInPackage_Helper.length !== 0 ||
            expenseFor_Helper.length !== 0 ||
            length_Helper.length !== 0 ||
            width_Helper.length !== 0 ||
            height_Helper.length !== 0 ||
            weight_Helper.length !== 0
          }
          fullWidth
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

ProductEdit.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getOne__PRODUCT: PropTypes.func.isRequired,
  update__PRODUCT: PropTypes.func.isRequired,

  getAll__UNIT: PropTypes.func.isRequired,
  getAll__GROUP_PRODUCT: PropTypes.func.isRequired,

  // state_auth: PropTypes.object.isRequired,
  state__PRODUCT: PropTypes.object.isRequired,
  state__UNIT: PropTypes.object.isRequired,
  state__GROUP_PRODUCT: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // state_auth: state.auth,
  state__PRODUCT: state.product,

  state__UNIT: state.unit,
  state__GROUP_PRODUCT: state.groupProduct,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getOne__PRODUCT,
  update__PRODUCT,

  getAll__UNIT,
  getAll__GROUP_PRODUCT,
})(ProductEdit);
