// Roteador da aplicação
const roteadorFuncionarios = require('express').Router();

// Função para autenticar usuário
const autenticacao = require('../middlewares/autenticacao');

// Controlador de Funcionarios
const FuncionariosController = require('../controllers/FuncionariosController');
const Funcionarios = new FuncionariosController();


roteadorFuncionarios.route('/funcionarios').get(autenticacao, Funcionarios.buscar);
roteadorFuncionarios.route('/funcionarios').post(autenticacao, Funcionarios.cadastrar);
roteadorFuncionarios.route('/funcionarios/:id').patch(autenticacao, Funcionarios.resetarSenha);
roteadorFuncionarios.route('/funcionarios/:id').put(autenticacao, Funcionarios.editar);
roteadorFuncionarios.route('/funcionarios/:id').delete(autenticacao, Funcionarios.inativar);

module.exports = roteadorFuncionarios;
