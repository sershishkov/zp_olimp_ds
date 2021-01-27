import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../../store/actions/nameOfPage';
import { login } from '../../../store/actions/user/auth/auth';

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

const Login = ({ setNameOfPage, login, isAuthenticated }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [emailHelper, setEmailHelper] = useState('');
  const [passwordHelper, setPasswordHelper] = useState('');

  const { email, password } = formData;

  useEffect(() => {
    setNameOfPage('Вход');
  }, [setNameOfPage]);

  const onChange = (e) => {
    let valid;
    setFormData({ ...formData, [e.target.name]: e.target.value });

    switch (e.target.id) {
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

      case 'password':
        valid = e.target.value.length >= 6;
        if (!valid) {
          setPasswordHelper('Минимальная длинна пароля 6 знаков');
        } else {
          setPasswordHelper('');
        }
        break;

      default:
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let emailLowercase = email.toLowerCase();

    login(emailLowercase, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

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
          Вход
        </Typography>
      </Grid>

      <Grid item className={classes.item}>
        <form className={classes.form} noValidate onSubmit={(e) => onSubmit(e)}>
          <Grid container direction='column' className={classes.wrapTextFields}>
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
              <TextField
                error={passwordHelper.length !== 0}
                helperText={passwordHelper}
                variant='outlined'
                required
                fullWidth
                name='password'
                label='пароль'
                type='password'
                id='password'
                autoComplete='current-password'
                value={password}
                onChange={(e) => onChange(e)}
              />
            </Grid>

            <Grid item className={classes.itemSub}>
              <Button
                disabled={
                  email.length === 0 ||
                  password.length === 0 ||
                  emailHelper.length !== 0 ||
                  passwordHelper.length !== 0
                }
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Войти
              </Button>
            </Grid>
            <Grid
              item
              className={classes.itemSub}
              container
              justify='space-around'
              alignItems='center'
            >
              <Grid item>
                <Typography variant='body1'>
                  Еще не зарегестрированы?
                </Typography>
              </Grid>
              <Grid item>
                <Link
                  href='/register'
                  variant='body2'
                  style={{ fontSize: '1.5rem' }}
                >
                  Регистрация
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

Login.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setNameOfPage, login })(Login);
