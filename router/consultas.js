// Roteador da aplicação
const roteadorConsultas = require('express').Router();

// Função para autenticar usuário
const autenticacao = require('../middlewares/autenticacao');

// Controlador de clientes
const ConsultasController = require('../controllers/ConsultasController');
const Consultas = new ConsultasController();


roteadorConsultas.route('/consultas').get(autenticacao, Consultas.buscar);
roteadorConsultas.route('/consultas').post(autenticacao, Consultas.criar);
roteadorConsultas.route('/consultas/:id/:status').patch(autenticacao, Consultas.status);

module.exports = roteadorConsultas;