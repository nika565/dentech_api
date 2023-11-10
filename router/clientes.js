// Roteador da aplicação
const roteadorClientes = require('express').Router();

// Função para autenticar usuário
const autenticacao = require('../middlewares/autenticacao');

// Controlador de clientes
const ClientesController = require('../controllers/ClientesController');
const Clientes = new ClientesController();


roteadorClientes.route('/clientes').get(autenticacao, Clientes.buscar);
roteadorClientes.route('/clientes').post(Clientes.cadastrar);
roteadorClientes.route('/clientes/:id').patch(Clientes.enviarEmail);
roteadorClientes.route('/clientes/:id').put(Clientes.alterarSenha);
roteadorClientes.route('/clientes/:id').delete(autenticacao, Clientes.apagar);

module.exports = roteadorClientes;
