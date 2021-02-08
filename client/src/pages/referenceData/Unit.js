import React, { useEffect, useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MaterialTable from '../../components/MaterialTable';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import {
  add__UNIT,
  getAll__UNIT,
  getOne__UNIT,
  update__UNIT,
  delete__UNIT,
} from '../../store/actions/referenceData/unit';

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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: 'auto',
  },
  item: {
    width: '100%',
    marginBottom: '2em',
  },
}));

const Unit = ({
  add__UNIT,
  getAll__UNIT,
  getOne__UNIT,
  update__UNIT,
  delete__UNIT,

  state__UNIT,
}) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [name__Unit, setName__Unit] = useState('');
  const [editId, setEditId] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [name__UnitHelper, setName__UnitHelper] = useState('');

  useEffect(() => {
    getAll__UNIT();
  }, [getAll__UNIT]);

  useLayoutEffect(() => {
    if (state__UNIT.one__UNIT) {
      setName__Unit(state__UNIT.one__UNIT.name__Unit);
    }
  }, [state__UNIT.one__UNIT]);

  const onDeleteItem = (id) => {
    delete__UNIT(id);
    setEditId('');
  };
  const onSubmit = () => {
    if (buttonText === 'Редактировать' && editId && name__Unit) {
      update__UNIT(editId, name__Unit);
    } else if (buttonText === 'Добавить' && name__Unit) {
      add__UNIT(name__Unit);
    }

    setOpenDialog(false);
    setName__Unit('');
    setEditId('');
  };

  const buttonAddHandler = () => {
    setOpenDialog(true);
    setButtonText('Добавить');
    setEditId('');
    setName__Unit('');
  };

  const buttonEditHandler = (id) => {
    getOne__UNIT(id);
    setEditId(id);
    setButtonText('Редактировать');
    setOpenDialog(true);
  };

  const onChangehandler = (event) => {
    setName__Unit(event.target.value);

    let valid;
    switch (event.target.id) {
      case 'name__Unit':
        valid = event.target.value.length >= 3;
        if (!valid) {
          setName__UnitHelper('Минимальная длина 3 знака');
        } else {
          setName__UnitHelper('');
        }
        break;

      default:
        break;
    }
  };

  const rows =
    state__UNIT.array__UNIT && state__UNIT.array__UNIT.length > 0
      ? state__UNIT.array__UNIT.map((item) => {
          return {
            name__Unit: item.name__Unit,
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
      title='список групп страниц'
      columns={[
        { title: 'Единица измерения', field: 'name__Unit' },

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
      <Tooltip title='Добавить единицу'>
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
          Cписок единиц измерения
        </Typography>
      </Grid>

      <Grid item className={classes.item}>
        {myMaterialTable}
      </Grid>
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setName__Unit('');
        }}
        aria-labelledby='form-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='form-dialog-title'>Единицы измерения</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {buttonText ? buttonText : 'Поехали'}
          </DialogContentText>

          <TextField
            autoFocus
            // margin="dense"
            id='name__Unit'
            name='name__Unit'
            value={name__Unit ? name__Unit : ''}
            label='Единица измерения'
            onChange={(e) => onChangehandler(e)}
            error={name__UnitHelper.length !== 0}
            helperText={name__UnitHelper}
            type='text'
            fullWidth
            autoComplete='text'
            // variant='outlined'
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            onClick={() => {
              setOpenDialog(false);
              setName__Unit('');
            }}
            color='primary'
          >
            Выход
          </Button>
          <Button
            disabled={
              (name__Unit && name__Unit.length === 0) ||
              name__UnitHelper.length !== 0
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

Unit.propTypes = {
  add__UNIT: PropTypes.func.isRequired,
  getAll__UNIT: PropTypes.func.isRequired,
  getOne__UNIT: PropTypes.func.isRequired,
  update__UNIT: PropTypes.func.isRequired,
  delete__UNIT: PropTypes.func.isRequired,

  // state_auth: PropTypes.object.isRequired,
  state__UNIT: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // state_auth: state.auth,
  state__UNIT: state.unit,
});

export default connect(mapStateToProps, {
  add__UNIT,
  getAll__UNIT,
  getOne__UNIT,
  update__UNIT,
  delete__UNIT,
})(Unit);
