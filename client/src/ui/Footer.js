import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ourLogo from '../images/LogotipDS.PNG';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#e0e0e0',
    marginTop: '1rem',
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.root}
      alignItems='center'
      justify='space-around'
    >
      <Grid item className={classes.slogan}>
        <Grid container direction='column'>
          <Grid item>
            <Typography variant='h5' align='center'>
              Быстро
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='h5' align='center'>
              Надежно
            </Typography>
          </Grid>
          <Grid item>
            <Typography component='h4' variant='h5' align='center'>
              Качественно
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Hidden smDown>
        <Grid item className={classes.logo}>
          <Button
            color='inherit'
            component={Link}
            href='/'
            className={classes.logoButton}
          >
            <img src={ourLogo} className={classes.logoImage} alt='Logo' />
          </Button>
        </Grid>
      </Hidden>

      <Grid item className={classes.phones}>
        <Grid container direction='column'>
          <Grid item>
            <Typography variant='h5' align='center'>
              +38 067 618 30 60
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='h5' align='center'>
              +38 098 310 47 99
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='h5' align='center'>
              +38 099 180 98 04
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='h5' align='center'>
              +38 050 227 96 50
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Footer;
