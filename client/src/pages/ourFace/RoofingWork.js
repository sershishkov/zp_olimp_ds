import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const RoofingWork = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item>
        <Typography variant='h1'>RoofingWork</Typography>
      </Grid>
    </Grid>
  );
};

export default RoofingWork;
