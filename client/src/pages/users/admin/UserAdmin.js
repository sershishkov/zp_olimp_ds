import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MaterialTable from '../../../components/MaterialTable';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { setNameOfPage } from '../../../store/actions/nameOfPage';
import {
  getAll__OUR_USER,
  delete__OUR_USER,
} from '../../../store/actions/user/adminUsers/adminUsers';

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
    width: '100%',
    // maxWidth: theme.breakpoints.width('md'),
    margin: 'auto',
    // border: '1px solid #ff0000',
  },
  item: {
    width: '100%',
    marginBottom: '2em',
  },
}));

const UserAdmin = ({
  setNameOfPage,
  getAll__OUR_USER,
  delete__OUR_USER,

  state_adminUsers,
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Список  пользователей');
    getAll__OUR_USER();
  }, [setNameOfPage, getAll__OUR_USER]);

  const deleteHanler = (id) => {
    delete__OUR_USER(id);
  };
  // console.log(state_adminUsers.array__OUR_USER);

  const rows =
    state_adminUsers.array__OUR_USER &&
    state_adminUsers.array__OUR_USER.length > 0
      ? state_adminUsers.array__OUR_USER.map((item) => {
          return {
            name: item.name,
            email: item.email,
            role: item.role,

            edit: (
              <IconButton component={Link} href={`/user-admin/${item._id}`}>
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
      title='Cписок пользователей'
      columns={[
        { title: 'Имя', field: 'name' },
        { title: 'Почта', field: 'email' },
        { title: 'Роль', field: 'role' },

        {
          title: 'Редактировать',
          field: 'edit',
          sorting: false,
          filtering: false,
          cellStyle: {
            width: '10%',
            textAlign: 'center',
            // border: '1px solid #ff0000',
          },

          headerStyle: {
            width: '10%',
            textAlign: 'center',
            // border: '1px solid #ffff00',
          },
          // columnStyle: {
          //   width: 40,
          //   textAlign: 'center',
          // },
        },
        {
          title: 'Удалить',
          field: 'delete',
          sorting: false,
          filtering: false,
          cellStyle: {
            width: '10%',
            textAlign: 'center',
            // border: '1px solid #ff0000',
          },

          headerStyle: {
            width: '10%',
            textAlign: 'center',
            // border: '1px solid #ffff00',
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
          href='/user-admin/add'
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <Grid item className={classes.item}>
        <Typography variant='h3' align='center'>
          Cписок пользователей
        </Typography>
      </Grid>

      <Grid item className={classes.item}>
        {myMaterialTable}
      </Grid>
    </Grid>
  );
};

UserAdmin.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll__OUR_USER: PropTypes.func.isRequired,
  delete__OUR_USER: PropTypes.func.isRequired,

  // state_auth: PropTypes.object.isRequired,
  state_adminUsers: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // state_auth: state.auth,
  state_adminUsers: state.adminUsers,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll__OUR_USER,
  delete__OUR_USER,
})(UserAdmin);
