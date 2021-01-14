import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../store/actions/nameOfPage';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import landing_alpinist from '../../images/landing_alpinist.jpg';
// import landing_alpinist_2 from '../../images/landing_alpinist_2.jpg';
import landing_electro from '../../images/landing_electro.jpg';
// import landing_electro2 from '../../images/landing_electro2.jpg';
import landing_groundfloor from '../../images/landing_groundfloor.jpeg';
import landing_metall from '../../images/landing_metall.jpg';
import landing_plumbing from '../../images/landing_plumbing.jpg';
import landing_porch from '../../images/landing_porch.jpg';
import landing_roof from '../../images/landing_roof.jpg';
// import landing_roof2 from '../../images/landing_roof2.jpg';
import landing_windows from '../../images/landing_windows.jpg';
import landing_asfalt from '../../images/landing_asfalt.jpg';
import landing_entrance from '../../images/landing_entrance.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2em',
  },
  item: {},
  asfalt: {},
  electro: {},
  groundFloor: {},
  alpinist: {
    // backgroundImage: `url(${landing_alpinist}) `,
    // backgroundRepeat: 'no-repeat',
    // backgroundSize: 'cover',
    // backgroundAttachment: 'fixed',
    // color: '#FFF',
  },
  plumbing: {},
  porch: {},
  entrance: {},
  roofing: {},
  metall: {},
  windowDoor: {},

  wrapHeader: {},
  wrapDescription: {},
  wrapPhoto: {},
  img: { width: '50em', height: '25em', objectFit: 'cover' },
}));

