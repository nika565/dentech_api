// Roteador principal da aplicação
const roteador = require('express').Router();

// Importando roteadores específicos
const roteadorTeste = require('./teste');

// Usando os roteadores
roteador.use(roteadorTeste);

module.exports = roteador;