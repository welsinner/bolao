var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
pgp.pg.defaults.ssl = true;
//var connectionString = 'postgres://postgres:postgres@localhost:5432/bolao';
var connectionString = process.env.DATABASE_URL;
var db = pgp(connectionString);

// add query functions
function getPalpites(req, res, next) {
  db.any('SELECT * FROM PALPITES')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Todos os palpites recuperados.'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getPalpitesApostador(req, res, next) {
  var nomeApostador = req.params.apostador;
  db.any('SELECT * FROM PALPITES WHERE PALP_NOME_APOSTADOR = $1 ORDER BY PALP_NR_JOGO', nomeApostador)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Todos os palpites de um apostador.'
        });
    })
    .catch(function (err) {
      console.log("Erro em getPalpitesApostador");
      console.log(err);
      return next(err);
    });
}

function getPalpite(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.one('SELECT * FROM PALPITES WHERE PALP_ID = $1', pupID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Um Palpite recuperado.'
        });
    })
    .catch(function (err) {
      console.log("Erro em getPalpite");
      console.log(err);
      return next(err);
    });
}

function updatePalpite(req, res, next) {
  //var palpiteID = parseInt(req.params.id);

  db.none('UPDATE RESULTADOS SET RESU_TIME_A_GOLS = $1, RESU_TIME_B_GOLS = $2 WHERE RESU_ID = $3',
    [parseInt(req.query.golsA), parseInt(req.query.golsB), parseInt(req.params.id)])
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Um Palpite atualizado.'
        });
    })
    .catch(function (err) {
      console.log("Erro em updatePalpite");
      console.log(err);
      return next(err);
    });
}

function getRanking(req, res, next) {
  db.any('SELECT PALP_NOME_APOSTADOR, SUM(PALP_PONTOS) AS TOTAL FROM PALPITES GROUP BY PALP_NOME_APOSTADOR ORDER BY TOTAL DESC, PALP_NOME_APOSTADOR')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Ranking do Bolao.'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateRanking(req, res, next) {
  db.func('UPDATE_RANKING')
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Ranking atualizado  .'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getApostadores(req, res, next) {
  db.any('SELECT DISTINCT(PALP_NOME_APOSTADOR) FROM PALPITES ORDER BY PALP_NOME_APOSTADOR;')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Todos os apostadores do bolao.'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


module.exports = {
  getPalpites: getPalpites,
  getPalpitesApostador: getPalpitesApostador,
  getPalpite: getPalpite,
  updatePalpite : updatePalpite,
  getRanking: getRanking,
  updateRanking : updateRanking,
  getApostadores: getApostadores
};