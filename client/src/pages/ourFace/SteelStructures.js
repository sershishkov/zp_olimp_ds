import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../store/actions/nameOfPage';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';

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

const SteelStructures = ({ setNameOfPage }) => {
  const classes = useStyles();
  useEffect(() => {
    setNameOfPage('Металл...');
  }, [setNameOfPage]);
  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.item}>
        <Typography variant='h1' align='center'>
          {' '}
          Изделия из металла
        </Typography>
        <Typography variant='h4'>
          {' '}
          Скоро будут Фото и подробное описание работ
        </Typography>
      </Grid>
    </Grid>
  );
};

SteelStructures.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
};

export default connect(null, { setNameOfPage })(SteelStructures);
