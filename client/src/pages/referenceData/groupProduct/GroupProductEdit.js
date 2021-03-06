import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../../store/actions/nameOfPage';
import {
  getOne__GROUP_PRODUCT,
  update__GROUP_PRODUCT,
} from '../../../store/actions/referenceData/groupProduct';

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

const GroupProductEdit = ({
  setNameOfPage,
  getOne__GROUP_PRODUCT,
  update__GROUP_PRODUCT,

  state__GROUP_PRODUCT,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name__Group_Product: '',
  });

  const { name__Group_Product } = formData;

  const [name__GROUP_PRODUCT_Helper, set_name__GROUP_PRODUCT_Helper] = useState(
    ''
  );

  const clearFormData = () => {
    setFormData({
      name__Group_Product: '',
    });
  };

  useEffect(() => {
    setNameOfPage('Редактировать группу');
    if (id) {
      getOne__GROUP_PRODUCT(id);
    }
    return () => {
      clearFormData();
    };
  }, [setNameOfPage, getOne__GROUP_PRODUCT, id]);

  useLayoutEffect(() => {
    if (state__GROUP_PRODUCT.one__GROUP_PRODUCT) {
      // console.log(state__GROUP_PRODUCT.one__GROUP_PRODUCT);

      setFormData({
        name__Group_Product: state__GROUP_PRODUCT.one__GROUP_PRODUCT
          .name__Group_Product
          ? state__GROUP_PRODUCT.one__GROUP_PRODUCT.name__Group_Product
          : '',
      });
    }
  }, [state__GROUP_PRODUCT.one__GROUP_PRODUCT]);

  const onSubmit = () => {
    update__GROUP_PRODUCT(id, name__Group_Product);

    clearFormData();
    history.goBack();
  };

  const onChangeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });

    let valid;
    switch (event.target.id) {
      case 'name__Group_Product':
        valid = event.target.value.length >= 3;
        if (!valid) {
          set_name__GROUP_PRODUCT_Helper('Минимальная длина 3 знака');
        } else {
          set_name__GROUP_PRODUCT_Helper('');
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
          Редактировать группу
        </Typography>
      </Grid>

      <Grid item className={classes.item}>
        <TextField
          autoFocus
          id='name__Group_Product'
          name='name__Group_Product'
          label='Группа работ'
          type='text'
          value={name__Group_Product ? name__Group_Product : ''}
          error={name__GROUP_PRODUCT_Helper.length !== 0}
          helperText={name__GROUP_PRODUCT_Helper}
          fullWidth
          autoComplete='text'
          onChange={(e) => onChangeHandler(e)}
        />
      </Grid>

      <Grid item className={classes.item}>
        <Button
          disabled={
            !name__Group_Product || name__GROUP_PRODUCT_Helper.length !== 0
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

GroupProductEdit.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getOne__GROUP_PRODUCT: PropTypes.func.isRequired,
  update__GROUP_PRODUCT: PropTypes.func.isRequired,

  // state_auth: PropTypes.object.isRequired,
  state__GROUP_PRODUCT: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // state_auth: state.auth,
  state__GROUP_PRODUCT: state.groupProduct,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getOne__GROUP_PRODUCT,
  update__GROUP_PRODUCT,
})(GroupProductEdit);
