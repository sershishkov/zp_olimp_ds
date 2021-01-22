import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import logo from '../../../images/LogotipDS.PNG';

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: '3em',
    border: '1px solid #f00',
    maxWidth: theme.breakpoints.width('sm'),
    margin: 'auto',
  },
  avatar: {
    width: 130,
    height: 70,
    objectFit: 'cover',
  },
  item: {
    border: '1px solid #0f0',
    width: '100%',
    marginBottom: '2em',
  },
  form: {},
  itemSub: {
    border: '1px solid #00f',
    marginBottom: '1em',
  },
}));

const Register = ({ setNameOfPage, register, isAuthenticated }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [nameHelper, setNameHelper] = useState('');
  const [emailHelper, setEmailHelper] = useState('');
  const [passwordHelper, setPasswordHelper] = useState('');
  const [password2Helper, setPassword2Helper] = useState('');

  const { name, email, password, password2 } = formData;

  useEffect(() => {
    setNameOfPage('О нас');
  }, [setNameOfPage]);

  const onChange = (e) => {
    let valid;
    setFormData({ ...formData, [e.target.name]: e.target.value });

    switch (e.target.id) {
      case 'name':
        valid = e.target.value.length > 2;
        if (!valid) {
          setNameHelper('Слишком короткое Имя');
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

      case 'password':
        valid = e.target.value.length > 6;
        if (!valid) {
          setPasswordHelper('Минимальная длинна пароля 6 знаков');
        } else {
          setPasswordHelper('');
        }
        break;

      case 'password2':
        valid = e.target.value === password;
        if (!valid) {
          setPassword2Helper('Пароли не совпадают');
        } else {
          setPassword2Helper('');
        }
        break;

      default:
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    register({ name, email, password });
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
      <Grid item className={classes.item}>
        <Avatar
          variant='square'
          src={logo}
          className={classes.avatar}
          align='center'
        />
      </Grid>
      <Grid item className={classes.item}>
        <Typography variant='h3' align='center'>
          Register
        </Typography>
      </Grid>
      <Grid item className={classes.item}>
        <form className={classes.form} noValidate onSubmit={(e) => onSubmit(e)}>
          <Grid container direction='column' className={classes.wrapTextFields}>
            <Grid item className={classes.itemSub}>
              <TextField
                error={nameHelper.length !== 0}
                helperText={nameHelper}
                type='text'
                name='name'
                variant='outlined'
                required
                fullWidth
                id='name'
                label='Ваше Имя'
                autoFocus
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
              <TextField
                error={password2Helper.length !== 0}
                helperText={password2Helper}
                variant='outlined'
                required
                fullWidth
                name='password2'
                label='повторите пароль'
                type='password'
                id='password2'
                autoComplete='current-password'
                value={password2}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item className={classes.itemSub}>
              <Button
                disabled={
                  name.length === 0 ||
                  email.length === 0 ||
                  password.length === 0 ||
                  password2.length === 0 ||
                  nameHelper.length !== 0 ||
                  emailHelper.length !== 0 ||
                  passwordHelper.length !== 0 ||
                  password2Helper.length !== 0
                }
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                ЗАРЕГЕСТРИРОВАТСЯ
              </Button>
            </Grid>
            <Grid item className={classes.itemSub}>
              <Typography variant='body1' color='primary'>
                Уже зарегестрированы?{'   '}
                <Link href='/login' variant='body2'>
                  Войти
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

Register.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setNameOfPage })(Register);
