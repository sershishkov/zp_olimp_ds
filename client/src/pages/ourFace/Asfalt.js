import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { setNameOfPage } from '../../store/actions/nameOfPage';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';

import img_001 from '../../images/Asfalt/001.jpg';
import img_002 from '../../images/Asfalt/002.jpg';
import img_003 from '../../images/Asfalt/003.jpg';
import img_004 from '../../images/Asfalt/004.jpg';
import img_005 from '../../images/Asfalt/005.jpg';
import img_006 from '../../images/Asfalt/006.jpg';
import img_007 from '../../images/Asfalt/007.jpg';

import ListOfPhotos from '../../components/ListOfPhotos';

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
  { imgUrl: img_001, description: 'Придомовая отмостка' },
  { imgUrl: img_002, description: 'Придомовая отмостка' },
  { imgUrl: img_003, description: 'Придомовая отмостка' },
  { imgUrl: img_004, description: 'Придомовая отмостка' },
  { imgUrl: img_005, description: 'Придомовая отмостка' },
  { imgUrl: img_006, description: 'Придомовая отмостка' },
  { imgUrl: img_007, description: 'Придомовая отмостка' },
];

const Asfalt = ({ setNameOfPage }) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Асфальт');
  }, [setNameOfPage]);

  return (
    <Grid container className={classes.root} direction='column'>
      <Helmet>
        <title>Асфальт</title>
        <link rel='canonical' href='https://zp-olimp-ds.herokuapp.com/' />
        <meta name='description' content='Главный асфальтник Запорожья' />
      </Helmet>

      <Grid item className={classes.item}>
        <Typography variant='h3' align='center'>
          {' '}
          Асфальт
        </Typography>
      </Grid>
      <Grid item className={classes.item}>
        <ListOfPhotos listOfFoto={listOfFoto} />
      </Grid>
    </Grid>
  );
};

Asfalt.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
};

export default connect(null, { setNameOfPage })(Asfalt);
