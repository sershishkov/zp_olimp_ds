import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../store/actions/nameOfPage';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const WindowsDoorPlastic = ({ setNameOfPage }) => {
  const classes = useStyles();
  useEffect(() => {
    setNameOfPage('Окна и Двери');
  }, [setNameOfPage]);
  return (
    <Grid container className={classes.root}>
      <Grid item>
        <Typography variant='h1'>WindowsDoorPlastic</Typography>
      </Grid>
    </Grid>
  );
};

WindowsDoorPlastic.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
};

export default connect(null, { setNameOfPage })(WindowsDoorPlastic);
