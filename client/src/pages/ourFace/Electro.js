import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { setNameOfPage } from '../../store/actions/nameOfPage';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';

import img_001 from '../../images/Electro/001.jpg';
import img_002 from '../../images/Electro/002.jpg';
import img_003 from '../../images/Electro/003.jpg';
import img_004 from '../../images/Electro/004.jpg';
import img_005 from '../../images/Electro/005.jpg';
import img_006 from '../../images/Electro/006.jpg';
import img_007 from '../../images/Electro/007.jpg';

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
  { imgUrl: img_001, description: 'Щитовая' },
  { imgUrl: img_002, description: 'Щитовая' },
  { imgUrl: img_003, description: 'Щитовая' },
  { imgUrl: img_004, description: 'Щитовая' },
  { imgUrl: img_005, description: 'Щитовая' },
  { imgUrl: img_006, description: 'Щитовая' },
  { imgUrl: img_007, description: 'Щитовая' },
];

// const listOfFoto = [
//   {
//     imgUrl: 'https://drive.google.com/uc?id=1LZq3NeIDl_cZWBxWjTQ-QmNkFKnwCdF7',
//     description: 'Щитовая',
//   },

//   {
//     imgUrl: 'https://drive.google.com/uc?id=11v6IcjuLIJ28aiz0xo0y5_yhabW6ONyJ',
//     description: 'Щитовая',
//   },

//   {
//     imgUrl: 'https://drive.google.com/uc?id=1ceOITRueS_gB5sf49QBbnK8BS4ijYF1Y',
//     description: 'Щитовая',
//   },

//   {
//     imgUrl: 'https://drive.google.com/uc?id=1g6CkbyPgxznkQMPwQZodJ4aapfzfcswH',
//     description: 'Щитовая',
//   },

//   {
//     imgUrl: 'https://drive.google.com/uc?id=12LDyv0KJU_b4GgSLkUzuvyKHdyo6fyKd',
//     description: 'Щитовая',
//   },

//   {
//     imgUrl: 'https://drive.google.com/uc?id=1HM3sTWnHHck_srbqbFAMxy3QJ3oNlxE3',
//     description: 'Щитовая',
//   },

//   {
//     imgUrl: 'https://drive.google.com/uc?id=1ZkSv4QTltrsZh5g6YH1v2x10B57co6fk',
//     description: 'Щитовая',
//   },
// ];

const Electro = ({ setNameOfPage }) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Электро');
  }, [setNameOfPage]);
  return (
    <Grid container className={classes.root}>
      <Helmet>
        <title>Електро работы</title>
        <link rel='canonical' href='https://zp-olimp-ds.herokuapp.com/' />
        <meta name='description' content='Главный электрик Запорожья' />
      </Helmet>
      <Grid item className={classes.item}>
        <Typography variant='h3' align='center'>
          {' '}
          Электро работы
        </Typography>
      </Grid>
      <Grid item className={classes.item}>
        <ListOfPhotos listOfFoto={listOfFoto} />
      </Grid>
    </Grid>
  );
};

Electro.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
};

export default connect(null, { setNameOfPage })(Electro);
