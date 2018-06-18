var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('layout', { title: 'Lista de Apostadores em Construcao' });
});

module.exports = router;
