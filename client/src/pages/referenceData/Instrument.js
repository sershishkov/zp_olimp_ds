import React, { useEffect, useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  add__INSTRUMENT,
  getAll__INSTRUMENT,
  getOne__INSTRUMENT,
  update__INSTRUMENT,
  delete__INSTRUMENT,
} from '../../store/actions/referenceData/instrument';
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

const Instrument = ({
  add__INSTRUMENT,
  getAll__INSTRUMENT,
  getOne__INSTRUMENT,
  update__INSTRUMENT,
  delete__INSTRUMENT,

  getAll__UNIT,

  state__INSTRUMENT,
  state__UNIT,
}) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);

  const [formData, setFormData] = useState({
    name__Instrument: '',
    unit: '',
  });

  const { name__Instrument, unit } = formData;

  const [editId, setEditId] = useState('');
  const [buttonText, setButtonText] = useState('');

  const [name_INSTRUMENT_Helper, set_name_INSTRUMENT_Helper] = useState('');

  const clearFormData = () => {
    setFormData({
      name__Instrument: '',
      unit: '',
    });
    setEditId('');
  };

  useEffect(() => {
    getAll__INSTRUMENT();
    getAll__UNIT();

    clearFormData();

    return () => {
      clearFormData();
    };
  }, [getAll__INSTRUMENT, getAll__UNIT]);

  useLayoutEffect(() => {
    if (state__INSTRUMENT.one__INSTRUMENT) {
      // console.log(state__INSTRUMENT.one__INSTRUMENT);

      setFormData({
        name__Instrument: state__INSTRUMENT.one__INSTRUMENT.name__Instrument
          ? state__INSTRUMENT.one__INSTRUMENT.name__Instrument
          : '',
        unit: state__INSTRUMENT.one__INSTRUMENT.unit
          ? state__INSTRUMENT.one__INSTRUMENT.unit._id
          : '',
      });
    }
  }, [state__INSTRUMENT.one__INSTRUMENT]);

  const onDeleteItem = (id) => {
    delete__INSTRUMENT(id);
    setEditId('');
  };
  const onSubmit = () => {
    if (buttonText === 'Редактировать' && editId) {
      update__INSTRUMENT(editId, name__Instrument, unit);
    } else if (buttonText === 'Добавить') {
      add__INSTRUMENT(name__Instrument, unit);
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
    getOne__INSTRUMENT(id);
    setEditId(id);
    setButtonText('Редактировать');

    setOpenDialog(true);
  };

  const onChangeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });

    let valid;
    switch (event.target.id) {
      case 'name__Instrument':
        valid = event.target.value.length >= 3;
        if (!valid) {
          set_name_INSTRUMENT_Helper('Минимальная длина 3 знака');
        } else {
          set_name_INSTRUMENT_Helper('');
        }
        break;

      default:
        break;
    }
  };
  // console.log(state__INSTRUMENT.array__INSTRUMENT);
  const rows =
    state__INSTRUMENT.array__INSTRUMENT &&
    state__INSTRUMENT.array__INSTRUMENT.length > 0
      ? state__INSTRUMENT.array__INSTRUMENT.map((item) => {
          return {
            name__Instrument: item.name__Instrument,
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
      title='Список инструмента'
      columns={[
        { title: 'Инструмент', field: 'name__Instrument' },
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
      <Tooltip title='Добавить Инструмент'>
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
          Cписок Инструмента
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
        <DialogTitle id='form-dialog-title'>Инструмент</DialogTitle>
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
                id='name__Instrument'
                name='name__Instrument'
                label='Инструмент'
                type='text'
                value={name__Instrument ? name__Instrument : ''}
                error={name_INSTRUMENT_Helper.length !== 0}
                helperText={name_INSTRUMENT_Helper}
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
              !name__Instrument || !unit || name_INSTRUMENT_Helper.length !== 0
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

Instrument.propTypes = {
  add__INSTRUMENT: PropTypes.func.isRequired,
  getAll__INSTRUMENT: PropTypes.func.isRequired,
  getOne__INSTRUMENT: PropTypes.func.isRequired,
  update__INSTRUMENT: PropTypes.func.isRequired,
  delete__INSTRUMENT: PropTypes.func.isRequired,

  getAll__UNIT: PropTypes.func.isRequired,

  // state_auth: PropTypes.object.isRequired,
  state__INSTRUMENT: PropTypes.object.isRequired,
  state__UNIT: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // state_auth: state.auth,
  state__INSTRUMENT: state.instrument,
  state__UNIT: state.unit,
});

export default connect(mapStateToProps, {
  add__INSTRUMENT,
  getAll__INSTRUMENT,
  getOne__INSTRUMENT,
  update__INSTRUMENT,
  delete__INSTRUMENT,

  getAll__UNIT,
})(Instrument);
