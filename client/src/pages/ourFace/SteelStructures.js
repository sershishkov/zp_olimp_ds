import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { setNameOfPage } from '../../store/actions/nameOfPage';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';

import img_001 from '../../images/Metall/001.jpg';
import img_002 from '../../images/Metall/002.jpg';
import img_003 from '../../images/Metall/003.jpg';
import img_004 from '../../images/Metall/004.jpg';
import img_005 from '../../images/Metall/005.jpg';
import img_006 from '../../images/Metall/006.jpg';
import img_007 from '../../images/Metall/007.jpg';
import img_008 from '../../images/Metall/008.jpg';
import img_009 from '../../images/Metall/009.jpg';
import img_010 from '../../images/Metall/010.jpg';
import img_011 from '../../images/Metall/011.jpg';
import img_012 from '../../images/Metall/012.jpg';
import img_013 from '../../images/Metall/013.jpg';

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
  { imgUrl: img_001, description: 'Конструкции из металла' },
  { imgUrl: img_002, description: 'Конструкции из металла' },
  { imgUrl: img_003, description: 'Конструкции из металла' },
  { imgUrl: img_004, description: 'Конструкции из металла' },
  { imgUrl: img_005, description: 'Конструкции из металла' },
  { imgUrl: img_006, description: 'Конструкции из металла' },
  { imgUrl: img_007, description: 'Конструкции из металла' },
  { imgUrl: img_008, description: 'Конструкции из металла' },
  { imgUrl: img_009, description: 'Конструкции из металла' },
  { imgUrl: img_010, description: 'Конструкции из металла' },
  { imgUrl: img_011, description: 'Конструкции из металла' },
  { imgUrl: img_012, description: 'Конструкции из металла' },
  { imgUrl: img_013, description: 'Конструкции из металла' },
];

// const listOfFoto = [
//   {
//     imgUrl: 'https://drive.google.com/uc?id=1bLWSFncjwQYZy0txQSSQTTij8BuBalRL',
//     description: 'Конструкции из металла',
//   },

//   {
//     imgUrl: 'https://drive.google.com/uc?id=1lC0RAuWd4D4BcHlKd2l9_6Taq0mYdOz6',
//     description: 'Конструкции из металла',
//   },

//   {
//     imgUrl: 'https://drive.google.com/uc?id=1l4TfnvD6WuqKRHBAy-OjwTwNWD_j2360',
//     description: 'Конструкции из металла',
//   },

//   {
//     imgUrl: 'https://drive.google.com/uc?id=1ASmWjJnTUs6w9YjioLhAm0RRsow2re5u',
//     description: 'Конструкции из металла',
//   },

//   {
//     imgUrl: 'https://drive.google.com/uc?id=1km8pQrcppOxzPX1r_U7ohxfktOUHUFN0',
//     description: 'Конструкции из металла',
//   },

//   {
//     imgUrl: 'https://drive.google.com/uc?id=1wN457_2zflegnYg12mzYTMBVxQoMun2v',
//     description: 'Конструкции из металла',
//   },

//   {
//     imgUrl: 'https://drive.google.com/uc?id=1fB11oTv65DoJxuznsArFeLN4h_plIOW9',
//     description: 'Конструкции из металла',
//   },

//   {
//     imgUrl: 'https://drive.google.com/uc?id=1J2_MMJBMbp4iVVNYarVz8Bnr-qalljSX',
//     description: 'Конструкции из металла',
//   },

//   {
//     imgUrl: 'https://drive.google.com/uc?id=1tLUol54kOV5x4Q8mOwJ5AVpu7ic7s7ax',
//     description: 'Конструкции из металла',
//   },

//   {
//     imgUrl: 'https://drive.google.com/uc?id=1YDywt_BvF25iK8-TqxhW-3PscHTfUsD4',
//     description: 'Конструкции из металла',
//   },

//   {
//     imgUrl: 'https://drive.google.com/uc?id=1mIgGWPut1IGkXyZT0cw2rqcXFbqSestW',
//     description: 'Конструкции из металла',
//   },

//   {
//     imgUrl: 'https://drive.google.com/uc?id=1k9B8P-mKd5vk1Fvsy7KuKuL0UmpmDdUZ',
//     description: 'Конструкции из металла',
//   },

//   {
//     imgUrl: 'https://drive.google.com/uc?id=1yrFlzCJuZsB5fFHgwGauMUKAYzYiE2_c',
//     description: 'Конструкции из металла',
//   },
// ];

const SteelStructures = ({ setNameOfPage }) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Металл...');
  }, [setNameOfPage]);
  return (
    <Grid container className={classes.root}>
      <Helmet>
        <title>Металлоконструкции</title>
        <link rel='canonical' href='https://zp-olimp-ds.herokuapp.com/' />
        <meta name='description' content='Главный металлист Запорожья' />
      </Helmet>
      <Grid item className={classes.item}>
        <Typography variant='h3' align='center'>
          {' '}
          Изделия из металла
        </Typography>
      </Grid>
      <Grid item className={classes.item}>
        <ListOfPhotos listOfFoto={listOfFoto} />
      </Grid>
    </Grid>
  );
};

SteelStructures.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
};

export default connect(null, { setNameOfPage })(SteelStructures);
