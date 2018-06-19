var express = require('express');
var request = require('request');
var router = express.Router();

/* GET users listing. */
router.get('/:apostador', function(req, res, next) {
  
  // valida parametros
  var apostador = req.params.apostador;
  if (!apostador) { 
    res.status(500);
    res.send({"Error": "Favor indicar o nome do apostador."}); 
    console.log("Favor indicar o nome do apostador."); 
  }

  // recuperar apostadores
  var host = "http://localhost:3000/api/palpites/" + apostador
  request.get(host, function(error, response, body) {
    if(error) {
      return console.dir(error);
    }
  
    // exibir lista
    var dados = JSON.parse(body);
    console.log(dados);
    res.render('palpites', { title: 'Palpites do Bolao da Copa 2018', apostador: apostador, palpites: dados.data });
  });
  
});

module.exports = router;
