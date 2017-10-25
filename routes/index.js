
// var express = require('express');
// var router = express.Router();
// const db = require('../db/connection')
//
//
//
// /* GET home page. */
// // router.get('/', function(req, res, next) {
// //   res.render('index', { title: 'Express' });
// // });
//
// module.exports = router;
=======
var express = require('express');
var router = express.Router();
const db = require('../db/knex');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', {title: 'Express'});
// });

module.exports = router;
