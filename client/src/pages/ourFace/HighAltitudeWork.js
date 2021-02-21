import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { setNameOfPage } from '../../store/actions/nameOfPage';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';

// import img_001 from '../../images/HighAltitude/001.jpg';
// import img_002 from '../../images/HighAltitude/002.jpg';

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
// const listOfFoto = [
//   { imgUrl: img_001, description: 'Высотные работы' },
//   { imgUrl: img_002, description: 'Высотные работы' },
// ];
const listOfFoto = [
  {
    imgUrl: 'https://drive.google.com/uc?id=14N8JwNTaFIY64XnfY812oQolzpdQMnNO',
    description: 'Высотные работы',
  },

  {
    imgUrl: 'https://drive.google.com/uc?id=1H_xwSiGaht1e4cTPQIogWz6sm9DCHcEe',
    description: 'Высотные работы',
  },
];

const HighAltitudeWork = ({ setNameOfPage }) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Высотные');
  }, [setNameOfPage]);

  return (
    <Grid container className={classes.root}>
      <Helmet>
        <title>Высотные работы</title>
        <link rel='canonical' href='https://zp-olimp-ds.herokuapp.com/' />
        <meta name='description' content='Главный альпинист Запорожья' />
      </Helmet>
      <Grid item className={classes.item}>
        <Typography variant='h3' align='center'>
          {' '}
          Высотные работы
        </Typography>
      </Grid>
      <Grid item className={classes.item}>
        <ListOfPhotos listOfFoto={listOfFoto} />
      </Grid>
    </Grid>
  );
};

HighAltitudeWork.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
};

export default connect(null, { setNameOfPage })(HighAltitudeWork);
