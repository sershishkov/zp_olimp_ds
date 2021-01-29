import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MaterialTable from '../../components/MaterialTable';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { setNameOfPage } from '../../store/actions/nameOfPage';
import {
  getAll__MENU_LINK,
  delete__MENU_LINK,
} from '../../store/actions/menuLink/menuLink';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2em',
    maxWidth: theme.breakpoints.width('md'),
    margin: 'auto',
    // border: '1px solid #ff0000',
  },
  item: {
    width: '100%',
    marginBottom: '2em',
  },
}));

const MenuLink = ({
  setNameOfPage,
  getAll__MENU_LINK,
  delete__MENU_LINK,

  state_menuLink,
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('список  страниц');
    getAll__MENU_LINK();
  }, [setNameOfPage, getAll__MENU_LINK]);

  const deleteHanler = (id) => {
    delete__MENU_LINK(id);
  };
  // console.log(state_menuLink.array__MENU_LINK);

  const rows = state_menuLink.array__MENU_LINK
    ? state_menuLink.array__MENU_LINK.map((item) => {
        // console.log(item.group_Of_Page.name__Group_MenuLink);
        return {
          name__MenuLink: item.name__MenuLink,
          linkToPage: item.linkToPage,
          allowedRoles: item.allowedRoles.join(', '),
          group_Of_Page: item.group_Of_Page.name__Group_MenuLink,
          edit: (
            <IconButton component={Link} href={`/menu-links/${item._id}`}>
              <EditIcon color='primary' />
            </IconButton>
          ),
          delete: (
            <IconButton onClick={() => deleteHanler(item._id)}>
              <DeleteForeverIcon color='error' />
            </IconButton>
          ),
        };
      })
    : [];

  //

  const myMaterialTable = (
    <MaterialTable
      title='список  страниц'
      columns={[
        { title: 'Страница', field: 'name__MenuLink' },
        { title: 'Ссылка', field: 'linkToPage' },
        { title: 'Роли', field: 'allowedRoles' },
        { title: 'Группа страниц', field: 'group_Of_Page' },
        {
          title: 'Редактировать',
          field: 'edit',
          sorting: false,
          filtering: false,
          cellStyle: {
            width: 40,
            textAlign: 'center',
          },

          headerStyle: {
            width: 40,
            textAlign: 'center',
          },
          columnStyle: {
            width: 40,
            textAlign: 'center',
          },
        },
        {
          title: 'Удалить',
          field: 'delete',
          sorting: false,
          filtering: false,
          cellStyle: {
            width: 40,
            textAlign: 'center',
          },

          headerStyle: {
            width: 40,
            textAlign: 'center',
          },
          columnStyle: {
            width: 40,
            textAlign: 'center',
          },
        },
      ]}
      data={rows}
    />
  );

  return (
    <Grid container className={classes.root} direction='column'>
      <Tooltip title='Добавить страницу'>
        <Fab
          color='secondary'
          aria-label='add'
          component={Link}
          href='/menu-links/add'
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <Grid item className={classes.item}>
        <Typography variant='h3' align='center'>
          Cписок страниц
        </Typography>
      </Grid>

      <Grid item className={classes.item}>
        {myMaterialTable}
      </Grid>
    </Grid>
  );
};

MenuLink.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll__MENU_LINK: PropTypes.func.isRequired,
  delete__MENU_LINK: PropTypes.func.isRequired,

  state_auth: PropTypes.object.isRequired,
  state_menuLink: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  state_auth: state.auth,
  state_menuLink: state.menuLink,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll__MENU_LINK,
  delete__MENU_LINK,
})(MenuLink);
