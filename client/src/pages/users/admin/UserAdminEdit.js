import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../../store/actions/nameOfPage';
import {
  getOne__OUR_USER,
  update__OUR_USER,
} from '../../../store/actions/user/adminUsers/adminUsers';
import { roles } from '../../../utils/allOurPagesList';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1em',
    maxWidth: theme.breakpoints.width('sm'),
    margin: 'auto',
    // border: '1px solid #ff0000',
    paddingBottom: '5em',
  },
  item: {
    width: '100%',
    marginBottom: '2em',
  },
  itemSub: {
    marginBottom: '5em',
  },
  select: {
    height: '4rem',
  },
}));

const UserAdminEdit = ({
  setNameOfPage,
  getOne__OUR_USER,
  update__OUR_USER,

  state_adminUsers,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    password: '',
  });

  const [nameHelper, setNameHelper] = useState('');
  const [emailHelper, setEmailHelper] = useState('');
  const [passwordHelper, setPasswordHelper] = useState('');

  const { name, email, role, password } = formData;

  useEffect(() => {
    setNameOfPage('Добавить пользователя');
    getOne__OUR_USER(id);
  }, [setNameOfPage, getOne__OUR_USER, id]);

  useLayoutEffect(() => {
    if (state_adminUsers.one__OUR_USER) {
      setFormData({
        name: state_adminUsers.one__OUR_USER.name,
        email: state_adminUsers.one__OUR_USER.email,
        role: state_adminUsers.one__OUR_USER.role,
      });
    }
  }, [state_adminUsers]);

  const onChange = (e) => {
    let valid;
    // console.log(e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });

    switch (e.target.id) {
      case 'name':
        valid = e.target.value.length >= 3;
        if (!valid) {
          setNameHelper('Минимальная длина 3 знака');
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
        valid = e.target.value.length >= 3;
        if (!valid) {
          setPasswordHelper('Минимальная длина 6 знаков');
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

    // console.log(allowedRoles);
    update__OUR_USER(id, name, email, role, password);
    history.goBack();
  };

  return (
    <Grid
      className={classes.root}
      container
      direction='column'
      justify='flex-start'
      alignItems='center'
    >
      <Grid item className={classes.item}>
        <Typography variant='h3' align='center'>
          Редактировать пользователя
        </Typography>
      </Grid>
      <Grid item className={classes.item}>
        <form className={classes.form} noValidate onSubmit={(e) => onSubmit(e)}>
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
                label='Имя'
                name='name'
                autoComplete='text'
                value={name ? name : ''}
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
                label='Email'
                name='email'
                autoComplete='email'
                value={email ? email : ''}
                onChange={(e) => onChange(e)}
              />
            </Grid>

            <Grid item className={classes.itemSub}>
              <InputLabel id='roles-label'>Роли</InputLabel>
              <Select
                labelId='roles-label'
                id='role'
                name='role'
                // multiple
                required
                fullWidth
                value={role ? role : ''}
                onChange={onChange}
                input={<Input />}
                // renderValue={(selected) => selected.join(', ')}
                className={classes.select}
              >
                {roles.map((item) => (
                  <MenuItem key={item} value={item}>
                    <Checkbox checked={role && role.indexOf(item) > -1} />
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item className={classes.itemSub}>
              <TextField
                error={passwordHelper.length !== 0}
                helperText={passwordHelper}
                variant='outlined'
                type='password'
                required
                fullWidth
                id='password'
                label='Password'
                name='password'
                // autoComplete='text'
                value={password}
                onChange={(e) => onChange(e)}
              />
            </Grid>

            <Grid item className={classes.itemSub}>
              <Button
                disabled={
                  (name && name.length === 0) ||
                  (email && email.length === 0) ||
                  (role && role.length === 0) ||
                  (password && password.length === 0) ||
                  nameHelper.length !== 0 ||
                  emailHelper.length !== 0 ||
                  passwordHelper.length !== 0
                }
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Редактировать пользователя
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
                <Typography variant='body1'>Нечего редактировать?</Typography>
              </Grid>
              <Grid item>
                <Link
                  href='/user-admin'
                  variant='body2'
                  style={{ fontSize: '1.5rem' }}
                >
                  назад к списку
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
UserAdminEdit.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getOne__OUR_USER: PropTypes.func.isRequired,
  update__OUR_USER: PropTypes.func.isRequired,

  state_adminUsers: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // state_auth: state.auth,
  state_adminUsers: state.adminUsers,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getOne__OUR_USER,
  update__OUR_USER,
})(UserAdminEdit);
