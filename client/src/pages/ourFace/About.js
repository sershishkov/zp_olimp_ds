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

const About = ({ setNameOfPage }) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('О нас');
  }, [setNameOfPage]);

  return (
    <Grid container className={classes.root} direction='column'>
      <Grid item>
        <Typography variant='h1'>Компания Олимп-ДС</Typography>
      </Grid>
      <Grid item>
        <Typography variant='h1'>About</Typography>
      </Grid>
    </Grid>
  );
};

About.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
};

export default connect(null, { setNameOfPage })(About);
