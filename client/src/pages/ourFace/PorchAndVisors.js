import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { setNameOfPage } from '../../store/actions/nameOfPage';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';

import img_001 from '../../images/Porch/001.jpg';
import img_002 from '../../images/Porch/002.jpg';
import img_003 from '../../images/Porch/003.jpg';
import img_004 from '../../images/Porch/004.jpg';
import img_005 from '../../images/Porch/005.jpg';
import img_006 from '../../images/Porch/006.jpg';

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
  { imgUrl: img_001, description: 'Крыльцо и козырьки' },
  { imgUrl: img_002, description: 'Крыльцо и козырьки' },
  { imgUrl: img_003, description: 'Крыльцо и козырьки' },
  { imgUrl: img_004, description: 'Крыльцо и козырьки' },
  { imgUrl: img_005, description: 'Крыльцо и козырьки' },
  { imgUrl: img_006, description: 'Крыльцо и козырьки' },
];

// const listOfFoto = [
//   {
//     imgUrl: 'https://drive.google.com/uc?id=1oKdidqZN9fDPABYY1ufzg2npBNLHbqqJ',
//     description: 'Крыльцо и козырьки',
//   },

//   {
//     imgUrl: 'https://drive.google.com/uc?id=1QQifgUNr0HjNC_TA_Z0-uhFWbsBboVl3',
//     description: 'Крыльцо и козырьки',
//   },

//   {
//     imgUrl: 'https://drive.google.com/uc?id=1VklQqLb3mFJlBuj0-zg_hBgXNzKnnNGx',
//     description: 'Крыльцо и козырьки',
//   },

//   {
//     imgUrl: 'https://drive.google.com/uc?id=1wl3CBB0dwAk2yqGo-CZHc9uGI2BoF1k2',
//     description: 'Крыльцо и козырьки',
//   },

//   {
//     imgUrl: 'https://drive.google.com/uc?id=1Mpha-7zKpoBQBrL8bSIUjmLUSbt523VY',
//     description: 'Крыльцо и козырьки',
//   },

//   {
//     imgUrl: 'https://drive.google.com/uc?id=1e-8gfPWSrlekRn9NITYgBbRAC7fEG8u3',
//     description: 'Крыльцо и козырьки',
//   },
// ];

const PorchAndVisors = ({ setNameOfPage }) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Крыльцо,Козырьки');
  }, [setNameOfPage]);
  return (
    <Grid container className={classes.root}>
      <Helmet>
        <title>Крылечки</title>
        <link rel='canonical' href='https://zp-olimp-ds.herokuapp.com/' />
        <meta name='description' content='Главный по крылечкам Запорожья' />
      </Helmet>
      <Grid item className={classes.item}>
        <Typography variant='h3' align='center'>
          {' '}
          Крыльцо и Козырьки
        </Typography>
      </Grid>
      <Grid item className={classes.item}>
        <ListOfPhotos listOfFoto={listOfFoto} />
      </Grid>
    </Grid>
  );
};

PorchAndVisors.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
};

export default connect(null, { setNameOfPage })(PorchAndVisors);
