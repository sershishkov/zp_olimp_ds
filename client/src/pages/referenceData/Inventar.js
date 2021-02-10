import React, { useEffect, useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  add__INVENTAR,
  getAll__INVENTAR,
  getOne__INVENTAR,
  update__INVENTAR,
  delete__INVENTAR,
} from '../../store/actions/referenceData/inventar';
import { getAll__UNIT } from '../../store/actions/referenceData/unit';

import MaterialTable from '../../components/MaterialTable';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Tooltip from '@material-ui/core/Tooltip';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import InputLabel from '@material-ui/core/InputLabel';

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

const Inventar = ({
  add__INVENTAR,
  getAll__INVENTAR,
  getOne__INVENTAR,
  update__INVENTAR,
  delete__INVENTAR,

  getAll__UNIT,

  state__INVENTAR,
  state__UNIT,
}) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);

  const [formData, setFormData] = useState({
    name__Inventar: '',
    unit: '',
  });

  const { name__Inventar, unit } = formData;

  const [editId, setEditId] = useState('');
  const [buttonText, setButtonText] = useState('');

  const [name__INVENTAR_Helper, set_name__INVENTAR_Helper] = useState('');

  const clearFormData = () => {
    setFormData({
      name__Inventar: '',
      unit: '',
    });
    setEditId('');
  };

  useEffect(() => {
    getAll__INVENTAR();
    getAll__UNIT();

    clearFormData();

    return () => {
      clearFormData();
    };
  }, [getAll__INVENTAR, getAll__UNIT]);

  useLayoutEffect(() => {
    if (state__INVENTAR.one__INVENTAR) {
      // console.log(state__INVENTAR.one__INVENTAR);

      setFormData({
        name__Inventar: state__INVENTAR.one__INVENTAR.name__Inventar
          ? state__INVENTAR.one__INVENTAR.name__Inventar
          : '',
        unit: state__INVENTAR.one__INVENTAR.unit
          ? state__INVENTAR.one__INVENTAR.unit._id
          : '',
      });
    }
  }, [state__INVENTAR.one__INVENTAR]);

  const onDeleteItem = (id) => {
    delete__INVENTAR(id);
    setEditId('');
  };
  const onSubmit = () => {
    if (buttonText === 'Редактировать' && editId) {
      update__INVENTAR(editId, name__Inventar, unit);
    } else if (buttonText === 'Добавить') {
      add__INVENTAR(name__Inventar, unit);
    }

    setOpenDialog(false);
    clearFormData();
    setEditId('');
  };

  const buttonAddHandler = () => {
    setOpenDialog(true);
    setButtonText('Добавить');
    setEditId('');
    clearFormData();
  };

  const buttonEditHandler = (id) => {
    getOne__INVENTAR(id);
    setEditId(id);
    setButtonText('Редактировать');

    setOpenDialog(true);
  };

  const onChangeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });

    let valid;
    switch (event.target.id) {
      case 'name__Inventar':
        valid = event.target.value.length >= 3;
        if (!valid) {
          set_name__INVENTAR_Helper('Минимальная длина 3 знака');
        } else {
          set_name__INVENTAR_Helper('');
        }
        break;

      default:
        break;
    }
  };
  // console.log(state__INVENTAR.array__INVENTAR);
  const rows =
    state__INVENTAR.array__INVENTAR &&
    state__INVENTAR.array__INVENTAR.length > 0
      ? state__INVENTAR.array__INVENTAR.map((item) => {
          return {
            name__Inventar: item.name__Inventar,
            unit: item.unit.name__Unit,

            edit: (
              <IconButton onClick={() => buttonEditHandler(item._id)}>
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
      title='Список работ'
      columns={[
        { title: 'Инвентарь', field: 'name__Inventar' },
        { title: 'Ед.изм', field: 'unit' },

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
      <Tooltip title='Добавить инвентарь'>
        <Fab
          color='secondary'
          aria-label='add'
          onClick={() => buttonAddHandler()}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <Grid item className={classes.item}>
        <Typography variant='h3' align='center'>
          Cписок инвентаря
        </Typography>
      </Grid>

      <Grid item className={classes.item}>
        {myMaterialTable}
      </Grid>
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          clearFormData();
        }}
        aria-labelledby='form-dialog-title'
        aria-describedby='alert-dialog-description'
        fullWidth
      >
        <DialogTitle id='form-dialog-title'>Инвентарь</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {buttonText ? buttonText : 'Поехали'}
          </DialogContentText>
          <Grid
            container
            direction='column'
            justify='flex-start'
            alignItems='center'
          >
            <Grid item className={classes.dialogItem}>
              <TextField
                autoFocus
                id='name__Inventar'
                name='name__Inventar'
                label='Инвентарь'
                type='text'
                value={name__Inventar ? name__Inventar : ''}
                error={name__INVENTAR_Helper.length !== 0}
                helperText={name__INVENTAR_Helper}
                fullWidth
                autoComplete='text'
                onChange={(e) => onChangeHandler(e)}
              />
            </Grid>

            <Grid item className={classes.dialogItem}>
              <InputLabel id='unit-label'>Единицы изм.</InputLabel>
              <Select
                labelId='unit-label'
                id='unit'
                name='unit'
                // multiple
                required
                fullWidth
                value={unit ? unit : ''}
                onChange={(e) => onChangeHandler(e)}
                className={classes.select}
              >
                {state__UNIT.array__UNIT &&
                  state__UNIT.array__UNIT.length > 0 &&
                  state__UNIT.array__UNIT.map((item) => (
                    <MenuItem
                      key={item._id}
                      value={item._id}
                      className={classes.selectItem}
                    >
                      {item.name__Unit}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            onClick={() => {
              setOpenDialog(false);
              clearFormData();
            }}
            color='primary'
          >
            Выход
          </Button>
          <Button
            disabled={
              !name__Inventar || !unit || name__INVENTAR_Helper.length !== 0
            }
            variant='contained'
            onClick={() => onSubmit()}
            color='primary'
          >
            {buttonText ? buttonText : 'Поехали'}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

Inventar.propTypes = {
  add__INVENTAR: PropTypes.func.isRequired,
  getAll__INVENTAR: PropTypes.func.isRequired,
  getOne__INVENTAR: PropTypes.func.isRequired,
  update__INVENTAR: PropTypes.func.isRequired,
  delete__INVENTAR: PropTypes.func.isRequired,

  getAll__UNIT: PropTypes.func.isRequired,

  // state_auth: PropTypes.object.isRequired,
  state__INVENTAR: PropTypes.object.isRequired,
  state__UNIT: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // state_auth: state.auth,
  state__INVENTAR: state.inventar,
  state__UNIT: state.unit,
});

export default connect(mapStateToProps, {
  add__INVENTAR,
  getAll__INVENTAR,
  getOne__INVENTAR,
  update__INVENTAR,
  delete__INVENTAR,

  getAll__UNIT,
})(Inventar);
