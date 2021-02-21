import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { setNameOfPage } from '../../store/actions/nameOfPage';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2em',
  },
  wrapVideo: {
    margin: 'auto',
    width: 560,
    height: 315,
    // border: '1px solid #ff0000',
  },
  video: {},
}));

const About = ({ setNameOfPage }) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('О нас');
  }, [setNameOfPage]);

  return (
    <Grid container className={classes.root} direction='column'>
      <Helmet>
        <title>ЗП ОЛИМП ДС</title>
        <link rel='canonical' href='https://zp-olimp-ds.herokuapp.com/' />
        <meta name='description' content='Главный ремонтник Запорожья' />
      </Helmet>

      {/* <Grid item className={classes.wrapVideo}>
        <Grid container justify='center' alignItems='center'>
          <Grid item>
            <video
              width='560'
              height='315'
              // muted
              // loop
              // autoplay
              controls
            >
              <source
                src='https://drive.google.com/uc?id=1ffwND-DwVj3o2e-aJcz0Y_UMyh3FGT4C'
                // type='video/mp4'
              />
            </video>
          </Grid>
        </Grid>
      </Grid> */}
      {/* <Grid item className={classes.wrapVideo}>
        <iframe
          title='Lj'
          width='560'
          height='315'
          src='https://www.youtube.com/embed/BRPrHBVmLqI'
          frameborder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowfullscreen
        ></iframe>
      </Grid> */}

      <Grid item>
        <Typography variant='h3' className={classes.header} align='center'>
          Компания Олимп - ДС
        </Typography>
        <Typography
          variant='h5'
          align='center'
          className={classes.description_main}
        >
          Наша компания осуществляет услуги по ремонтам для ОСББ, так же мы
          работаем с физическими лицами
        </Typography>
      </Grid>

      <Grid item style={{ marginBottom: '3em' }}>
        <Typography
          variant='h5'
          align='center'
          className={classes.description_main}
        >
          Основные наши направления:
        </Typography>
        <List>
          <ListItem>
            <Typography variant='h6' className={classes.groupOfWork}>
              Асфальтные работы
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='h6' className={classes.groupOfWork}>
              Аварийные работы
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='h6' className={classes.groupOfWork}>
              Ремонт подъездов
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='h6' className={classes.groupOfWork}>
              Кровельные работы
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='h6' className={classes.groupOfWork}>
              Крыльцо и козырьки подъездов
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='h6' className={classes.groupOfWork}>
              Высотные работы
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='h6' className={classes.groupOfWork}>
              Электромонтажные работы
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='h6' className={classes.groupOfWork}>
              Изготовление и установка металлоконструкций
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='h6' className={classes.groupOfWork}>
              Сантехнические работы
            </Typography>
          </ListItem>
        </List>
      </Grid>

      <Grid item>
        <Typography variant='h6' className={classes.groupOfWork} align='center'>
          Асфальтные работы
        </Typography>

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

      <Grid item>
        <Typography variant='h6' className={classes.groupOfWork} align='center'>
          Аварийные работы
        </Typography>
        <List>
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
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              ремонт сетей электроснабжения дома
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              сварочные работы по ремонту железных труб разного диаметра
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              запуск и консервация системы центрального отопления
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              ремонт контактных соединений и проводов в соединительных коробках
              и щитах
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              замена задвижек разного диаметра
            </Typography>
          </ListItem>
        </List>
      </Grid>

      <Grid item>
        <Typography variant='h6' className={classes.groupOfWork} align='center'>
          Ремонт подъездов
        </Typography>

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
      <Grid item>
        <Typography variant='h6' className={classes.groupOfWork} align='center'>
          Кровельные работы
        </Typography>

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

      <Grid item>
        <Typography variant='h6' className={classes.groupOfWork} align='center'>
          Высотные работы
        </Typography>

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

      <Grid item>
        <Typography variant='h6' className={classes.groupOfWork} align='center'>
          Электромонтажные работы
        </Typography>

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
              проверка и ревизия контактных соединений и состояния проводов в
              соединительных и видгалужуных коробках и щитах
            </Typography>
          </ListItem>
        </List>
      </Grid>

      <Grid item>
        <Typography variant='h6' className={classes.groupOfWork} align='center'>
          Сантехнические работы
        </Typography>

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
        </List>
      </Grid>

      <Grid item>
        <Grid
          container
          direction='row'
          justify='space-around'
          alignItems='center'
        >
          <Grid item>
            <Typography variant='h4' align='center'>
              связаться с нами:
            </Typography>
          </Grid>

          <Grid item>
            <Typography
              variant='body1'
              align='center'
              className={classes.phones}
            >
              +38 098 310 47 99
            </Typography>
            <Typography
              variant='body1'
              align='center'
              className={classes.phones}
            >
              +38 067 618 30 60
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant='body1'
              align='center'
              className={classes.phones}
            >
              +38 099 180 98 04
            </Typography>
            <Typography
              variant='body1'
              align='center'
              className={classes.phones}
            >
              +38 050 227 96 50
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

About.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
};

export default connect(null, { setNameOfPage })(About);