const Landing = ({ setNameOfPage }) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Главная');
  }, [setNameOfPage]);

  return (
    <Grid container className={classes.root} justify='flex-start'>
      <Grid item className={classes.item}>
        <Grid
          container
          direction='column'
          className={classes.asfalt}
          justify='flex-start'
          alignItems='center'
        >
          <Grid item className={classes.wrapHeader}>
            <Typography variant='h4'>Асфальт</Typography>
          </Grid>
          <Grid item className={classes.wrapDescription}>
            <Typography variant='body1'>
              {' '}
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis debitis porro, atque at cupiditate nostrum itaque
              quidem, libero, officiis cumque molestias quas dolores. Quidem
              enim cum accusamus aperiam, voluptatum voluptate!Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Perspiciatis debitis porro,
              atque at cupiditate nostrum itaque quidem, libero, officiis cumque
              molestias quas dolores. Quidem enim cum accusamus aperiam,
              voluptatum voluptate!Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Perspiciatis debitis porro, atque at cupiditate
              nostrum itaque quidem, libero, officiis cumque molestias quas
              dolores. Quidem enim cum accusamus aperiam, voluptatum
              voluptate!Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis debitis porro, atque at cupiditate nostrum itaque
              quidem, libero, officiis cumque molestias quas dolores. Quidem
              enim cum accusamus aperiam, voluptatum voluptate!Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Perspiciatis debitis porro,
              atque at cupiditate nostrum itaque quidem, libero, officiis cumque
              molestias quas dolores. Quidem enim cum accusamus aperiam,
              voluptatum voluptate!
            </Typography>
          </Grid>
          <Grid item className={classes.wrapPhoto}>
            <img src={landing_asfalt} alt='Асфальт' className={classes.img} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item className={classes.item}>
        <Grid
          container
          direction='column'
          className={classes.electro}
          justify='flex-start'
          alignItems='center'
        >
          <Grid item className={classes.wrapHeader}>
            <Typography variant='h4'>Электро</Typography>
          </Grid>
          <Grid item className={classes.wrapDescription}>
            <Typography variant='body1'>
              {' '}
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis debitis porro, atque at cupiditate nostrum itaque
              quidem, libero, officiis cumque molestias quas dolores. Quidem
              enim cum accusamus aperiam, voluptatum voluptate!Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Perspiciatis debitis porro,
              atque at cupiditate nostrum itaque quidem, libero, officiis cumque
              molestias quas dolores. Quidem enim cum accusamus aperiam,
              voluptatum voluptate!Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Perspiciatis debitis porro, atque at cupiditate
              nostrum itaque quidem, libero, officiis cumque molestias quas
              dolores. Quidem enim cum accusamus aperiam, voluptatum
              voluptate!Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis debitis porro, atque at cupiditate nostrum itaque
              quidem, libero, officiis cumque molestias quas dolores. Quidem
              enim cum accusamus aperiam, voluptatum voluptate!Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Perspiciatis debitis porro,
              atque at cupiditate nostrum itaque quidem, libero, officiis cumque
              molestias quas dolores. Quidem enim cum accusamus aperiam,
              voluptatum voluptate!
            </Typography>
          </Grid>
          <Grid item className={classes.wrapPhoto}>
            <img src={landing_electro} alt='Электро' className={classes.img} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item className={classes.item}>
        <Grid
          container
          direction='column'
          className={classes.groundFloor}
          justify='flex-start'
          alignItems='center'
        >
          <Grid item className={classes.wrapHeader}>
            <Typography variant='h4'>Цоколь и Ливневки</Typography>
          </Grid>
          <Grid item className={classes.wrapDescription}>
            <Typography variant='body1'>
              {' '}
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis debitis porro, atque at cupiditate nostrum itaque
              quidem, libero, officiis cumque molestias quas dolores. Quidem
              enim cum accusamus aperiam, voluptatum voluptate!Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Perspiciatis debitis porro,
              atque at cupiditate nostrum itaque quidem, libero, officiis cumque
              molestias quas dolores. Quidem enim cum accusamus aperiam,
              voluptatum voluptate!Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Perspiciatis debitis porro, atque at cupiditate
              nostrum itaque quidem, libero, officiis cumque molestias quas
              dolores. Quidem enim cum accusamus aperiam, voluptatum
              voluptate!Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis debitis porro, atque at cupiditate nostrum itaque
              quidem, libero, officiis cumque molestias quas dolores. Quidem
              enim cum accusamus aperiam, voluptatum voluptate!Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Perspiciatis debitis porro,
              atque at cupiditate nostrum itaque quidem, libero, officiis cumque
              molestias quas dolores. Quidem enim cum accusamus aperiam,
              voluptatum voluptate!
            </Typography>
          </Grid>
          <Grid item className={classes.wrapPhoto}>
            <img
              src={landing_groundfloor}
              alt='Цоколь и Ливневки'
              className={classes.img}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item className={classes.item}>
        <Grid
          container
          direction='column'
          className={classes.alpinist}
          justify='flex-start'
          alignItems='center'
        >
          <Grid item className={classes.wrapHeader}>
            <Typography variant='h4'>Высотные работы</Typography>
          </Grid>
          <Grid item className={classes.wrapDescription}>
            <Typography variant='body1'>
              {' '}
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis debitis porro, atque at cupiditate nostrum itaque
              quidem, libero, officiis cumque molestias quas dolores. Quidem
              enim cum accusamus aperiam, voluptatum voluptate!Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Perspiciatis debitis porro,
              atque at cupiditate nostrum itaque quidem, libero, officiis cumque
              molestias quas dolores. Quidem enim cum accusamus aperiam,
              voluptatum voluptate!Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Perspiciatis debitis porro, atque at cupiditate
              nostrum itaque quidem, libero, officiis cumque molestias quas
              dolores. Quidem enim cum accusamus aperiam, voluptatum
              voluptate!Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis debitis porro, atque at cupiditate nostrum itaque
              quidem, libero, officiis cumque molestias quas dolores. Quidem
              enim cum accusamus aperiam, voluptatum voluptate!Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Perspiciatis debitis porro,
              atque at cupiditate nostrum itaque quidem, libero, officiis cumque
              molestias quas dolores. Quidem enim cum accusamus aperiam,
              voluptatum voluptate!
            </Typography>
          </Grid>
          <Grid item className={classes.wrapPhoto}>
            <img
              src={landing_alpinist}
              alt='Высотные работы'
              className={classes.img}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item className={classes.item}>
        <Grid
          container
          direction='column'
          className={classes.plumbing}
          justify='flex-start'
          alignItems='center'
        >
          <Grid item className={classes.wrapHeader}>
            <Typography variant='h4'>Сантехнические работы</Typography>
          </Grid>
          <Grid item className={classes.wrapDescription}>
            <Typography variant='body1'>
              {' '}
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis debitis porro, atque at cupiditate nostrum itaque
              quidem, libero, officiis cumque molestias quas dolores. Quidem
              enim cum accusamus aperiam, voluptatum voluptate!Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Perspiciatis debitis porro,
              atque at cupiditate nostrum itaque quidem, libero, officiis cumque
              molestias quas dolores. Quidem enim cum accusamus aperiam,
              voluptatum voluptate!Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Perspiciatis debitis porro, atque at cupiditate
              nostrum itaque quidem, libero, officiis cumque molestias quas
              dolores. Quidem enim cum accusamus aperiam, voluptatum
              voluptate!Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis debitis porro, atque at cupiditate nostrum itaque
              quidem, libero, officiis cumque molestias quas dolores. Quidem
              enim cum accusamus aperiam, voluptatum voluptate!Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Perspiciatis debitis porro,
              atque at cupiditate nostrum itaque quidem, libero, officiis cumque
              molestias quas dolores. Quidem enim cum accusamus aperiam,
              voluptatum voluptate!
            </Typography>
          </Grid>
          <Grid item className={classes.wrapPhoto}>
            <img
              src={landing_plumbing}
              alt='Сантехнические работы'
              className={classes.img}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item className={classes.item}>
        <Grid
          container
          direction='column'
          className={classes.porch}
          justify='flex-start'
          alignItems='center'
        >
          <Grid item className={classes.wrapHeader}>
            <Typography variant='h4'>Крыльцо и козырьки</Typography>
          </Grid>
          <Grid item className={classes.wrapDescription}>
            <Typography variant='body1'>
              {' '}
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis debitis porro, atque at cupiditate nostrum itaque
              quidem, libero, officiis cumque molestias quas dolores. Quidem
              enim cum accusamus aperiam, voluptatum voluptate!Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Perspiciatis debitis porro,
              atque at cupiditate nostrum itaque quidem, libero, officiis cumque
              molestias quas dolores. Quidem enim cum accusamus aperiam,
              voluptatum voluptate!Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Perspiciatis debitis porro, atque at cupiditate
              nostrum itaque quidem, libero, officiis cumque molestias quas
              dolores. Quidem enim cum accusamus aperiam, voluptatum
              voluptate!Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis debitis porro, atque at cupiditate nostrum itaque
              quidem, libero, officiis cumque molestias quas dolores. Quidem
              enim cum accusamus aperiam, voluptatum voluptate!Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Perspiciatis debitis porro,
              atque at cupiditate nostrum itaque quidem, libero, officiis cumque
              molestias quas dolores. Quidem enim cum accusamus aperiam,
              voluptatum voluptate!
            </Typography>
          </Grid>
          <Grid item className={classes.wrapPhoto}>
            <img
              src={landing_porch}
              alt='Крыльцо и козырьки'
              className={classes.img}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item className={classes.item}>
        <Grid
          container
          direction='column'
          className={classes.entrance}
          justify='flex-start'
          alignItems='center'
        >
          <Grid item className={classes.wrapHeader}>
            <Typography variant='h4'>Ремонт подъездов</Typography>
          </Grid>
          <Grid item className={classes.wrapDescription}>
            <Typography variant='body1'>
              {' '}
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis debitis porro, atque at cupiditate nostrum itaque
              quidem, libero, officiis cumque molestias quas dolores. Quidem
              enim cum accusamus aperiam, voluptatum voluptate!Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Perspiciatis debitis porro,
              atque at cupiditate nostrum itaque quidem, libero, officiis cumque
              molestias quas dolores. Quidem enim cum accusamus aperiam,
              voluptatum voluptate!Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Perspiciatis debitis porro, atque at cupiditate
              nostrum itaque quidem, libero, officiis cumque molestias quas
              dolores. Quidem enim cum accusamus aperiam, voluptatum
              voluptate!Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis debitis porro, atque at cupiditate nostrum itaque
              quidem, libero, officiis cumque molestias quas dolores. Quidem
              enim cum accusamus aperiam, voluptatum voluptate!Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Perspiciatis debitis porro,
              atque at cupiditate nostrum itaque quidem, libero, officiis cumque
              molestias quas dolores. Quidem enim cum accusamus aperiam,
              voluptatum voluptate!
            </Typography>
          </Grid>
          <Grid item className={classes.wrapPhoto}>
            <img
              src={landing_entrance}
              alt='Ремонт подъездов'
              className={classes.img}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item className={classes.item}>
        <Grid
          container
          direction='column'
          className={classes.roofing}
          justify='flex-start'
          alignItems='center'
        >
          <Grid item className={classes.wrapHeader}>
            <Typography variant='h4'>Кровельные работы</Typography>
          </Grid>
          <Grid item className={classes.wrapDescription}>
            <Typography variant='body1'>
              {' '}
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis debitis porro, atque at cupiditate nostrum itaque
              quidem, libero, officiis cumque molestias quas dolores. Quidem
              enim cum accusamus aperiam, voluptatum voluptate!Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Perspiciatis debitis porro,
              atque at cupiditate nostrum itaque quidem, libero, officiis cumque
              molestias quas dolores. Quidem enim cum accusamus aperiam,
              voluptatum voluptate!Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Perspiciatis debitis porro, atque at cupiditate
              nostrum itaque quidem, libero, officiis cumque molestias quas
              dolores. Quidem enim cum accusamus aperiam, voluptatum
              voluptate!Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis debitis porro, atque at cupiditate nostrum itaque
              quidem, libero, officiis cumque molestias quas dolores. Quidem
              enim cum accusamus aperiam, voluptatum voluptate!Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Perspiciatis debitis porro,
              atque at cupiditate nostrum itaque quidem, libero, officiis cumque
              molestias quas dolores. Quidem enim cum accusamus aperiam,
              voluptatum voluptate!
            </Typography>
          </Grid>
          <Grid item className={classes.wrapPhoto}>
            <img
              src={landing_roof}
              alt='Кровельные работы'
              className={classes.img}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item className={classes.item}>
        <Grid
          container
          direction='column'
          className={classes.metall}
          justify='flex-start'
          alignItems='center'
        >
          <Grid item className={classes.wrapHeader}>
            <Typography variant='h4'>Металлоконструкции</Typography>
          </Grid>
          <Grid item className={classes.wrapDescription}>
            <Typography variant='body1'>
              {' '}
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis debitis porro, atque at cupiditate nostrum itaque
              quidem, libero, officiis cumque molestias quas dolores. Quidem
              enim cum accusamus aperiam, voluptatum voluptate!Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Perspiciatis debitis porro,
              atque at cupiditate nostrum itaque quidem, libero, officiis cumque
              molestias quas dolores. Quidem enim cum accusamus aperiam,
              voluptatum voluptate!Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Perspiciatis debitis porro, atque at cupiditate
              nostrum itaque quidem, libero, officiis cumque molestias quas
              dolores. Quidem enim cum accusamus aperiam, voluptatum
              voluptate!Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis debitis porro, atque at cupiditate nostrum itaque
              quidem, libero, officiis cumque molestias quas dolores. Quidem
              enim cum accusamus aperiam, voluptatum voluptate!Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Perspiciatis debitis porro,
              atque at cupiditate nostrum itaque quidem, libero, officiis cumque
              molestias quas dolores. Quidem enim cum accusamus aperiam,
              voluptatum voluptate!
            </Typography>
          </Grid>
          <Grid item className={classes.wrapPhoto}>
            <img
              src={landing_metall}
              alt='Металлоконструкции'
              className={classes.img}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item className={classes.item}>
        <Grid
          container
          direction='column'
          className={classes.windowDoor}
          justify='flex-start'
          alignItems='center'
        >
          <Grid item className={classes.wrapHeader}>
            <Typography variant='h4'>
              Окна и двери металлопластиковые
            </Typography>
          </Grid>
          <Grid item className={classes.wrapDescription}>
            <Typography variant='body1'>
              {' '}
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis debitis porro, atque at cupiditate nostrum itaque
              quidem, libero, officiis cumque molestias quas dolores. Quidem
              enim cum accusamus aperiam, voluptatum voluptate!Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Perspiciatis debitis porro,
              atque at cupiditate nostrum itaque quidem, libero, officiis cumque
              molestias quas dolores. Quidem enim cum accusamus aperiam,
              voluptatum voluptate!Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Perspiciatis debitis porro, atque at cupiditate
              nostrum itaque quidem, libero, officiis cumque molestias quas
              dolores. Quidem enim cum accusamus aperiam, voluptatum
              voluptate!Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis debitis porro, atque at cupiditate nostrum itaque
              quidem, libero, officiis cumque molestias quas dolores. Quidem
              enim cum accusamus aperiam, voluptatum voluptate!Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Perspiciatis debitis porro,
              atque at cupiditate nostrum itaque quidem, libero, officiis cumque
              molestias quas dolores. Quidem enim cum accusamus aperiam,
              voluptatum voluptate!
            </Typography>
          </Grid>
          <Grid item className={classes.wrapPhoto}>
            <img
              src={landing_windows}
              alt='Окна и двери металлопластиковые'
              className={classes.img}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

Landing.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
};

export default connect(null, { setNameOfPage })(Landing);
