import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getAll__TYPE_FIRM,
  delete__TYPE_FIRM,
} from '../../../store/actions/referenceData/typeFirm';

import MaterialTable from '../../../components/MaterialTable';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Tooltip from '@material-ui/core/Tooltip';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: 'auto',
  },
  item: {
    width: '100%',
    marginBottom: '2em',
  },
  dialogItem: {
    width: '100%',
  },
}));

const TypeFirm = ({
  setNameOfPage,
  getAll__TYPE_FIRM,
  delete__TYPE_FIRM,

  state__TYPE_FIRM,
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Формы собственности');
    getAll__TYPE_FIRM();
  }, [setNameOfPage, getAll__TYPE_FIRM]);

  const onDeleteItem = (id) => {
    delete__TYPE_FIRM(id);
  };

  const rows =
    state__TYPE_FIRM.array__TYPE_FIRM &&
    state__TYPE_FIRM.array__TYPE_FIRM.length > 0
      ? state__TYPE_FIRM.array__TYPE_FIRM.map((item) => {
          return {
            name__Type_Firm: item.name__Type_Firm,
            short_name__Type_Firm: item.short_name__Type_Firm,

            edit: (
              <IconButton
                component={Link}
                href={`/reference-data/type-firm/${item._id}`}
              >
                <EditIcon color='primary' />
              </IconButton>
            ),
            delete: (
              <IconButton onClick={() => onDeleteItem(item._id)}>
                <DeleteForeverIcon color='error' />
              </IconButton>
            ),
          };
        })
      : [];

  //

  const myMaterialTable = (
    <MaterialTable
      title='Виды собственности'
      columns={[
        { title: 'Полное название', field: 'name__Type_Firm' },
        {
          title: 'Сокращенное название',
          field: 'short_name__Type_Firm',
          cellStyle: {
            width: 40,
            textAlign: 'center',
          },

          headerStyle: {
            width: 40,
            textAlign: 'center',
          },
          // columnStyle: {
          //   width: 40,
          //   textAlign: 'center',
          // },
        },

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
          // columnStyle: {
          //   width: '10%',
          //   textAlign: 'center',
          //   border: '1px solid #ff00ff',
          // },
        },
      ]}
      data={rows}
    />
  );

  return (
    <Grid container className={classes.root} direction='column'>
      <Tooltip title='Добавить форму собственности'>
        <Fab
          color='secondary'
          aria-label='add'
          component={Link}
          href={`/reference-data/type-firm/add`}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <Grid item className={classes.item}>
        <Typography variant='h3' align='center'>
          Cписок форм собственности
        </Typography>
      </Grid>

      <Grid item className={classes.item}>
        {myMaterialTable}
      </Grid>
    </Grid>
  );
};

TypeFirm.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,

  getAll__TYPE_FIRM: PropTypes.func.isRequired,
  delete__TYPE_FIRM: PropTypes.func.isRequired,

  // state_auth: PropTypes.object.isRequired,
  state__TYPE_FIRM: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // state_auth: state.auth,
  state__TYPE_FIRM: state.typeFirm,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll__TYPE_FIRM,
  delete__TYPE_FIRM,
})(TypeFirm);
