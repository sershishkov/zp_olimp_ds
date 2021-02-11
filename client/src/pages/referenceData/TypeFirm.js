import React, { useEffect, useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  add__TYPE_FIRM,
  getAll__TYPE_FIRM,
  getOne__TYPE_FIRM,
  update__TYPE_FIRM,
  delete__TYPE_FIRM,
} from '../../store/actions/referenceData/typeFirm';

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
  add__TYPE_FIRM,
  getAll__TYPE_FIRM,
  getOne__TYPE_FIRM,
  update__TYPE_FIRM,
  delete__TYPE_FIRM,

  state__TYPE_FIRM,
}) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);

  const [formData, setFormData] = useState({
    name__Type_Firm: '',
    short_name__Type_Firm: '',
  });

  const { name__Type_Firm, short_name__Type_Firm } = formData;

  const [editId, setEditId] = useState('');
  const [buttonText, setButtonText] = useState('');

  const [name__Type_Firm_Helper, set_name__Type_Firm_Helper] = useState('');
  const [
    nshort_name__Type_Firm_Helper,
    set_nshort_name__Type_Firm_Helper,
  ] = useState('');

  const clearFormData = () => {
    setFormData({
      name__Type_Firm: '',
      short_name__Type_Firm: '',
    });
    setEditId('');
  };

  useEffect(() => {
    getAll__TYPE_FIRM();
    clearFormData();
    return () => {
      clearFormData();
    };
  }, [getAll__TYPE_FIRM]);

  useLayoutEffect(() => {
    if (state__TYPE_FIRM.one__TYPE_FIRM) {
      setFormData({
        name__Type_Firm: state__TYPE_FIRM.one__TYPE_FIRM.name__Type_Firm
          ? state__TYPE_FIRM.one__TYPE_FIRM.name__Type_Firm
          : '',
        short_name__Type_Firm: state__TYPE_FIRM.one__TYPE_FIRM
          .short_name__Type_Firm
          ? state__TYPE_FIRM.one__TYPE_FIRM.short_name__Type_Firm
          : '',
      });
    }
  }, [state__TYPE_FIRM.one__TYPE_FIRM]);

  const onDeleteItem = (id) => {
    delete__TYPE_FIRM(id);
    setEditId('');
  };
  const onSubmit = () => {
    if (buttonText === 'Редактировать' && editId) {
      update__TYPE_FIRM(editId, name__Type_Firm, short_name__Type_Firm);
    } else if (buttonText === 'Добавить' && name__Type_Firm) {
      add__TYPE_FIRM(name__Type_Firm, short_name__Type_Firm);
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
    getOne__TYPE_FIRM(id);
    setEditId(id);
    setButtonText('Редактировать');
    setOpenDialog(true);
  };

  const onChangeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });

    let valid;
    switch (event.target.id) {
      case 'name__Type_Firm':
        valid = event.target.value.length >= 3;
        if (!valid) {
          set_name__Type_Firm_Helper('Минимальная длина 3 знака');
        } else {
          set_name__Type_Firm_Helper('');
        }
        break;

      case 'short_name__Type_Firm':
        valid = event.target.value.length >= 3;
        if (!valid) {
          set_nshort_name__Type_Firm_Helper('Минимальная длина 3 знака');
        } else {
          set_nshort_name__Type_Firm_Helper('');
        }
        break;

      default:
        break;
    }
  };

  const rows =
    state__TYPE_FIRM.array__TYPE_FIRM &&
    state__TYPE_FIRM.array__TYPE_FIRM.length > 0
      ? state__TYPE_FIRM.array__TYPE_FIRM.map((item) => {
          return {
            name__Type_Firm: item.name__Type_Firm,
            short_name__Type_Firm: item.short_name__Type_Firm,

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
      title='список работников'
      columns={[
        { title: 'Полное название', field: 'name__Type_Firm' },
        {
          title: 'Сокращенное название',
          field: 'short_name__Type_Firm',
          // cellStyle: {
          //   width: 40,
          //   textAlign: 'center',
          // },

          // headerStyle: {
          //   width: 40,
          //   textAlign: 'center',
          // },
          columnStyle: {
            width: 40,
            textAlign: 'center',
          },
        },

        {
          title: 'Редактировать',
          field: 'edit',
          sorting: false,
          filtering: false,
          // cellStyle: {
          //   width: 40,
          //   textAlign: 'center',
          // },

          // headerStyle: {
          //   width: 40,
          //   textAlign: 'center',
          // },
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
      <Tooltip title='Добавить форму собственности'>
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
          Cписок форм собственности
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
        <DialogTitle id='form-dialog-title'>Форма собственности</DialogTitle>
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
                id='name__Type_Firm'
                name='name__Type_Firm'
                label='Полная форма собств'
                type='text'
                value={name__Type_Firm ? name__Type_Firm : ''}
                error={name__Type_Firm_Helper.length !== 0}
                helperText={name__Type_Firm_Helper}
                fullWidth
                autoComplete='text'
                onChange={(e) => onChangeHandler(e)}
              />
            </Grid>

            <Grid item className={classes.dialogItem}>
              <TextField
                id='short_name__Type_Firm'
                name='short_name__Type_Firm'
                label='Сокращ форма собств'
                type='text'
                value={short_name__Type_Firm ? short_name__Type_Firm : ''}
                error={nshort_name__Type_Firm_Helper.length !== 0}
                helperText={nshort_name__Type_Firm_Helper}
                fullWidth
                autoComplete='text'
                onChange={(e) => onChangeHandler(e)}
              />
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
              !name__Type_Firm ||
              !short_name__Type_Firm ||
              name__Type_Firm_Helper.length !== 0 ||
              nshort_name__Type_Firm_Helper.length !== 0
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

TypeFirm.propTypes = {
  add__TYPE_FIRM: PropTypes.func.isRequired,
  getAll__TYPE_FIRM: PropTypes.func.isRequired,
  getOne__TYPE_FIRM: PropTypes.func.isRequired,
  update__TYPE_FIRM: PropTypes.func.isRequired,
  delete__TYPE_FIRM: PropTypes.func.isRequired,

  // state_auth: PropTypes.object.isRequired,
  state__TYPE_FIRM: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // state_auth: state.auth,
  state__TYPE_FIRM: state.typeFirm,
});

export default connect(mapStateToProps, {
  add__TYPE_FIRM,
  getAll__TYPE_FIRM,
  getOne__TYPE_FIRM,
  update__TYPE_FIRM,
  delete__TYPE_FIRM,
})(TypeFirm);
