import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../../store/actions/nameOfPage';
import {
  updatedetails,
  updatepassword,
} from '../../../store/actions/user/auth/auth';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import logo from '../../../images/LogotipDS.PNG';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1em',
    maxWidth: theme.breakpoints.width('sm'),
    margin: 'auto',
  },
  imgLogo: {
    width: 130,
  },
  item: {
    width: '100%',
    marginBottom: '2em',
  },
  form: {},
  itemSub: {
    marginBottom: '1em',
  },
}));

const UserEditDetail = ({
  setNameOfPage,
  updatedetails,
  updatepassword,
  state_auth,
}) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    newPassword2: '',
  });
  const [nameHelper, setNameHelper] = useState('');
  const [emailHelper, setEmailHelper] = useState('');
  const [curentPasswordHelper, setCurrentPasswordHelper] = useState('');
  const [newPasswordHelper, setNewPasswordHelper] = useState('');
  const [newPassword2Helper, setNewPassword2Helper] = useState('');

  const { name, email, currentPassword, newPassword, newPassword2 } = formData;

  useEffect(() => {
    setNameOfPage('Моя страница');
  }, [setNameOfPage]);

  const onSubmitDetail = async (e) => {
    e.preventDefault();
    updatedetails(name, email);
    return <Redirect to='/' />;
  };

  const onSubmitPassword = async (e) => {
    e.preventDefault();
    updatepassword(currentPassword, newPassword);
    return <Redirect to='/' />;
  };

  const onChange = (e) => {
    let valid;
    setFormData({ ...formData, [e.target.name]: e.target.value });

    switch (e.target.id) {
      case 'name':
        valid = e.target.value.length >= 2;
        if (!valid) {
          setNameHelper('Минимальная длинна пароля 2 знака');
        } else {
          setNameHelper('');
        }
        break;

      case 'email':
        valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
          e.target.value
        );
        if (!valid) {
          setEmailHelper('Не верный email');
        } else {
          setEmailHelper('');
        }
        break;

      case 'currentPassword':
        valid = e.target.value.length >= 6;
        if (!valid) {
          setCurrentPasswordHelper('Минимальная длинна пароля 6 знаков');
        } else {
          setCurrentPasswordHelper('');
        }
        break;

      case 'newPasswordHelper':
        valid = e.target.value.length >= 6;
        if (!valid) {
          setNewPasswordHelper('Минимальная длинна пароля 6 знаков');
        } else {
          setNewPasswordHelper('');
        }
        break;

      case 'newPassword2':
        valid = e.target.value === newPassword;
        if (!valid) {
          setNewPassword2Helper('Новые пароли не совпадают');
        } else {
          setNewPassword2Helper('');
        }
        break;

      default:
        break;
    }
  };

  return (
    <Grid
      container
      className={classes.root}
      direction='column'
      justify='flex-start'
      alignItems='center'
    >
      <Grid item className={classes.item} container justify='center'>
        <img src={logo} alt='logo' className={classes.imgLogo} />
      </Grid>
      <Grid item className={classes.item}>
        <Typography variant='h3' align='center'>
          Моя страница
        </Typography>
      </Grid>

      <Grid item className={classes.item}>
        <form
          className={classes.form}
          noValidate
          onSubmit={(e) => onSubmitDetail(e)}
        >
          <Grid container direction='column' className={classes.wrapTextFields}>
            <Grid item className={classes.itemSub}>
              <TextField
                error={nameHelper.length !== 0}
                helperText={nameHelper}
                variant='outlined'
                type='text'
                required
                fullWidth
                id='name'
                label='Ваше Имя'
                name='name'
                autoComplete='name'
                value={name}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item className={classes.itemSub}>
              <TextField
                error={emailHelper.length !== 0}
                helperText={emailHelper}
                variant='outlined'
                type='email'
                required
                fullWidth
                id='email'
                label='Электронная почта'
                name='email'
                autoComplete='email'
                value={email}
                onChange={(e) => onChange(e)}
              />
            </Grid>

            <Grid item className={classes.itemSub}>
              <Button
                disabled={
                  email.length === 0 ||
                  name.length === 0 ||
                  emailHelper.length !== 0 ||
                  nameHelper.length !== 0
                }
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Редактировать
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>

      <Grid item className={classes.item}>
        <form
          className={classes.form}
          noValidate
          onSubmit={(e) => onSubmitPassword(e)}
        >
          <Grid container direction='column' className={classes.wrapTextFields}>
            <Grid item className={classes.itemSub}>
              <TextField
                error={curentPasswordHelper.length !== 0}
                helperText={curentPasswordHelper}
                variant='outlined'
                required
                fullWidth
                name='currentPassword'
                label='Старый пароль'
                type='password'
                id='currentPassword'
                autoComplete='current-password'
                value={currentPassword}
                onChange={(e) => onChange(e)}
              />
            </Grid>

            <Grid item className={classes.itemSub}>
              <TextField
                error={newPasswordHelper.length !== 0}
                helperText={newPasswordHelper}
                variant='outlined'
                required
                fullWidth
                name='newPassword'
                label='Новый пароль'
                type='password'
                id='newPassword'
                autoComplete='current-password'
                value={newPassword}
                onChange={(e) => onChange(e)}
              />
            </Grid>

            <Grid item className={classes.itemSub}>
              <TextField
                error={newPassword2Helper.length !== 0}
                helperText={newPassword2Helper}
                variant='outlined'
                required
                fullWidth
                name='newPassword2'
                label='повторите новый пароль'
                type='password'
                id='newPassword2'
                autoComplete='current-password'
                value={newPassword2}
                onChange={(e) => onChange(e)}
              />
            </Grid>

            <Grid item className={classes.itemSub}>
              <Button
                disabled={
                  currentPassword.length === 0 ||
                  newPassword.length === 0 ||
                  newPassword2.length === 0 ||
                  curentPasswordHelper.length !== 0 ||
                  newPasswordHelper.length !== 0 ||
                  newPassword2Helper.length !== 0
                }
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Редактировать
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Grid item className={classes.item}>
        <Grid container justify='space-between' alignItems='center'>
          <Grid item>
            <Typography variant='h4'>Передумал? </Typography>
          </Grid>
          <Grid item component={Link} href='/'>
            <Typography variant='h4'>Пошли на главную.</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

UserEditDetail.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  updatedetails: PropTypes.func.isRequired,
  updatepassword: PropTypes.func.isRequired,

  state_auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  state_auth: state.auth,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  updatedetails,
  updatepassword,
})(UserEditDetail);
