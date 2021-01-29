import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../store/actions/nameOfPage';
import { add__MENU_LINK } from '../../store/actions/menuLink/menuLink';
import { getAll__GROUP_OF_MENU_LINK } from '../../store/actions/menuLink/group_of__menuLink';
import { roles } from '../../utils/allOurPagesList';

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

const MenuLinkAdd = ({
  setNameOfPage,
  add__MENU_LINK,
  getAll__GROUP_OF_MENU_LINK,

  state_group_of__menuLink,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const [formData, setFormData] = useState({
    name__MenuLink: '',
    linkToPage: '',
    allowedRoles: [],
    group_Of_Page: '',
  });

  const [name__MenuLinkHelper, setName__MenuLinkHelper] = useState('');
  const [linkToPageHelper, setLinkToPageHelper] = useState('');

  const { name__MenuLink, linkToPage, allowedRoles, group_Of_Page } = formData;

  useEffect(() => {
    setNameOfPage('Добавить страницу');
    getAll__GROUP_OF_MENU_LINK();
  }, [setNameOfPage, getAll__GROUP_OF_MENU_LINK]);

  const onChange = (e) => {
    let valid;
    // console.log(e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });

    switch (e.target.id) {
      case 'name__MenuLink':
        valid = e.target.value.length >= 3;
        if (!valid) {
          setName__MenuLinkHelper('Минимальная длина 3 знака');
        } else {
          setName__MenuLinkHelper('');
        }
        break;

      case 'linkToPage':
        valid = e.target.value.length >= 3;
        if (!valid) {
          setLinkToPageHelper('Минимальная длина 3 знака');
        } else {
          setLinkToPageHelper('');
        }
        break;

      default:
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let newAllowedRoles = [...allowedRoles];

    if (!allowedRoles.includes('admin')) {
      newAllowedRoles = [...allowedRoles, 'admin'];
    }

    // console.log(allowedRoles);
    add__MENU_LINK(name__MenuLink, linkToPage, newAllowedRoles, group_Of_Page);
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
          Добавить страницу
        </Typography>
      </Grid>
      <Grid item className={classes.item}>
        <form className={classes.form} noValidate onSubmit={(e) => onSubmit(e)}>
          <Grid container direction='column' className={classes.wrapTextFields}>
            <Grid item className={classes.itemSub}>
              <TextField
                error={name__MenuLinkHelper.length !== 0}
                helperText={name__MenuLinkHelper}
                variant='outlined'
                type='text'
                required
                fullWidth
                id='name__MenuLink'
                label='Cтраница'
                name='name__MenuLink'
                autoComplete='text'
                value={name__MenuLink}
                onChange={(e) => onChange(e)}
              />
            </Grid>

            <Grid item className={classes.itemSub}>
              <TextField
                error={linkToPageHelper.length !== 0}
                helperText={linkToPageHelper}
                variant='outlined'
                type='text'
                required
                fullWidth
                id='linkToPage'
                label='Ссылка'
                name='linkToPage'
                autoComplete='text'
                value={linkToPage}
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
                  <MenuItem key={role} value={role}>
                    <Checkbox checked={allowedRoles.indexOf(role) > -1} />
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item className={classes.itemSub}>
              <InputLabel id='group-menu-label'>Группы</InputLabel>
              <Select
                labelId='group-menu-label'
                id='group_Of_Page'
                name='group_Of_Page'
                // multiple
                required
                fullWidth
                value={group_Of_Page}
                onChange={onChange}
                input={<Input />}
                // renderValue={(selected) => selected.join(', ')}
                className={classes.select}
              >
                {state_group_of__menuLink.array__GROUP_OF_MENU_LINK &&
                  state_group_of__menuLink.array__GROUP_OF_MENU_LINK.map(
                    (item) => (
                      <MenuItem key={item._id} value={item._id}>
                        <Checkbox
                          checked={group_Of_Page.indexOf(item._id) > -1}
                        />
                        {item.name__Group_MenuLink}
                      </MenuItem>
                    )
                  )}
              </Select>
            </Grid>

            <Grid item className={classes.itemSub}>
              <Button
                disabled={
                  name__MenuLink.length === 0 ||
                  linkToPage.length === 0 ||
                  allowedRoles.length === 0 ||
                  group_Of_Page.length === 0 ||
                  name__MenuLinkHelper.length !== 0 ||
                  linkToPageHelper.length !== 0
                }
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Добавить страницу
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
                  href='/menu-links'
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
MenuLinkAdd.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  add__MENU_LINK: PropTypes.func.isRequired,
  getAll__GROUP_OF_MENU_LINK: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  // state_auth: state.auth,
  state_group_of__menuLink: state.group_of__menuLink,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  add__MENU_LINK,
  getAll__GROUP_OF_MENU_LINK,
})(MenuLinkAdd);
