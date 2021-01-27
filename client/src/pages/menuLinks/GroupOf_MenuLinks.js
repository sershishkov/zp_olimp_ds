import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MaterialTable from '../../components/MaterialTable';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { setNameOfPage } from '../../store/actions/nameOfPage';
import {
  getAll__GROUP_OF_MENU_LINK,
  delete__GROUP_OF_MENU_LINK,
} from '../../store/actions/menuLink/group_of__menuLink';

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

const GroupOf_MenuLinks = ({
  setNameOfPage,
  getAll__GROUP_OF_MENU_LINK,
  delete__GROUP_OF_MENU_LINK,

  state_group_of__menuLink,
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('список групп страниц');
    getAll__GROUP_OF_MENU_LINK();
  }, [setNameOfPage, getAll__GROUP_OF_MENU_LINK]);

  const deleteHanler = (id) => {
    delete__GROUP_OF_MENU_LINK(id);
  };
  // console.log(state_group_of__menuLink.array__GROUP_OF_MENU_LINK);

  const rows = state_group_of__menuLink.array__GROUP_OF_MENU_LINK
    ? state_group_of__menuLink.array__GROUP_OF_MENU_LINK.map((item) => {
        return {
          name__Group_MenuLink: item.name__Group_MenuLink,
          allowedRoles: item.allowedRoles.join(', '),
          edit: (
            <IconButton component={Link} href={`/group-menu-links/${item._id}`}>
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
      title='список групп страниц'
      columns={[
        { title: 'Группа', field: 'name__Group_MenuLink' },
        { title: 'Роли', field: 'allowedRoles' },
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
      <Tooltip title='Добавить группу'>
        <Fab
          color='secondary'
          aria-label='add'
          component={Link}
          href='/group-menu-links/add'
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <Grid item className={classes.item}>
        <Typography variant='h3' align='center'>
          Cписок групп страниц
        </Typography>
      </Grid>

      <Grid item className={classes.item}>
        {myMaterialTable}
      </Grid>
    </Grid>
  );
};

GroupOf_MenuLinks.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll__GROUP_OF_MENU_LINK: PropTypes.func.isRequired,
  delete__GROUP_OF_MENU_LINK: PropTypes.func.isRequired,

  state_auth: PropTypes.object.isRequired,
  state_group_of__menuLink: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  state_auth: state.auth,
  state_group_of__menuLink: state.group_of__menuLink,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll__GROUP_OF_MENU_LINK,
  delete__GROUP_OF_MENU_LINK,
})(GroupOf_MenuLinks);
