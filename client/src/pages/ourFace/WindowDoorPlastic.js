import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { setNameOfPage } from '../../store/actions/nameOfPage';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';

import img_001 from '../../images/Windows/001.jpg';

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
const listOfFoto = [{ imgUrl: img_001, description: 'Монтаж окон' }];

// const listOfFoto = [
//   {
//     imgUrl: 'https://drive.google.com/uc?id=1SQ9ft6FvXUA9RWCaN-ZLN8TaTuHN3MgN',
//     description: 'Монтаж окон',
//   },
// ];

const WindowsDoorPlastic = ({ setNameOfPage }) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Окна и Двери');
  }, [setNameOfPage]);
  return (
    <Grid container className={classes.root}>
      <Helmet>
        <title>Окна</title>
        <link rel='canonical' href='https://zp-olimp-ds.herokuapp.com/' />
        <meta name='description' content='Главный оконщик Запорожья' />
      </Helmet>

      <Grid item className={classes.item}>
        <Typography variant='h3' align='center'>
          {' '}
          Окна и Двери
        </Typography>
      </Grid>
      <Grid item className={classes.item}>
        <ListOfPhotos listOfFoto={listOfFoto} />
      </Grid>
    </Grid>
  );
};

WindowsDoorPlastic.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
};

export default connect(null, { setNameOfPage })(WindowsDoorPlastic);
