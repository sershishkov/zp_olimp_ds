import React, { useState, useEffect } from 'react';
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

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/Inbox';

import WorkIcon from '@material-ui/icons/Work';
import InfoIcon from '@material-ui/icons/Info';
import Hidden from '@material-ui/core/Hidden';
import Tooltip from '@material-ui/core/Tooltip';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';

import ExpandMore from '@material-ui/icons/ExpandMore';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import logo from '../images/LogotipDS.PNG';
import { Grid } from '@material-ui/core';
import {
  landingLinksList,
  adminLinks,
  accountantLinks,
} from '../utils/allOurPagesList';

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
  drawerItem: {},
  drawerItem_level2: {
    // marginLeft: '1rem',
  },
}));

const Header = ({
  state_nameOfPage,
  state_auth,

  logout,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [openDrawer, setOpenDrawer] = useState(false);

  const logoutHandler = () => {
    logout();
    history.push('/');
  };

  useEffect(() => {}, []);

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
              <InfoIcon />
            </ListItemIcon>
            <ListItemText disableTypography className={classes.drawerItem}>
              О нас
            </ListItemText>
          </ListItem>
        </List>

        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls={`panel-free-content`}
            id={`panel-free-header`}
            className={classes.accordionSummary}
          >
            <Typography className={classes.accordionSummaryHeading}>
              Наши работы
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.accordionSummaryDetails}>
            <List disablePadding className={classes.listAccoprdion}>
              {landingLinksList &&
                landingLinksList.map((option) => (
                  <ListItem
                    key={option.name__MenuLink}
                    component={Link}
                    to={option.linkToPage}
                    divider
                    button
                    onClick={() => {
                      setOpenDrawer(false);
                    }}
                  >
                    <ListItemIcon style={{ marginLeft: '1rem' }}>
                      <WorkIcon />
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      className={classes.drawerItem_level2}
                    >
                      {option.name__MenuLink}
                    </ListItemText>
                  </ListItem>
                ))}
            </List>
          </AccordionDetails>
        </Accordion>

        {state_auth.isAuthenticated && (
          // state_auth.user &&
          <Accordion className={classes.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls={`panel-admin-content`}
              id={`panel-admin-header`}
              className={classes.accordionSummary}
            >
              <Typography className={classes.accordionSummaryHeading}>
                Админка
              </Typography>
            </AccordionSummary>

            <AccordionDetails className={classes.accordionSummaryDetails}>
              <List disablePadding className={classes.listAccoprdion}>
                {adminLinks &&
                  adminLinks.map((option) => (
                    <ListItem
                      key={option.name__MenuLink}
                      component={Link}
                      to={option.linkToPage}
                      divider
                      button
                      onClick={() => {
                        setOpenDrawer(false);
                      }}
                    >
                      <ListItemIcon style={{ marginLeft: '1rem' }}>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText
                        disableTypography
                        className={classes.drawerItem_level2}
                      >
                        {option.name__MenuLink}
                      </ListItemText>
                    </ListItem>
                  ))}
              </List>
            </AccordionDetails>
          </Accordion>
        )}

        {state_auth.isAuthenticated && (
          <Accordion className={classes.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls={`panel-accountant-content`}
              id={`panel-accountant-header`}
              className={classes.accordionSummary}
            >
              <Typography className={classes.accordionSummaryHeading}>
                Бухгалтерия
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionSummaryDetails}>
              <List disablePadding className={classes.listAccoprdion}>
                {accountantLinks &&
                  accountantLinks.map((group) => (
                    <ListItem key={group.groupName} divider>
                      <ListItemIcon style={{ marginLeft: '1rem' }}>
                        <WorkIcon />
                      </ListItemIcon>
                      <ListItemText
                        disableTypography
                        className={classes.drawerItem_level2}
                      >
                        <Accordion className={classes.accordion}>
                          <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls={`panel-${group.groupName}-content`}
                            id={`panel-${group.groupName}-header`}
                            className={classes.accordionSummary}
                          >
                            <Typography
                              className={classes.accordionSummaryHeading}
                            >
                              {group.groupName}
                            </Typography>
                          </AccordionSummary>

                          <AccordionDetails
                            className={classes.accordionSummaryDetails}
                          >
                            <List
                              disablePadding
                              className={classes.listAccoprdion}
                            >
                              {group.links &&
                                group.links.map((option) => (
                                  <ListItem
                                    key={option.name__MenuLink}
                                    component={Link}
                                    to={option.linkToPage}
                                    divider
                                    button
                                    onClick={() => {
                                      setOpenDrawer(false);
                                    }}
                                  >
                                    <ListItemIcon
                                      style={{ marginLeft: '1rem' }}
                                    >
                                      <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                      disableTypography
                                      className={classes.drawerItem_level3}
                                    >
                                      {option.name__MenuLink}
                                    </ListItemText>
                                  </ListItem>
                                ))}
                            </List>
                          </AccordionDetails>
                        </Accordion>
                      </ListItemText>
                    </ListItem>
                  ))}
              </List>
            </AccordionDetails>
          </Accordion>
        )}
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

              <Hidden mdDown>
                <Grid item>
                  <Typography variant='h6' align='center'>
                    {state_nameOfPage.loading ? (
                      <CircularProgress />
                    ) : (
                      state_nameOfPage.pageName
                    )}
                  </Typography>
                </Grid>
              </Hidden>

              <Grid item>
                <Grid item>{drawer}</Grid>
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
  state_nameOfPage: PropTypes.object.isRequired,

  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  state_nameOfPage: state.nameOfPage,
  state_auth: state.auth,
});

export default connect(mapStateToProps, {
  logout,
})(Header);
