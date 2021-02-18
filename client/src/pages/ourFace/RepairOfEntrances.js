import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { setNameOfPage } from '../../store/actions/nameOfPage';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';

import img_001 from '../../images/Entrance/001.jpg';
import img_002 from '../../images/Entrance/002.jpg';
import img_003 from '../../images/Entrance/003.jpg';
import img_004 from '../../images/Entrance/004.jpg';
import img_005 from '../../images/Entrance/005.jpg';
import img_006 from '../../images/Entrance/006.jpg';
import img_007 from '../../images/Entrance/007.jpg';
import img_008 from '../../images/Entrance/008.jpg';
import img_009 from '../../images/Entrance/009.jpg';
import img_010 from '../../images/Entrance/010.jpg';
import img_011 from '../../images/Entrance/011.jpg';
import img_012 from '../../images/Entrance/012.jpg';
import img_013 from '../../images/Entrance/013.jpg';
import img_014 from '../../images/Entrance/014.jpg';
import img_015 from '../../images/Entrance/015.jpg';

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
  { imgUrl: img_001, description: 'Ремонт подъезда' },
  { imgUrl: img_002, description: 'Ремонт подъезда' },
  { imgUrl: img_003, description: 'Ремонт подъезда' },
  { imgUrl: img_004, description: 'Ремонт подъезда' },
  { imgUrl: img_005, description: 'Ремонт подъезда' },
  { imgUrl: img_006, description: 'Ремонт подъезда' },
  { imgUrl: img_007, description: 'Ремонт подъезда' },
  { imgUrl: img_008, description: 'Ремонт подъезда' },
  { imgUrl: img_009, description: 'Ремонт подъезда' },
  { imgUrl: img_010, description: 'Ремонт подъезда' },
  { imgUrl: img_011, description: 'Ремонт подъезда' },
  { imgUrl: img_012, description: 'Ремонт подъезда' },
  { imgUrl: img_013, description: 'Ремонт подъезда' },
  { imgUrl: img_014, description: 'Ремонт подъезда' },
  { imgUrl: img_015, description: 'Ремонт подъезда' },
];

const RepairOfEntrance = ({ setNameOfPage }) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Подъезды');
  }, [setNameOfPage]);

  return (
    <Grid container className={classes.root}>
      <Helmet>
        <title>Ремонт подъездов</title>
        <link rel='canonical' href='https://zp-olimp-ds.herokuapp.com/' />
        <meta
          name='description'
          content='Главный ремонтник подъездов Запорожья'
        />
      </Helmet>

      <Grid item className={classes.item}>
        <Typography variant='h3' align='center'>
          {' '}
          Ремонт подъездов
        </Typography>
      </Grid>
      <Grid item className={classes.item}>
        <ListOfPhotos listOfFoto={listOfFoto} />
      </Grid>
    </Grid>
  );
};

RepairOfEntrance.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
};

export default connect(null, { setNameOfPage })(RepairOfEntrance);
