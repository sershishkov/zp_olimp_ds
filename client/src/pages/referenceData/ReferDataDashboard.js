import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../store/actions/nameOfPage';
import { referenceDataLinks } from '../../utils/allOurPagesList';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/Inbox';

import Worker from './Worker';
import Unit from './Unit';
import TypeFirm from './TypeFirm';
import ServiceJob from './ServiceJob';
import Product from './Product';
import Inventar from './Inventar';
import Instrument from './Instrument';
import GroupServiceJob from './GroupServiceJob';
import GroupProduct from './GroupProduct';
import GroupExpense from './GroupExpense';
import Firm from './Firm';
import Expense from './Expense';
import Equipment from './Equipment';

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: '1em',
    maxWidth: theme.breakpoints.width('lg'),
    margin: 'auto',
    // border: '1px solid #ff0000',
  },
  itemMenu: {
    width: 250,
    // border: '1px solid #000000',
  },
  itemMainData: {
    // width: 'calc(100% - 300px)',
    // minWidth: 900,
    maxWidth: 800,
    margin: 'auto',
    // border: '1px solid #00ff00',
  },
  item: {
    width: '100%',
    // border: '1px solid #03ff30',
  },
}));

const ReferDataDashboard = ({ setNameOfPage, state_auth }) => {
  const classes = useStyles();

  const [myPage, setMyPage] = useState();
  // console.log(myPage);

  const handleMenuClick = (link) => {
    setMyPage(link);
  };

  const currentPage = () => {
    switch (myPage) {
      case 'Worker':
        return <Worker />;
      case 'Unit':
        return <Unit />;
      case 'TypeFirm':
        return <TypeFirm />;
      case 'ServiceJob':
        return <ServiceJob />;
      case 'Product':
        return <Product />;
      case 'Inventar':
        return <Inventar />;
      case 'Instrument':
        return <Instrument />;
      case 'GroupServiceJob':
        return <GroupServiceJob />;
      case 'GroupProduct':
        return <GroupProduct />;
      case 'GroupExpense':
        return <GroupExpense />;
      case 'Firm':
        return <Firm />;
      case 'Expense':
        return <Expense />;
      case 'Equipment':
        return <Equipment />;

      default:
        break;
    }
  };

  useEffect(() => {
    setNameOfPage('Cписок справочников');
  }, [setNameOfPage]);
  return (
    <Grid container className={classes.root} direction='row'>
      <Grid item className={classes.itemMenu}>
        <List className={classes.menuList}>
          {state_auth.isAuthenticated &&
            referenceDataLinks &&
            referenceDataLinks.map((item) => (
              <ListItem
                key={item.name__MenuLink}
                divider
                button
                className={classes.menuListItem}
                onClick={() => handleMenuClick(item.linkToPage)}
              >
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  className={classes.menuListItemText}
                >
                  {item.name__MenuLink}
                </ListItemText>
              </ListItem>
            ))}
        </List>
      </Grid>

      <Grid item className={classes.itemMainData}>
        <Grid
          container
          direction='column'
          justify='flex-start'
          alignItems='center'
          wrap='nowrap'
        >
          <Grid item>{myPage && currentPage()}</Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

ReferDataDashboard.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,

  state_auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  state_nameOfPage: state.nameOfPage,
  state_auth: state.auth,
});

export default connect(mapStateToProps, {
  setNameOfPage,
})(ReferDataDashboard);
