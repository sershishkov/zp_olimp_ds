import React, { useEffect, useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  add__EQUIPMENT,
  getAll__EQUIPMENT,
  getOne__EQUIPMENT,
  update__EQUIPMENT,
  delete__EQUIPMENT,
} from '../../store/actions/referenceData/equipment';
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

const Equipment = ({
  add__EQUIPMENT,
  getAll__EQUIPMENT,
  getOne__EQUIPMENT,
  update__EQUIPMENT,
  delete__EQUIPMENT,

  getAll__UNIT,

  state__EQUIPMENT,
  state__UNIT,
}) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);

  const [formData, setFormData] = useState({
    name__Equipment: '',
    unit: '',
  });

  const { name__Equipment, unit } = formData;

  const [editId, setEditId] = useState('');
  const [buttonText, setButtonText] = useState('');

  const [name__EQUIPMENT_Helper, set_name__EQUIPMENT_Helper] = useState('');

  const clearFormData = () => {
    setFormData({
      name__Equipment: '',
      unit: '',
    });
    setEditId('');
  };

  useEffect(() => {
    getAll__EQUIPMENT();
    getAll__UNIT();

    clearFormData();

    return () => {
      clearFormData();
    };
  }, [getAll__EQUIPMENT, getAll__UNIT]);

  useLayoutEffect(() => {
    if (state__EQUIPMENT.one__EQUIPMENT) {
      // console.log(state__EQUIPMENT.one__EQUIPMENT);

      setFormData({
        name__Equipment: state__EQUIPMENT.one__EQUIPMENT.name__Equipment
          ? state__EQUIPMENT.one__EQUIPMENT.name__Equipment
          : '',
        unit: state__EQUIPMENT.one__EQUIPMENT.unit
          ? state__EQUIPMENT.one__EQUIPMENT.unit._id
          : '',
      });
    }
  }, [state__EQUIPMENT.one__EQUIPMENT]);

  const onDeleteItem = (id) => {
    delete__EQUIPMENT(id);
    setEditId('');
  };
  const onSubmit = () => {
    if (buttonText === 'Редактировать' && editId) {
      update__EQUIPMENT(editId, name__Equipment, unit);
    } else if (buttonText === 'Добавить') {
      add__EQUIPMENT(name__Equipment, unit);
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
    getOne__EQUIPMENT(id);
    setEditId(id);
    setButtonText('Редактировать');

    setOpenDialog(true);
  };

  const onChangeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });

    let valid;
    switch (event.target.id) {
      case 'name__Equipment':
        valid = event.target.value.length >= 3;
        if (!valid) {
          set_name__EQUIPMENT_Helper('Минимальная длина 3 знака');
        } else {
          set_name__EQUIPMENT_Helper('');
        }
        break;

      default:
        break;
    }
  };
  // console.log(state__EQUIPMENT.array__EQUIPMENT);
  const rows =
    state__EQUIPMENT.array__EQUIPMENT &&
    state__EQUIPMENT.array__EQUIPMENT.length > 0
      ? state__EQUIPMENT.array__EQUIPMENT.map((item) => {
          return {
            name__Equipment: item.name__Equipment,
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
        { title: 'Оборудование', field: 'name__Equipment' },
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
      <Tooltip title='Добавить оборудование'>
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
          Cписок оборудования
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
        <DialogTitle id='form-dialog-title'>Оборудование</DialogTitle>
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
                id='name__Equipment'
                name='name__Equipment'
                label='Оборудование'
                type='text'
                value={name__Equipment ? name__Equipment : ''}
                error={name__EQUIPMENT_Helper.length !== 0}
                helperText={name__EQUIPMENT_Helper}
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
              !name__Equipment || !unit || name__EQUIPMENT_Helper.length !== 0
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

Equipment.propTypes = {
  add__EQUIPMENT: PropTypes.func.isRequired,
  getAll__EQUIPMENT: PropTypes.func.isRequired,
  getOne__EQUIPMENT: PropTypes.func.isRequired,
  update__EQUIPMENT: PropTypes.func.isRequired,
  delete__EQUIPMENT: PropTypes.func.isRequired,

  getAll__UNIT: PropTypes.func.isRequired,

  // state_auth: PropTypes.object.isRequired,
  state__EQUIPMENT: PropTypes.object.isRequired,
  state__UNIT: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // state_auth: state.auth,
  state__EQUIPMENT: state.equipment,
  state__UNIT: state.unit,
});

export default connect(mapStateToProps, {
  add__EQUIPMENT,
  getAll__EQUIPMENT,
  getOne__EQUIPMENT,
  update__EQUIPMENT,
  delete__EQUIPMENT,

  getAll__UNIT,
})(Equipment);
