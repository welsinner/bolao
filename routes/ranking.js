var express = require('express');
var request = require('request');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  // recuperar apostadores
  request.get("http://localhost:3000/api/ranking", function(error, response, body) {
    if(error) {
      return console.dir(error);
    }
  
    // exibir lista
    var dados = JSON.parse(body);
    console.log(dados);
    res.render('ranking', { title: 'Ranking do Bolao da Copa 2018', ranking: dados.data });
  });
  
});

module.exports = router;
