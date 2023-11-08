// Roteador da aplicação
const roteadorRelatorio = require('express').Router();

// Função para autenticar usuário
const autenticacao = require('../middlewares/autenticacao');

// Controlador de clientes
const ConsultasController = require('../controllers/ConsultasController');
const Consultas = new ConsultasController();

roteadorRelatorio.route('/relatorio').get(autenticacao, Consultas.relatorio);

module.exports = roteadorRelatorio;