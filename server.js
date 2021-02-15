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
app.use(cors());

createProxyMiddleware('http://localhost:3000/api/**');

/////////////////////////////////////////////////////////
//Route file
////////User////////
const auth = require('./routes/user/auth/auth');

////////Admin////////
const adminUsers = require('./routes/user/admin/adminUsers');

//////////////////reference data///////////////////////////////////
const worker = require('./routes/referenceData/worker');
const unit = require('./routes/referenceData/unit');
const type_Firm = require('./routes/referenceData/type_Firm');
const serviceJob = require('./routes/referenceData/serviceJob');
const product = require('./routes/referenceData/product');
const group_serviceJob = require('./routes/referenceData/group_serviceJob');
const group_product = require('./routes/referenceData/group_product');
const group_expense = require('./routes/referenceData/group_expense');
const firm = require('./routes/referenceData/firm');

///////////////ACCOUNTANT/////////////////////////////////

///////////////our Products and Works /////////////////////////////////
const ourNakl = require('./routes/accountant/ourProductsWorks/ourNakl');

///////////////expenses /////////////////////////////////
const expense = require('./routes/accountant/expenses/expense');

/////////////////////////////////////////////////////
//Mount routes
/////USER/////
app.use('/api/auth', auth);

////////Admin////////
app.use('/api/user-admin', adminUsers);

//////////////////reference data///////////////////////////////////
app.use('/api/reference-data/worker', worker);
app.use('/api/reference-data/unit', unit);
app.use('/api/reference-data/type-firm', type_Firm);
app.use('/api/reference-data/service-job', serviceJob);
app.use('/api/reference-data/product', product);
app.use('/api/reference-data/group-service-job', group_serviceJob);
app.use('/api/reference-data/group-product', group_product);
app.use('/api/reference-data/group-expense', group_expense);
app.use('/api/reference-data/firm', firm);

///////////////ACCOUNTANT/////////////////////////////////

///////////////our Products and Works /////////////////////////////////
app.use('/api/accountant/our-products-works/our-nakl', ourNakl);

app.use('/api/accountant/expenses/expense', expense);

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
