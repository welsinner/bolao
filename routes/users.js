var express = require('express');
var request = require('request');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  // recuperar apostadores
  var apiURL = process.env.API_URL;
  request.get(apiURL+"/apostadores", function(error, response, body) {
    if(error) {
      return console.dir(error);
    }
  
    // exibir lista
    var dados = JSON.parse(body);
    console.log(dados);
    res.render('users', { title: 'Lista de Apostadores do Bolao da Copa 2018', apostadores: dados.data });
  });
  
});

module.exports = router;
