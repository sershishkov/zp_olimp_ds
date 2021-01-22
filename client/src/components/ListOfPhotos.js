import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2em',
  },
}));

const ListOfPhotos = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <GridList
      cellHeight={380}
      cols={matchesSM ? 1 : matchesMD ? 2 : 3}
      className={classes.gridList}
    >
      {props.listOfFoto &&
        props.listOfFoto.map((item) => (
          <GridListTile key={item.imgUrl}>
            <img src={item.imgUrl} alt={item.description} />
            <GridListTileBar title={item.description} />
          </GridListTile>
        ))}
    </GridList>
  );
};

export default ListOfPhotos;
