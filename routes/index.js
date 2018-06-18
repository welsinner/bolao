var express = require('express');
var router = express.Router();

var db = require('../repo/queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bolao ASES da Copa 2018' });
});

/* GET API */
router.get('/api/palpites', db.getPalpites);
router.get('/api/palpites/:apostador', db.getPalpitesApostador);
router.get('/api/palpite/:id', db.getPalpite);
router.get('/api/ranking', db.getRanking);
router.get('/api/apostadores', db.getApostadores);

module.exports = router;
