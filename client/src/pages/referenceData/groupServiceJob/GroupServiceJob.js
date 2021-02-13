import React, { useEffect, useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  add__GROUP_SERVICE_JOB,
  getAll__GROUP_SERVICE_JOB,
  getOne__GROUP_SERVICE_JOB,
  update__GROUP_SERVICE_JOB,
  delete__GROUP_SERVICE_JOB,
} from '../../../store/actions/referenceData/groupServiceJob';

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

const GroupServiceJob = ({
  add__GROUP_SERVICE_JOB,
  getAll__GROUP_SERVICE_JOB,
  getOne__GROUP_SERVICE_JOB,
  update__GROUP_SERVICE_JOB,
  delete__GROUP_SERVICE_JOB,

  state__GROUP_SERVICE_JOB,
}) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);

  const [formData, setFormData] = useState({
    name__Group_ServiceJob: '',
  });

  const { name__Group_ServiceJob } = formData;

  const [editId, setEditId] = useState('');
  const [buttonText, setButtonText] = useState('');

  const [
    name__GROUP_SERVICE_JOB_Helper,
    set_name__GROUP_SERVICE_JOB_Helper,
  ] = useState('');

  const clearFormData = () => {
    setFormData({
      name__Group_ServiceJob: '',
    });
    setEditId('');
  };

  useEffect(() => {
    getAll__GROUP_SERVICE_JOB();

    clearFormData();

    return () => {
      clearFormData();
    };
  }, [getAll__GROUP_SERVICE_JOB]);

  useLayoutEffect(() => {
    if (state__GROUP_SERVICE_JOB.one__GROUP_SERVICE_JOB) {
      // console.log(state__GROUP_SERVICE_JOB.one__GROUP_SERVICE_JOB);

      setFormData({
        name__Group_ServiceJob: state__GROUP_SERVICE_JOB.one__GROUP_SERVICE_JOB
          .name__Group_ServiceJob
          ? state__GROUP_SERVICE_JOB.one__GROUP_SERVICE_JOB
              .name__Group_ServiceJob
          : '',
      });
    }
  }, [state__GROUP_SERVICE_JOB.one__GROUP_SERVICE_JOB]);

  const onDeleteItem = (id) => {
    delete__GROUP_SERVICE_JOB(id);
    setEditId('');
  };
  const onSubmit = () => {
    if (buttonText === 'Редактировать' && editId) {
      update__GROUP_SERVICE_JOB(editId, name__Group_ServiceJob);
    } else if (buttonText === 'Добавить') {
      add__GROUP_SERVICE_JOB(name__Group_ServiceJob);
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
    getOne__GROUP_SERVICE_JOB(id);
    setEditId(id);
    setButtonText('Редактировать');

    setOpenDialog(true);
  };

  const onChangeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });

    let valid;
    switch (event.target.id) {
      case 'name__Group_ServiceJob':
        valid = event.target.value.length >= 3;
        if (!valid) {
          set_name__GROUP_SERVICE_JOB_Helper('Минимальная длина 3 знака');
        } else {
          set_name__GROUP_SERVICE_JOB_Helper('');
        }
        break;

      default:
        break;
    }
  };
  // console.log(state__GROUP_SERVICE_JOB.array__GROUP_SERVICE_JOB);
  const rows =
    state__GROUP_SERVICE_JOB.array__GROUP_SERVICE_JOB &&
    state__GROUP_SERVICE_JOB.array__GROUP_SERVICE_JOB.length > 0
      ? state__GROUP_SERVICE_JOB.array__GROUP_SERVICE_JOB.map((item) => {
          return {
            name__Group_ServiceJob: item.name__Group_ServiceJob,

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
      title='Группы работ'
      columns={[
        { title: 'Группа', field: 'name__Group_ServiceJob' },

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
          onClick={() => buttonAddHandler()}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <Grid item className={classes.item}>
        <Typography variant='h3' align='center'>
          Группы работ
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
        <DialogTitle id='form-dialog-title'>Группа</DialogTitle>
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
                id='name__Group_ServiceJob'
                name='name__Group_ServiceJob'
                label='Группа работ'
                type='text'
                value={name__Group_ServiceJob ? name__Group_ServiceJob : ''}
                error={name__GROUP_SERVICE_JOB_Helper.length !== 0}
                helperText={name__GROUP_SERVICE_JOB_Helper}
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
              !name__Group_ServiceJob ||
              name__GROUP_SERVICE_JOB_Helper.length !== 0
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

GroupServiceJob.propTypes = {
  add__GROUP_SERVICE_JOB: PropTypes.func.isRequired,
  getAll__GROUP_SERVICE_JOB: PropTypes.func.isRequired,
  getOne__GROUP_SERVICE_JOB: PropTypes.func.isRequired,
  update__GROUP_SERVICE_JOB: PropTypes.func.isRequired,
  delete__GROUP_SERVICE_JOB: PropTypes.func.isRequired,

  // state_auth: PropTypes.object.isRequired,
  state__GROUP_SERVICE_JOB: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // state_auth: state.auth,
  state__GROUP_SERVICE_JOB: state.groupServiceJob,
});

export default connect(mapStateToProps, {
  add__GROUP_SERVICE_JOB,
  getAll__GROUP_SERVICE_JOB,
  getOne__GROUP_SERVICE_JOB,
  update__GROUP_SERVICE_JOB,
  delete__GROUP_SERVICE_JOB,
})(GroupServiceJob);
