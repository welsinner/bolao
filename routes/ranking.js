var express = require('express');
var request = require('request');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  // recuperar apostadores
  var apiURL = process.env.API_URL;
  request.get(apiURL + "/ranking", function(error, response, body) {
    if(error) {
      return console.dir(error);
    }
  
    // exibir lista
    var dados = JSON.parse(body);
    console.log(dados);
    res.render('ranking', { title: 'Ranking do Bolao da Copa 2018', ranking: dados.data });
  });
  
});

router.get('/atualiza', function(req, res, next) {
  
  // chamar api de atualizacao
  var apiURL = process.env.API_URL;
  request.put(apiURL + "/ranking", function(error, response, body) {
    if(error) {
      return console.dir(error);
    }
  
    res.render('layout', { title: 'Ranking atualizado com sucesso.'} );
  });
  
});


module.exports = router;
