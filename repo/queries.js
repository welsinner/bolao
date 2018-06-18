var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:postgres@localhost:5432/bolao';
var db = pgp(connectionString);

// add query functions
function getPalpites(req, res, next) {
  db.any('SELECT * FROM public."PALPITES"')
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
  db.any('SELECT * FROM public."PALPITES" WHERE "PALP_NOME_APOSTADOR" = $1', nomeApostador)
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
  db.one('SELECT * FROM public."PALPITES" WHERE "PALP_ID" = $1', pupID)
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

function getRanking(req, res, next) {
  db.any('SELECT "PALP_NOME_APOSTADOR", SUM("PALP_PONTOS") AS "TOTAL" FROM PUBLIC."PALPITES" GROUP BY "PALP_NOME_APOSTADOR" ORDER BY "TOTAL", "PALP_NOME_APOSTADOR"')
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

function getApostadores(req, res, next) {
  db.any('SELECT DISTINCT("PALP_NOME_APOSTADOR") FROM PUBLIC."PALPITES" ORDER BY "PALP_NOME_APOSTADOR";')
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
  getRanking: getRanking,
  getApostadores: getApostadores
  //createPuppy: createPuppy,
  //updatePuppy: updatePuppy,
  //removePuppy: removePuppy
};