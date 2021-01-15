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
import img_001 from '../../images/Porch/001.jpg';
import img_002 from '../../images/Porch/002.jpg';
import img_003 from '../../images/Porch/003.jpg';
import img_004 from '../../images/Porch/004.jpg';
import img_005 from '../../images/Porch/005.jpg';
import img_006 from '../../images/Porch/006.jpg';

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

const PorchAndVisors = ({ setNameOfPage }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setNameOfPage('Крыльцо,Козырьки');
  }, [setNameOfPage]);
  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.item}>
        <Typography variant='h3' align='center'>
          {' '}
          Крыльцо и Козырьки
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

PorchAndVisors.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
};

export default connect(null, { setNameOfPage })(PorchAndVisors);
