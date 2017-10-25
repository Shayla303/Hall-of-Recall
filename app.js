const express = require('express');
const db = require('./db/queries');
const app = express();
const port = process.env.PORT || 3000;
var path = require('path');
var bodyParser = require('body-parser');
var knex = require('knex');
var pg = require('pg');

//routes
// var index = require('./routes/index');
// var users = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));


// app.post('/api/users', (req, res, next) => {
// 	db.createUser(req.body)
// 		.then(user => res.status(201).json(user))
// 		.catch(err => res.status(500).send(err));
// });
// if you send login to postman
// app.post('/api/users/login', (req, res, next) => {
// 	db.login(req.body.code)
// 		.then(user => {
// //if there is no user...
// 			if(!user) {
// 				res.sendStatus(401);
// 			}
// //if there is a user...
// 			else {
// 				res.json(user);
// 			}
// 		})
// // if anything else happens outside of the .get request
// 		.catch(err => {
// 			res.status(500).send(err);
// 		});
// });
app.get('/api/users/:id', (req, res, next) => {
  var id = req.params.id;
	db.getUserById(id)
		.then((user) => {
			if(!user) {
				res.sendStatus(401);
			}
			else {
        res.json({data:user});
			}
		})
		.catch(err => res.status(500).send(err));
});

app.get('/', (req,res) => {
  res.render('auth');
});
app.get('/index', (req,res) => {
  res.render('index');
});
app.get('/game', (req,res) => {
  res.render('game');
});
app.get('/howto', (req,res) => {
  res.render('howto');
});
// app.use('/index', index);
// app.use('/users', users);

// app.get('/', (req,res) => {
//   res.render('auth');
// })




// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.listen(port, () => {
  console.log(`Api listening on port 3000`);
});

module.exports = app;
