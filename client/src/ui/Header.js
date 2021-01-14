import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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
import Hidden from '@material-ui/core/Hidden';
import logo from '../images/LogotipDS.PNG';
import { connect } from 'react-redux';

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
    marginBottom: '6em',
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
}));

const Header = ({ nameOfPage: { pageName, loading } }) => {
  const classes = useStyles();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [openDrawer, setOpenDrawer] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [value, setValue] = useState(0);

  const ourFaceRoutes = [
    { name: 'Домой', link: '/', activeIndex: 0 },
    {
      name: 'Наши работы',
      link: '/asfalt',
      activeIndex: 1,
      ariaOwns: anchorEl ? 'menu-our-works-option' : undefined,
      ariaPopup: anchorEl ? true : undefined,
      mouseOver: (event) => handleClick(event),
    },
    { name: 'О нас', link: '/about', activeIndex: 2 },
    // { name: 'Вход', link: '/login' },
    // { name: 'Регистрация', link: '/register' },
  ];

  const ourWorksOptions = [
    { name: 'Асфальтные работы', link: '/asfalt' },
    { name: 'Електро работы работы', link: '/electro' },
    { name: 'Цоколь и ливневки', link: '/ground-floor-storm-water' },
    { name: 'Высотные работы', link: '/high-altitude-work' },
    { name: 'Сантехнические работы', link: '/plumbing-work' },
    { name: 'крыльцо и козырьки', link: '/porch-and-visors' },
    { name: 'Ремонт подъездов', link: '/repair-of-entrance' },
    { name: 'Кровельные работы', link: '/roofing-work' },
    { name: 'Металлоконструкции', link: '/steel-structures' },
    { name: 'Окна Двери Пластиковые', link: '/windows-door-plastic' },
  ];

  const handleMenuItemClick = (event, index) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleClick = (event) => {
    // console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  useEffect(() => {
    ourFaceRoutes.forEach((route, index) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (value !== route.activeIndex) {
            setValue(route.activeIndex);
          }
          break;

        default:
          break;
      }
    });
  });

  const tabsOurFace = (
    <React.Fragment>
      <Tabs
        className={classes.tabContainer}
        indicatorColor='primary'
        value={value}
      >
        {ourFaceRoutes.map((route, index) => (
          <Tab
            key={route.name}
            className={classes.tab}
            component={Link}
            to={route.link}
            label={route.name}
            aria-owns={route.ariaOwns}
            aria-haspopup={route.ariaPopup}
            onMouseOver={route.mouseOver}
          />
        ))}
      </Tabs>
      <Button
        className={classes.button}
        variant='contained'
        component={Link}
        to='/login'
      >
        Вход
      </Button>
      <Button
        className={classes.button}
        variant='contained'
        component={Link}
        to='/register'
      >
        Регистрация
      </Button>

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
        {ourWorksOptions.map((option, index) => (
          <MenuItem
            key={option.name}
            onClick={(event) => {
              handleClose();
              handleMenuItemClick(event, index);
            }}
            component={Link}
            to={option.link}
            classes={{ root: classes.menuItem }}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
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
        // style={{ zIndex: 25000, marginTop: '7em' }}
      >
        <List disablePadding style={{ marginTop: '5em' }}>
          <ListItem
            component={Link}
            to='/login'
            divider
            button
            classes={{
              root: classes.drawerItemEstimate,
            }}
            onClick={() => {
              setOpenDrawer(false);
            }}
          >
            <ListItemIcon>
              <InboxIcon />
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
            classes={{
              root: classes.drawerItemEstimate,
            }}
            onClick={() => {
              setOpenDrawer(false);
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText disableTypography className={classes.drawerItem}>
              Регистрация
            </ListItemText>
          </ListItem>
          <ListItem
            component={Link}
            to='/about'
            divider
            button
            classes={{
              root: classes.drawerItemEstimate,
            }}
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

          {ourWorksOptions.map((route, index) => (
            <ListItem
              key={route.name}
              component={Link}
              to={route.link}
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
                {route.name}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar className={classes.appbar}>
          <Toolbar disableGutters>
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
            <Typography variant='h6' align='center'>
              {loading ? <CircularProgress /> : pageName}
            </Typography>

            <Hidden mdDown>{tabsOurFace}</Hidden>
            <Hidden lgUp>{drawer}</Hidden>

            {/* {matches ? drawer : tabs} */}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </React.Fragment>
  );
};

Header.propTypes = {
  // auth: PropTypes.object.isRequired,
  // logout: PropTypes.func.isRequired,
  nameOfPage: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // auth: state.auth,
  nameOfPage: state.nameOfPage,
});

export default connect(mapStateToProps)(Header);
