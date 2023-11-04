const roteadorTeste = require('express').Router();

roteadorTeste.route('/teste').get((req, res) => res.json({msg: `Testando...`}));

module.exports = roteadorTeste;