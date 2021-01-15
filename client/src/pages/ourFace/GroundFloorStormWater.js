import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../store/actions/nameOfPage';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';

import img_001 from '../../images/GroundFloor/001.jpg';
import img_002 from '../../images/GroundFloor/002.jpg';
import img_003 from '../../images/GroundFloor/003.jpg';
import img_004 from '../../images/GroundFloor/004.jpg';
import img_005 from '../../images/GroundFloor/005.jpg';

import ListOfPhotos from '../components/ListOfPhotos';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2em',
    [theme.breakpoints.down('md')]: {
      padding: 0,
    },
  },
  item: {
    width: '100%',
    marginBottom: '5em',
    border: `2px solid ${grey[400]}`,
  },
}));
const listOfFoto = [
  { imgUrl: img_001, description: 'Цоколь' },
  { imgUrl: img_002, description: 'Цоколь' },
  { imgUrl: img_003, description: 'Цоколь' },
  { imgUrl: img_004, description: 'Цоколь' },
  { imgUrl: img_005, description: 'Цоколь' },
];

const GroundFloorStormWater = ({ setNameOfPage }) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Цоколь, ливневки');
  }, [setNameOfPage]);

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.item}>
        <Typography variant='h3' align='center'>
          {' '}
          Цоколь и ливневки
        </Typography>
      </Grid>
      <Grid item className={classes.item}>
        <ListOfPhotos listOfFoto={listOfFoto} />
      </Grid>
    </Grid>
  );
};

GroundFloorStormWater.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
};

export default connect(null, { setNameOfPage })(GroundFloorStormWater);
