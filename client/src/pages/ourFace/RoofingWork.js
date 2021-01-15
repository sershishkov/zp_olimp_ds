import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../store/actions/nameOfPage';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';

import img_001 from '../../images/Roof/001.jpg';
import img_002 from '../../images/Roof/002.jpg';

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
  { imgUrl: img_001, description: 'Кровельные работы' },
  { imgUrl: img_002, description: 'Кровельные работы' },
];

const RoofingWork = ({ setNameOfPage }) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Кровля');
  }, [setNameOfPage]);
  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.item}>
        <Typography variant='h3' align='center'>
          {' '}
          Кровля
        </Typography>
      </Grid>
      <Grid item className={classes.item}>
        <ListOfPhotos listOfFoto={listOfFoto} />
      </Grid>
    </Grid>
  );
};

RoofingWork.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
};

export default connect(null, { setNameOfPage })(RoofingWork);
