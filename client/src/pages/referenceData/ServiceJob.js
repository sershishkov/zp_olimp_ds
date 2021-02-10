import React, { useEffect, useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  add__SERVICE_JOB,
  getAll__SERVICE_JOB,
  getOne__SERVICE_JOB,
  update__SERVICE_JOB,
  delete__SERVICE_JOB,
} from '../../store/actions/referenceData/serviceJob';
import { getAll__UNIT } from '../../store/actions/referenceData/unit';
import { getAll__GROUP_SERVICE_JOB } from '../../store/actions/referenceData/groupServiceJob';
import { getAll__PRODUCT } from '../../store/actions/referenceData/product';
import { getAll__INVENTAR } from '../../store/actions/referenceData/inventar';
import { getAll__INSTRUMENT } from '../../store/actions/referenceData/instrument';
import { getAll__EQUIPMENT } from '../../store/actions/referenceData/equipment';

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

import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Chip from '@material-ui/core/Chip';

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

const ServiceJob = ({
  add__SERVICE_JOB,
  getAll__SERVICE_JOB,
  getOne__SERVICE_JOB,
  update__SERVICE_JOB,
  delete__SERVICE_JOB,

  getAll__UNIT,
  getAll__GROUP_SERVICE_JOB,
  getAll__PRODUCT,
  getAll__INVENTAR,
  getAll__INSTRUMENT,
  getAll__EQUIPMENT,

  state__SERVICE_JOB,
  state__UNIT,
  state__GROUP_SERVICE_JOB,
  state__PRODUCT,
  state__INVENTAR,
  state__INSTRUMENT,
  state__EQUIPMENT,
}) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);

  const [formData, setFormData] = useState({
    name__ServiceJob: '',
    unit: '',
    group_ServiceJob: '',
    employeePrice: '',
    sellingPrice: '',
    products: [],
    inventars: [],
    instruments: [],
    equipments: [],
  });

  const {
    name__ServiceJob,
    unit,
    group_ServiceJob,
    employeePrice,
    sellingPrice,
    products,
    inventars,
    instruments,
    equipments,
  } = formData;

  const [editId, setEditId] = useState('');
  const [buttonText, setButtonText] = useState('');

  const [name__SERVICE_JOB_Helper, set_name__SERVICE_JOB_Helper] = useState('');
  const [name__employeePrice_Helper, set_name__employeePrice_Helper] = useState(
    ''
  );
  const [name__sellingPrice_Helper, set_name__sellingPrice_Helper] = useState(
    ''
  );

  const clearFormData = () => {
    setFormData({
      name__ServiceJob: '',
      unit: '',
      group_ServiceJob: '',
      employeePrice: '',
      sellingPrice: '',
      products: [],
      inventars: [],
      instruments: [],
      equipments: [],
    });
    setEditId('');
  };

  useEffect(() => {
    getAll__SERVICE_JOB();
    getAll__UNIT();
    getAll__GROUP_SERVICE_JOB();
    getAll__PRODUCT();
    getAll__INVENTAR();
    getAll__INSTRUMENT();
    getAll__EQUIPMENT();

    clearFormData();

    return () => {
      clearFormData();
    };
  }, [
    getAll__SERVICE_JOB,
    getAll__UNIT,
    getAll__GROUP_SERVICE_JOB,
    getAll__PRODUCT,
    getAll__INVENTAR,
    getAll__INSTRUMENT,
    getAll__EQUIPMENT,
  ]);

  useLayoutEffect(() => {
    let newProducts = [];
    let newInventars = [];
    let newInstruments = [];
    let newEquipments = [];

    if (state__SERVICE_JOB.one__SERVICE_JOB) {
      // console.log(state__SERVICE_JOB.one__SERVICE_JOB);
      if (
        state__SERVICE_JOB.one__SERVICE_JOB.products &&
        state__SERVICE_JOB.one__SERVICE_JOB.products.length > 0
      ) {
        newProducts = state__SERVICE_JOB.one__SERVICE_JOB.products.map(
          (item) => {
            return item.product._id;
          }
        );
      }

      if (
        state__SERVICE_JOB.one__SERVICE_JOB.inventars &&
        state__SERVICE_JOB.one__SERVICE_JOB.inventars.length > 0
      ) {
        newInventars = state__SERVICE_JOB.one__SERVICE_JOB.inventars.map(
          (item) => {
            return item.inventar._id;
          }
        );
      }

      if (
        state__SERVICE_JOB.one__SERVICE_JOB.instruments &&
        state__SERVICE_JOB.one__SERVICE_JOB.instruments.length > 0
      ) {
        newInstruments = state__SERVICE_JOB.one__SERVICE_JOB.instruments.map(
          (item) => {
            return item.instrument._id;
          }
        );
      }

      if (
        state__SERVICE_JOB.one__SERVICE_JOB.equipments &&
        state__SERVICE_JOB.one__SERVICE_JOB.equipments.length > 0
      ) {
        newEquipments = state__SERVICE_JOB.one__SERVICE_JOB.equipments.map(
          (item) => {
            return item.equipment._id;
          }
        );
      }

      setFormData({
        name__ServiceJob: state__SERVICE_JOB.one__SERVICE_JOB.name__ServiceJob
          ? state__SERVICE_JOB.one__SERVICE_JOB.name__ServiceJob
          : '',
        unit: state__SERVICE_JOB.one__SERVICE_JOB.unit
          ? state__SERVICE_JOB.one__SERVICE_JOB.unit._id
          : '',
        group_ServiceJob: state__SERVICE_JOB.one__SERVICE_JOB.group_ServiceJob
          ? state__SERVICE_JOB.one__SERVICE_JOB.group_ServiceJob._id
          : '',
        employeePrice: state__SERVICE_JOB.one__SERVICE_JOB.employeePrice
          ? state__SERVICE_JOB.one__SERVICE_JOB.employeePrice
          : '',
        sellingPrice: state__SERVICE_JOB.one__SERVICE_JOB.sellingPrice
          ? state__SERVICE_JOB.one__SERVICE_JOB.sellingPrice
          : '',
        products: newProducts,
        inventars: newInventars,
        instruments: newInstruments,
        equipments: newEquipments,
      });
    }
  }, [state__SERVICE_JOB.one__SERVICE_JOB]);

  const onDeleteItem = (id) => {
    delete__SERVICE_JOB(id);
    setEditId('');
  };
  const onSubmit = () => {
    const newProducts =
      products && products.length > 0
        ? products.map((item) => {
            return { product: item };
          })
        : [];
    const newInventars =
      inventars && inventars.length > 0
        ? inventars.map((item) => {
            return { inventar: item };
          })
        : [];

    const newInstruments =
      instruments && instruments.length > 0
        ? instruments.map((item) => {
            return { instrument: item };
          })
        : [];

    const newEquipments =
      equipments && equipments.length > 0
        ? equipments.map((item) => {
            return { equipment: item };
          })
        : [];

    if (buttonText === 'Редактировать' && editId) {
      update__SERVICE_JOB(
        editId,
        name__ServiceJob,
        unit,
        group_ServiceJob,
        employeePrice,
        sellingPrice,
        newProducts,
        newInventars,
        newInstruments,
        newEquipments
      );
    } else if (buttonText === 'Добавить') {
      add__SERVICE_JOB(
        name__ServiceJob,
        unit,
        group_ServiceJob,
        employeePrice,
        sellingPrice,
        newProducts,
        newInventars,
        newInstruments,
        newEquipments
      );
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
    getOne__SERVICE_JOB(id);
    setEditId(id);
    setButtonText('Редактировать');

    setOpenDialog(true);
  };

  const onChangeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });

    let valid;
    switch (event.target.id) {
      case 'name__ServiceJob':
        valid = event.target.value.length >= 3;
        if (!valid) {
          set_name__SERVICE_JOB_Helper('Минимальная длина 3 знака');
        } else {
          set_name__SERVICE_JOB_Helper('');
        }
        break;

      case 'employeePrice':
        valid = event.target.value.length >= 1;
        if (!valid) {
          set_name__employeePrice_Helper('Минимальная длина 1 цифра');
        } else {
          set_name__employeePrice_Helper('');
        }
        break;

      case 'sellingPrice':
        valid = event.target.value.length >= 1;
        if (!valid) {
          set_name__sellingPrice_Helper('Минимальная длина 1 цифра');
        } else {
          set_name__sellingPrice_Helper('');
        }
        break;

      default:
        break;
    }
  };

  const rows =
    state__SERVICE_JOB.array__SERVICE_JOB &&
    state__SERVICE_JOB.array__SERVICE_JOB.length > 0
      ? state__SERVICE_JOB.array__SERVICE_JOB.map((item) => {
          return {
            name__ServiceJob: item.name__ServiceJob,
            unit: item.unit.name__Unit,
            employeePrice: item.employeePrice,
            sellingPrice: item.sellingPrice,
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
        { title: 'Работа', field: 'name__ServiceJob' },
        { title: 'Ед.изм', field: 'unit' },
        { title: 'Цена работникам', field: 'employeePrice' },
        { title: 'Цена клиентам', field: 'sellingPrice' },

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
      <Tooltip title='Добавить работу'>
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
          Cписок работ
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
        <DialogTitle id='form-dialog-title'>Работа</DialogTitle>
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
                id='name__ServiceJob'
                name='name__ServiceJob'
                label='Работа'
                type='text'
                value={name__ServiceJob ? name__ServiceJob : ''}
                error={name__SERVICE_JOB_Helper.length !== 0}
                helperText={name__SERVICE_JOB_Helper}
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
                // input={<Input />}
                // renderValue={(selected) => selected.join(', ')}
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
                      {/* <Checkbox checked={unit && unit.indexOf(item._id) > -1} /> */}
                      {item.name__Unit}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>

            <Grid item className={classes.dialogItem}>
              <InputLabel id='group_ServiceJob-label'>Группа работ</InputLabel>
              <Select
                labelId='group_ServiceJob-label'
                id='group_ServiceJob'
                name='group_ServiceJob'
                // multiple
                required
                fullWidth
                value={group_ServiceJob ? group_ServiceJob : ''}
                onChange={(e) => onChangeHandler(e)}
                // input={<Input />}
                // renderValue={(selected) => selected.join(', ')}
                className={classes.select}
              >
                {state__GROUP_SERVICE_JOB.array__GROUP_SERVICE_JOB &&
                  state__GROUP_SERVICE_JOB.array__GROUP_SERVICE_JOB.length >
                    0 &&
                  state__GROUP_SERVICE_JOB.array__GROUP_SERVICE_JOB.map(
                    (item) => (
                      <MenuItem
                        key={item._id}
                        value={item._id}
                        className={classes.selectItem}
                      >
                        {/* <Checkbox
                          checked={
                            group_ServiceJob &&
                            group_ServiceJob.indexOf(item._id) > -1
                          }
                        /> */}
                        {item.name__Group_ServiceJob}
                      </MenuItem>
                    )
                  )}
              </Select>
            </Grid>

            <Grid item className={classes.dialogItem}>
              <TextField
                // autoFocus
                id='employeePrice'
                name='employeePrice'
                label='Цена работникам'
                type='number'
                value={employeePrice ? employeePrice : ''}
                error={name__employeePrice_Helper.length !== 0}
                helperText={name__employeePrice_Helper}
                fullWidth
                // autoComplete='text'
                onChange={(e) => onChangeHandler(e)}
              />
            </Grid>

            <Grid item className={classes.dialogItem}>
              <TextField
                // autoFocus
                id='sellingPrice'
                name='sellingPrice'
                label='Цена клиентам'
                type='number'
                value={sellingPrice ? sellingPrice : ''}
                error={name__sellingPrice_Helper.length !== 0}
                helperText={name__sellingPrice_Helper}
                fullWidth
                // autoComplete='text'
                onChange={(e) => onChangeHandler(e)}
              />
            </Grid>

            <Grid item className={classes.dialogItem}>
              <InputLabel id='products-label'>Товары</InputLabel>
              <Select
                labelId='products-label'
                id='products'
                name='products'
                multiple
                required
                fullWidth
                value={products ? products : []}
                onChange={(e) => onChangeHandler(e)}
                input={<Input />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected &&
                      selected.length > 0 &&
                      state__PRODUCT.array__PRODUCT &&
                      state__PRODUCT.array__PRODUCT.length > 0 &&
                      selected.map((value) => {
                        let itemToDispaly = state__PRODUCT.array__PRODUCT.find(
                          (item) => item._id === value
                        ).name__Product;

                        return (
                          <Chip
                            key={value}
                            label={itemToDispaly}
                            className={classes.chip}
                          />
                        );
                      })}
                  </div>
                )}
                className={classes.select}
              >
                {state__PRODUCT.array__PRODUCT &&
                  state__PRODUCT.array__PRODUCT.length > 0 &&
                  state__PRODUCT.array__PRODUCT.map((item) => (
                    <MenuItem
                      key={item._id}
                      value={item._id}
                      className={classes.selectItem}
                    >
                      <Checkbox
                        checked={products && products.indexOf(item._id) > -1}
                      />
                      {item.name__Product}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>

            <Grid item className={classes.dialogItem}>
              <InputLabel id='inventars-label'>Инвентарь</InputLabel>
              <Select
                labelId='inventars-label'
                id='inventars'
                name='inventars'
                multiple
                required
                fullWidth
                value={inventars ? inventars : []}
                onChange={(e) => onChangeHandler(e)}
                input={<Input />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected &&
                      selected.length > 0 &&
                      state__INVENTAR.array__INVENTAR &&
                      state__INVENTAR.array__INVENTAR.length > 0 &&
                      selected.map((value) => {
                        let itemToDispaly = state__INVENTAR.array__INVENTAR.find(
                          (item) => item._id === value
                        ).name__Inventar;

                        return (
                          <Chip
                            key={value}
                            label={itemToDispaly}
                            className={classes.chip}
                          />
                        );
                      })}
                  </div>
                )}
                className={classes.select}
              >
                {state__INVENTAR.array__INVENTAR &&
                  state__INVENTAR.array__INVENTAR.length > 0 &&
                  state__INVENTAR.array__INVENTAR.map((item) => (
                    <MenuItem
                      key={item._id}
                      value={item._id}
                      className={classes.selectItem}
                    >
                      <Checkbox
                        checked={inventars && inventars.indexOf(item._id) > -1}
                      />
                      {item.name__Inventar}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>

            <Grid item className={classes.dialogItem}>
              <InputLabel id='instruments-label'>Инструмент</InputLabel>
              <Select
                labelId='instruments-label'
                id='instruments'
                name='instruments'
                multiple
                required
                fullWidth
                value={instruments ? instruments : []}
                onChange={(e) => onChangeHandler(e)}
                input={<Input />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected &&
                      selected.length > 0 &&
                      state__INSTRUMENT.array__INSTRUMENT &&
                      state__INSTRUMENT.array__INSTRUMENT.length > 0 &&
                      selected.map((value) => {
                        let itemToDispaly = state__INSTRUMENT.array__INSTRUMENT.find(
                          (item) => item._id === value
                        ).name__Instrument;

                        return (
                          <Chip
                            key={value}
                            label={itemToDispaly}
                            className={classes.chip}
                          />
                        );
                      })}
                  </div>
                )}
                className={classes.select}
              >
                {state__INSTRUMENT.array__INSTRUMENT &&
                  state__INSTRUMENT.array__INSTRUMENT.length > 0 &&
                  state__INSTRUMENT.array__INSTRUMENT.map((item) => (
                    <MenuItem
                      key={item._id}
                      value={item._id}
                      className={classes.selectItem}
                    >
                      <Checkbox
                        checked={
                          instruments &&
                          instruments.length > 0 &&
                          instruments.indexOf(item._id) > -1
                        }
                      />
                      {item.name__Instrument}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>

            <Grid item className={classes.dialogItem}>
              <InputLabel id='equipments-label'>Оборудование</InputLabel>
              <Select
                labelId='equipments-label'
                id='equipments'
                name='equipments'
                multiple
                required
                fullWidth
                value={equipments ? equipments : []}
                onChange={(e) => onChangeHandler(e)}
                input={<Input />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected &&
                      selected.length > 0 &&
                      state__EQUIPMENT.array__EQUIPMENT &&
                      state__EQUIPMENT.array__EQUIPMENT.length > 0 &&
                      selected.map((value) => {
                        let itemToDispaly = state__EQUIPMENT.array__EQUIPMENT.find(
                          (item) => item._id === value
                        ).name__Equipment;

                        return (
                          <Chip
                            key={value}
                            label={itemToDispaly}
                            className={classes.chip}
                          />
                        );
                      })}
                  </div>
                )}
                className={classes.select}
              >
                {state__EQUIPMENT.array__EQUIPMENT &&
                  state__EQUIPMENT.array__EQUIPMENT.length > 0 &&
                  state__EQUIPMENT.array__EQUIPMENT.map((item) => (
                    <MenuItem
                      key={item._id}
                      value={item._id}
                      className={classes.selectItem}
                    >
                      <Checkbox
                        checked={
                          equipments &&
                          equipments.length > 0 &&
                          equipments.indexOf(item._id) > -1
                        }
                      />
                      {item.name__Equipment}
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
              !name__ServiceJob ||
              !unit ||
              !group_ServiceJob ||
              !employeePrice ||
              (products && products.length === 0) ||
              (inventars && inventars.length === 0) ||
              (instruments && instruments.length === 0) ||
              (equipments && equipments.length === 0) ||
              name__SERVICE_JOB_Helper.length !== 0 ||
              name__employeePrice_Helper.length !== 0
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

ServiceJob.propTypes = {
  add__SERVICE_JOB: PropTypes.func.isRequired,
  getAll__SERVICE_JOB: PropTypes.func.isRequired,
  getOne__SERVICE_JOB: PropTypes.func.isRequired,
  update__SERVICE_JOB: PropTypes.func.isRequired,
  delete__SERVICE_JOB: PropTypes.func.isRequired,

  getAll__UNIT: PropTypes.func.isRequired,
  getAll__GROUP_SERVICE_JOB: PropTypes.func.isRequired,
  getAll__PRODUCT: PropTypes.func.isRequired,
  getAll__INVENTAR: PropTypes.func.isRequired,
  getAll__INSTRUMENT: PropTypes.func.isRequired,
  getAll__EQUIPMENT: PropTypes.func.isRequired,

  // state_auth: PropTypes.object.isRequired,
  state__SERVICE_JOB: PropTypes.object.isRequired,
  state__UNIT: PropTypes.object.isRequired,
  state__GROUP_SERVICE_JOB: PropTypes.object.isRequired,
  state__PRODUCT: PropTypes.object.isRequired,
  state__INVENTAR: PropTypes.object.isRequired,
  state__INSTRUMENT: PropTypes.object.isRequired,
  state__EQUIPMENT: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // state_auth: state.auth,
  state__SERVICE_JOB: state.serviceJob,
  state__UNIT: state.unit,
  state__GROUP_SERVICE_JOB: state.groupServiceJob,
  state__PRODUCT: state.product,
  state__INVENTAR: state.inventar,
  state__INSTRUMENT: state.instrument,
  state__EQUIPMENT: state.equipment,
});

export default connect(mapStateToProps, {
  add__SERVICE_JOB,
  getAll__SERVICE_JOB,
  getOne__SERVICE_JOB,
  update__SERVICE_JOB,
  delete__SERVICE_JOB,

  getAll__UNIT,
  getAll__GROUP_SERVICE_JOB,
  getAll__PRODUCT,
  getAll__INVENTAR,
  getAll__INSTRUMENT,
  getAll__EQUIPMENT,
})(ServiceJob);
