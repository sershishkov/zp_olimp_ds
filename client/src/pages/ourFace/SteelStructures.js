import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../store/actions/nameOfPage';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import useMediaQuery from '@material-ui/core/useMediaQuery';
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

const SteelStructures = ({ setNameOfPage }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setNameOfPage('Металл...');
  }, [setNameOfPage]);
  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.item}>
        <Typography variant='h3' align='center'>
          {' '}
          Изделия из металла
        </Typography>
      </Grid>
      <Grid itemclassName={classes.item}>
        <GridList
          cellHeight={380}
          cols={matchesSM ? 1 : matchesMD ? 2 : 3}
          className={classes.gridList}
        >
          {listOfFoto &&
            listOfFoto.map((item) => (
              <GridListTile key={item.imgUrl}>
                <img src={item.imgUrl} alt={item.description} />
                <GridListTileBar title={item.description} />
              </GridListTile>
            ))}
        </GridList>
      </Grid>
    </Grid>
  );
};

SteelStructures.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
};

export default connect(null, { setNameOfPage })(SteelStructures);
