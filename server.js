const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const colors = require('colors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const errorHandler = require('./middleware/error');

const connectDB = require('./config/db');

// load env vars
dotenv.config({ path: './config/config.env' });

//connect to database
connectDB();

const app = express();

//Body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//Sanitize data
app.use(mongoSanitize());

//Set security headers
app.use(helmet());

//Prevent XSS attakes
app.use(xss());

//Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10 min
  max: 10000,
});
app.use(limiter);

//Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(
  cors()
  // cors({
  //   credentials: true,
  //   origin: ['http://localhost:3000'],
  //   optionsSuccessStatus: 200,
  // })
);
// const optionsProxy = {
//   target: 'http://localhost:3000', // target host
//   changeOrigin: true, // needed for virtual hosted sites
//   ws: true, // proxy websockets
//   pathRewrite: {
//     '^/api/old-path': '/api/new-path', // rewrite path
//     '^/api/remove/path': '/path', // remove base path
//   },
//   router: {
//     // when request.headers.host == 'dev.localhost:3000',
//     // override target 'http://www.example.org' to 'http://localhost:8000'
//     'dev.localhost:3000': 'http://localhost:8000',
//   },
// };

//or
// createProxyMiddleware('http://localhost:3000/api/**');
//or
// app.use(
//   '/api',
//   createProxyMiddleware({
//     target: 'http://localhost:3000',
//     changeOrigin: true,
//   })
// );

/////////////////////////////////////////////////////////
//Route file
////////User////////
const auth = require('./routes/user/auth/auth');
const menuLink = require('./routes/menuLink/menuLink');
const group_of_menuLink = require('./routes/menuLink/group_of__menuLink');

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
//Mount routes
/////USER/////
app.use('/api/auth', auth);
app.use('/api/menu-link', menuLink);
app.use('/api/group-of-menu-link', group_of_menuLink);

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// app.use('/uploads', express.static('uploads'));
app.use(errorHandler);

// serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV}  on port ${PORT}!`.yellow.bold
  );
});

// Handle unhandled promise rejection
process.on('unhandledRejection', (err, promice) => {
  console.log(`Error:${err.message}`.red);
  //Close server & exit process
  server.close(() => process.exit(1));
});
