import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../store/actions/nameOfPage';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

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
      <Grid item className={classes.item}>
        <Typography variant='h2' align='center'>
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
            <Typography variant='h4'> Асфальтные работы</Typography>
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
            <Typography variant='h4'>Электромонтажные работы</Typography>
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
