
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var database = require('./config/database');
import {createRoles} from './libs/initialSetup';

var auth = require('./auth/main_auth');
var cors = require('cors');

var empleadosRouter = require('./routes/empleados.router');
var clientesRouter = require('./routes/clientes.router');
var materialesRouter = require('./routes/materiales.router');
var usuariosRouter = require('./routes/usuarios.router');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
// Mongo conecction
database.mongoConnect();
createRoles();

app.use((req, res, next) => {
  //res.setHeader('Access-Control-Allow-Origin', 'https://main.d29galr7q12prd.amplifyapp.com/'); // Puedes restringir a un dominio específico en lugar de '*'
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
// Router
app.use('/usuarios', usuariosRouter);
//autorización
app.use(auth);
app.use('/empleados', empleadosRouter);
app.use('/clientes', clientesRouter);
app.use('/materiales', materialesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
