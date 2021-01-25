import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../store/actions/user/auth/auth';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/Inbox';
import HomeIcon from '@material-ui/icons/Home';
import WorkIcon from '@material-ui/icons/Work';
import InfoIcon from '@material-ui/icons/Info';
import Hidden from '@material-ui/core/Hidden';
import Tooltip from '@material-ui/core/Tooltip';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';

import logo from '../images/LogotipDS.PNG';
import { Grid } from '@material-ui/core';
import { allOurPagesList } from '../utils/allOurPagesList';

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: '#e0e0e0',
    color: '#000',
    zIndex: theme.zIndex.modal + 1,
    marginBottom: '7em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em',
    },
  },
  logoImage: {
    height: '5em',
  },
  tabContainer: {
    marginLeft: 'auto',
  },
  listDrawer: {
    marginTop: '5em',
  },
  wrapPageName: {
    border: '1px solid #f00',
    margin: 'auto',
  },
  wrapPageNameTitle: {
    alignSelf: 'center',
  },
  nameOfPageTitle: {
    margin: 'auto',
  },
}));

const Header = ({ state_nameOfPage, state_auth, logout }) => {
  const classes = useStyles();
  const history = useHistory();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [openDrawer, setOpenDrawer] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuItemClick = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const logoutHandler = () => {
    logout();
    history.push('/');
  };

  const tabsOurFace = (
    <Grid container justify='flex-end' alignItems='center'>
      <Grid item>
        <Tooltip title='Домой'>
          <IconButton aria-label='home' component={Link} to='/'>
            <HomeIcon />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item>
        <IconButton
          aria-label='works'
          component={Link}
          to='/asfalt'
          aria-owns='menu-our-works-option'
          aria-haspopup={true}
          onMouseOver={(event) => handleClick(event)}
        >
          <WorkIcon />
        </IconButton>
      </Grid>
      <Grid item>
        <Tooltip title='О нас'>
          <IconButton aria-label='works' component={Link} to='/about'>
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title='Вход'>
          <IconButton
            aria-label='login'
            component={Link}
            to='/login'
            style={{
              display: state_auth.isAuthenticated ? 'none' : undefined,
            }}
          >
            <ExitToAppIcon />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title='Регистрация'>
          <IconButton
            aria-label='register'
            component={Link}
            to='/register'
            style={{
              display: state_auth.isAuthenticated ? 'none' : undefined,
            }}
          >
            <PersonAddIcon />
          </IconButton>
        </Tooltip>
      </Grid>

      <Grid item>
        <Tooltip title='Моя страница'>
          <Button
            component={Link}
            to='/user-detail'
            style={{
              display: state_auth.isAuthenticated ? undefined : 'none',
            }}
          >
            {state_auth.isAuthenticated && state_auth.user
              ? state_auth.user.name
              : 'моя страница'}
          </Button>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title='Выход'>
          <IconButton
            aria-label='logout'
            onClick={logoutHandler}
            style={{
              display: state_auth.isAuthenticated ? undefined : 'none',
            }}
          >
            <DirectionsRunIcon color='error' />
          </IconButton>
        </Tooltip>
      </Grid>

      <Menu
        id='menu-our-works-option'
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        classes={{ paper: classes.menu }}
        elevation={0}
        style={{ zIndex: 1302 }}
        keepMounted
      >
        {allOurPagesList
          .filter((page) => page.group === 'ourWorks')
          .map((option) => (
            <MenuItem
              key={option.pageName}
              onClick={() => {
                handleClose();
                handleMenuItemClick();
              }}
              component={Link}
              to={option.linkToPage}
              classes={{ root: classes.menuItem }}
            >
              {option.pageName}
            </MenuItem>
          ))}
      </Menu>
    </Grid>
  );
  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <List disablePadding className={classes.listDrawer}>
          <ListItem
            component={Link}
            to='/user-detail'
            divider
            button
            onClick={() => {
              setOpenDrawer(false);
            }}
            className={classes.drawerLogin}
            style={{
              display: state_auth.isAuthenticated ? undefined : 'none',
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon color='primary' />
            </ListItemIcon>
            <ListItemText disableTypography className={classes.drawerItem}>
              {state_auth.isAuthenticated && state_auth.user
                ? state_auth.user.name
                : 'моя страница'}
            </ListItemText>
          </ListItem>

          <ListItem
            component={Link}
            to='/login'
            divider
            button
            onClick={() => {
              setOpenDrawer(false);
            }}
            className={classes.drawerLogin}
            style={{
              display: state_auth.isAuthenticated ? 'none' : undefined,
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon color='primary' />
            </ListItemIcon>
            <ListItemText disableTypography className={classes.drawerItem}>
              Вход
            </ListItemText>
          </ListItem>

          <ListItem
            component={Link}
            to='/register'
            divider
            button
            onClick={() => {
              setOpenDrawer(false);
            }}
            className={classes.drawerRegister}
            style={{
              display: state_auth.isAuthenticated ? 'none' : undefined,
            }}
          >
            <ListItemIcon>
              <PersonAddIcon color='primary' />
            </ListItemIcon>
            <ListItemText disableTypography className={classes.drawerItem}>
              Регистрация
            </ListItemText>
          </ListItem>

          <ListItem
            divider
            button
            onClick={() => {
              setOpenDrawer(false);
              logoutHandler();
            }}
            className={classes.drawerLogout}
            style={{
              display: state_auth.isAuthenticated ? undefined : 'none',
            }}
          >
            <ListItemIcon>
              <DirectionsRunIcon color='error' />
            </ListItemIcon>
            <ListItemText disableTypography className={classes.drawerItem}>
              Выход
            </ListItemText>
          </ListItem>

          <ListItem
            component={Link}
            to='/about'
            divider
            button
            onClick={() => {
              setOpenDrawer(false);
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText disableTypography className={classes.drawerItem}>
              О нас
            </ListItemText>
          </ListItem>

          {allOurPagesList
            .filter((page) => page.group === 'ourWorks')
            .map((page) => (
              <ListItem
                key={page.pageName}
                component={Link}
                to={page.linkToPage}
                divider
                button
                onClick={() => {
                  setOpenDrawer(false);
                }}
              >
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText disableTypography className={classes.drawerItem}>
                  {page.pageName}
                </ListItemText>
              </ListItem>
            ))}

          {state_auth.isAuthenticated &&
            state_auth.user &&
            allOurPagesList
              .filter((page) =>
                page.allowedRoles.includes(state_auth.user.role)
              )
              .map((page) => (
                <ListItem
                  key={page.pageName}
                  component={Link}
                  to={page.linkToPage}
                  divider
                  button
                  onClick={() => {
                    setOpenDrawer(false);
                  }}
                >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    className={classes.drawerItem}
                  >
                    {page.pageName}
                  </ListItemText>
                </ListItem>
              ))}
        </List>
      </SwipeableDrawer>
      <Tooltip title='Меню'>
        <IconButton
          className={classes.drawerIconContainer}
          onClick={() => setOpenDrawer(!openDrawer)}
          disableRipple
        >
          <MenuIcon className={classes.drawerIcon} />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar className={classes.appbar}>
          <Toolbar disableGutters>
            <Grid container justify='space-between' alignItems='center'>
              <Grid item>
                <Grid container justify='flex-start'>
                  <Grid item>
                    <Tooltip title='Домой'>
                      <Button
                        className={classes.logoContainer}
                        component={Link}
                        to='/'
                        disableRipple
                      >
                        <img
                          src={logo}
                          alt='company logo'
                          className={classes.logoImage}
                        />
                      </Button>
                    </Tooltip>
                  </Grid>
                  <Grid item className={classes.wrapPageNameTitle}>
                    <Grid
                      container
                      justify='flex-start'
                      className={classes.wrapPageName1}
                    >
                      <Grid item className={classes.nameOfPageTitle}>
                        <Typography variant='h6' align='center'>
                          {state_nameOfPage.loading ? (
                            <CircularProgress />
                          ) : (
                            state_nameOfPage.pageName
                          )}
                        </Typography>
                      </Grid>
                      {/* <Hidden lgUp> */}
                      <Grid item>{drawer}</Grid>
                      {/* </Hidden> */}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Hidden mdDown>{tabsOurFace}</Hidden>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </React.Fragment>
  );
};

Header.propTypes = {
  state_auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  state_nameOfPage: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  state_nameOfPage: state.nameOfPage,
  state_auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
