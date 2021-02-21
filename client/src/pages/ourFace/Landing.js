import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { setNameOfPage } from '../../store/actions/nameOfPage';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import landing_alpinist from '../../images/landing/landing_alpinist.jpg';
// import landing_alpinist_2 from '../../images/landing/landing_alpinist_2.jpg';
import landing_electro from '../../images/landing/landing_electro.jpg';
// import landing_electro2 from '../../images/landing/landing_electro2.jpg';
import landing_groundfloor from '../../images/landing/landing_groundfloor.jpeg';
import landing_metall from '../../images/landing/landing_metall.jpg';
import landing_plumbing from '../../images/landing/landing_plumbing.jpg';
import landing_porch from '../../images/landing/landing_porch.jpg';
import landing_roof from '../../images/landing/landing_roof.jpg';
// import landing_roof2 from '../../images/landing/landing_roof2.jpg';
import landing_windows from '../../images/landing/landing_windows.jpg';
import landing_asfalt from '../../images/landing/landing_asfalt.jpg';
import landing_entrance from '../../images/landing/landing_entrance.jpg';

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
  wrapPhoto: {
    // border: '2px solid #F00',
    maxWidth: '70%',
  },
  img: {
    width: '100%',
  },
}));

const Landing = ({ setNameOfPage }) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Главная');
  }, [setNameOfPage]);

  return (
    <Grid
      container
      className={classes.root}
      justify='flex-start'
      alignItems='center'
    >
      <Helmet>
        {/* <html lang='en' /> */}
        {/* <meta charSet='utf-8' /> */}
        {/* <body className="dark" /> */}
        {/* <meta name='theme-color' content='#E6E6FA' /> */}
        {/* <base target="_blank" href="https://@@@.@@@.com/" /> */}
        <title>OLIMP-DS</title>
        <link rel='canonical' href='https://zp-olimp-ds.herokuapp.com/' />
        <meta name='description' content='Главный строитель Запорожья' />
      </Helmet>

      <Grid item className={classes.item}>
        <Typography variant='h3' align='center'>
          Компания ОЛИМП-ДС предоставляет услуги для ОСББ и физических лиц
        </Typography>
        <Typography variant='h4' align='center'>
          Наши работы :
        </Typography>
      </Grid>

      <Grid item className={classes.item}>
        <Grid
          container
          direction='column'
          className={classes.asfalt}
          justify='flex-start'
          alignItems='center'
        >
          <Grid item className={classes.wrapHeader}>
            <Typography variant='h4' align='center'>
              {' '}
              Асфальтные работы
            </Typography>
          </Grid>
          <Grid item className={classes.wrapDescription}>
            <List>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  Укладка асфальта
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  Установка бордюров и поребриков
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  Укладка тротуарной плитки
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  Укладка асфальтной крошки
                </Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid
            item
            className={classes.wrapPhoto}
            component={Link}
            to='/asfalt'
          >
            <img
              src={landing_asfalt}
              // src='https://drive.google.com/uc?id=1rA0-4W5ywtuFTs7InZhoIPSw5Ru8qd5e'
              alt='Асфальт'
              className={classes.img}
            />
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
            <Typography variant='h4' align='center'>
              Электромонтажные работы
            </Typography>
          </Grid>
          <Grid item className={classes.wrapDescription}>
            <List>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  ремонт и поиск неисправности в электропроводке
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  установка и замена щитового оборудования и его компонентов
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  монтаж и замена вводно-распределительного устройства
                  электропроводки осветительной арматуры электрощитовой
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  проверка и ревизия контактных соединений и состояния проводов
                  в соединительных и видгалужуных коробках и щитах
                </Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid
            item
            className={classes.wrapPhoto}
            component={Link}
            to='/electro'
          >
            <img
              src={landing_electro}
              // src='https://drive.google.com/uc?id=1S0kwp8q_Rvm1LmC--DIp_Zz4psJuY6HH'
              alt='Электро'
              className={classes.img}
            />
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
            <Typography variant='h4' align='center'>
              Цоколь и Ливневки
            </Typography>
          </Grid>
          <Grid item className={classes.wrapDescription}>
            <List>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  Ремонт цоколя
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  Штукатурка цоколя
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  Армировка цоколя
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  Утепление цоколя
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  Покраска цоколя
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  Устройство примыкания цоколя
                </Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid
            item
            className={classes.wrapPhoto}
            component={Link}
            to='/ground-floor-storm-water'
          >
            <img
              src={landing_groundfloor}
              // src='https://drive.google.com/uc?id=1_HvyfypFqcooybbGP7KrTFyEaXeiJR4W'
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
            <Typography variant='h4' align='center'>
              Высотные работы
            </Typography>
          </Grid>
          <Grid item className={classes.wrapDescription}>
            <List>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  Ремонт межпанельных швов
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  ремонт температурных швов
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  ремонт панелей дома
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  утепление домов пенопластом
                </Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid
            item
            className={classes.wrapPhoto}
            component={Link}
            to='/high-altitude-work'
          >
            <img
              src={landing_alpinist}
              // src='https://drive.google.com/uc?id=1WCri6z07oENFAGxjm45v5mXSlpJ0Fb3v'
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
            <Typography variant='h4' align='center'>
              Сантехнические работы
            </Typography>
          </Grid>
          <Grid item className={classes.wrapDescription}>
            <List>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  монтаж и замена трубопроводов и стояков горячего и голодного
                  водоснабжения
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  монтаж и замена системы канализации
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  монтаж и замена системы отопления
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  монтаж и замена задвижек
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant='body2' align='center'>
                  устранение протекания в трубопроводах ХВП ГВП отопления
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  устранение засоров внутридомовых водопроводных сетей и
                  канализационных выпусков
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  ремонт системы горячего водоснабжения (ГВП)
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  ремонт системы холодного водоснабжения (ХВП)
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  ремонт системы канализации
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  ремонт системы отопления
                </Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid
            item
            className={classes.wrapPhoto}
            component={Link}
            to='/plumbing-work'
          >
            <img
              src={landing_plumbing}
              // src='https://drive.google.com/uc?id=1AGMDV9NvrJ-a2GfX01JkL2i5mnUlK3z3'
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
            <Typography variant='h4' align='center'>
              Крыльцо и козырьки
            </Typography>
          </Grid>
          <Grid item className={classes.wrapDescription}>
            <List>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  Штукатурка крыльца
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  покраска крыльца
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  бетонирование ступенек и площадок крыльца
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  Замена кровельных материалов козырька
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  Изготовление и монтаж металлических козырьков
                </Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid
            item
            className={classes.wrapPhoto}
            component={Link}
            to='/porch-and-visors'
          >
            <img
              src={landing_porch}
              // src='https://drive.google.com/uc?id=1ca8XbCKNREhNizEcZ-VPR2_xTH5gyOyx'
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
            <Typography variant='h4' align='center'>
              Ремонт подъездов
            </Typography>
          </Grid>
          <Grid item className={classes.wrapDescription}>
            <List>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  Ремонт стен
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  Ремонт потолков
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  Покраска стен и потолков
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  Покраска перил
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  Замена окон на металлопластиковые
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  Замена дверей на металлопластиковые
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  Устройство откосов
                </Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid
            item
            className={classes.wrapPhoto}
            component={Link}
            to='/repair-of-entrance'
          >
            <img
              src={landing_entrance}
              // src='https://drive.google.com/uc?id=1kLYDhmp3zQb2PxM1qZnMN3U1-38_ICE6'
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
            <Typography variant='h4' align='center'>
              Кровельные работы
            </Typography>
          </Grid>
          <Grid item className={classes.wrapDescription}>
            <List>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  ремонт мягкой кровли
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  демонтаж и монтаж покрытия мягкой кровли
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  ремонт шиферных крыш
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  ремонт смотровых окон шиферных крыш
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  ремонт коньков шиферных крыш
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  ремонт и замена водосточной системы
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  демонтаж и монтаж кровель на основе металлоцерепицы
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  демонтаж и монтаж кровель на основе профнастила
                </Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid
            item
            className={classes.wrapPhoto}
            component={Link}
            to='/roofing-work'
          >
            <img
              src={landing_roof}
              // src='https://drive.google.com/uc?id=1j4o_wRIXLsBadekbbc5LodCFY0vwg2o6'
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
            <Typography variant='h4' align='center'>
              Металлоконструкции
            </Typography>
          </Grid>
          <Grid item className={classes.wrapDescription}>
            <List>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  Изготовление и монтаж металлических дверей
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  Изготовление и монтаж металлических ограждений для мусорных
                  контейнеров
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  Изготовление и монтаж металлических скамеек
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  Изготовление и монтаж металлических козырьков
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  Изготовление и монтаж металлических решеток для цоколя
                </Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid
            item
            className={classes.wrapPhoto}
            component={Link}
            to='/steel-structures'
          >
            <img
              src={landing_metall}
              // src='https://drive.google.com/uc?id=1hyYlSwpbNK2g1fC4J9j3OS0fmJ9Ynq2Y'
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
            <Typography variant='h4' align='center'>
              Окна и двери металлопластиковые
            </Typography>
          </Grid>
          <Grid item className={classes.wrapDescription}>
            <List>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  Монтаж окон металлопластиковых
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  Монтаж дверей металлопластиковых
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  Устройство откосов
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.descriptionOfWork}
                >
                  Монтаж металлических конструкций балконов с установкой окон
                </Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid
            item
            className={classes.wrapPhoto}
            component={Link}
            to='/windows-door-plastic'
          >
            <img
              src={landing_windows}
              // src='https://drive.google.com/uc?id=14GiFodZqV2oSgKWTQUr_4Mzx1qAV3leO'
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
