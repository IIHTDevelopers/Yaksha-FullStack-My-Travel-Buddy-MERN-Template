var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var app = express();

var bookingRouter = require('./modules/booking/routes/booking.routes');
var destinationRouter = require('./modules/destination/routes/destination.routes');
var reviewRouter = require('./modules/review/routes/review.routes');
var tripPlanRouter = require('./modules/trip-plan/routes/trip-plan.routes');
var userRouter = require('./modules/user/routes/user.routes');
var authRouter = require('./modules/auth/route/auth.routes')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// need to add routes here
app.use('/api/auth', authRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/destinations', destinationRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/trips', tripPlanRouter);
app.use('/api/users', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
