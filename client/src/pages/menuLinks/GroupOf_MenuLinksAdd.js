import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../store/actions/nameOfPage';
import { add__GROUP_OF_MENU_LINK } from '../../store/actions/menuLink/group_of__menuLink';

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

const roles = [
  'user',
  'worker',
  'client',
  'partner',
  'seller',
  'engineer',
  'accountant',
  'manager',
  'boss',
  'admin',
];

const GroupOf_MenuLinksAdd = ({ setNameOfPage, add__GROUP_OF_MENU_LINK }) => {
  const classes = useStyles();
  const history = useHistory();

  const [formData, setFormData] = useState({
    name__Group_MenuLink: '',
    allowedRoles: [],
  });

  const [name__Group_MenuLinkHelper, setName__Group_MenuLinkHelper] = useState(
    ''
  );

  const { name__Group_MenuLink, allowedRoles } = formData;

  useEffect(() => {
    setNameOfPage('Редактировать группу');
  }, [setNameOfPage]);

  const onChange = (e) => {
    let valid;
    console.log(e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });

    switch (e.target.id) {
      case 'name__Group_MenuLink':
        valid = e.target.value.length >= 3;
        if (!valid) {
          setName__Group_MenuLinkHelper('Минимальная длина 3 знака');
        } else {
          setName__Group_MenuLinkHelper('');
        }
        break;

      default:
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let newAllowedRoles = allowedRoles;

    if (!allowedRoles.includes('admin')) {
      newAllowedRoles = [...allowedRoles, 'admin'];
    }

    console.log(allowedRoles);
    add__GROUP_OF_MENU_LINK(name__Group_MenuLink, newAllowedRoles);
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
          Добавить группу
        </Typography>
      </Grid>
      <Grid item className={classes.item}>
        {/* <FormControl className={classes.formControl}> */}
        <form className={classes.form} noValidate onSubmit={(e) => onSubmit(e)}>
          <Grid container direction='column' className={classes.wrapTextFields}>
            <Grid item className={classes.itemSub}>
              <TextField
                error={name__Group_MenuLinkHelper.length !== 0}
                helperText={name__Group_MenuLinkHelper}
                variant='outlined'
                type='text'
                required
                fullWidth
                id='name__Group_MenuLink'
                label='группа страниц'
                name='name__Group_MenuLink'
                autoComplete='text'
                value={name__Group_MenuLink}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item className={classes.itemSub}>
              <InputLabel id='allowed-roles-label'>Роли</InputLabel>
              <Select
                labelId='allowed-roles-label'
                id='allowedRoles'
                name='allowedRoles'
                multiple
                required
                fullWidth
                value={allowedRoles}
                onChange={onChange}
                input={<Input />}
                renderValue={(selected) => selected.join(', ')}
                className={classes.select}
              >
                {roles.map((role) => (
                  <MenuItem
                    key={role}
                    value={role}
                    // selected={role === 'admin'}
                    // disabled={role === 'admin'}
                  >
                    <Checkbox checked={allowedRoles.indexOf(role) > -1} />
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item className={classes.itemSub}>
              <Button
                disabled={
                  name__Group_MenuLink.length === 0 ||
                  allowedRoles.length === 0 ||
                  name__Group_MenuLinkHelper.length !== 0
                }
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Добавить группу
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
                <Typography variant='body1'>Нечего добавить?</Typography>
              </Grid>
              <Grid item>
                <Link
                  href='/group-menu-links'
                  variant='body2'
                  style={{ fontSize: '1.5rem' }}
                >
                  назад к списку
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
        {/* </FormControl> */}
      </Grid>
    </Grid>
  );
};
GroupOf_MenuLinksAdd.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  add__GROUP_OF_MENU_LINK: PropTypes.func.isRequired,
};
export default connect(null, { setNameOfPage, add__GROUP_OF_MENU_LINK })(
  GroupOf_MenuLinksAdd
);
