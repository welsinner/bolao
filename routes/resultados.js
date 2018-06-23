var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/atualiza', function(req, res, next) {
  
  // chamar api de atualizacao
  var resJogo = req.query.jogo;
  var resGolsA = req.query.golsA;
  var resGolsB = req.query.golsB;

  var apiURL = process.env.API_URL + "/palpite/" + resJogo + "?golsA=" + resGolsA + "&golsB=" + resGolsB;
  request.put(apiURL, function(error, response, body) {
    if(error) {
      return console.dir(error);
    }
  
    res.render('layout', { title: 'Resultado atualizado com sucesso.'} );
  });

});


module.exports = router;
