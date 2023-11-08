// Roteador da aplicação
const roteadorFuncionarios = require('express').Router();

// Função para autenticar usuário
const autenticacao = require('../middlewares/autenticacao');

// Controlador de Funcionarios
const FuncionariosController = require('../controllers/FuncionariosController');
const Funcionarios = new FuncionariosController();


roteadorFuncionarios.route('/funcionarios').get(autenticacao, Funcionarios.buscar);
roteadorFuncionarios.route('/funcionarios').post(autenticacao, Funcionarios.cadastrar);
roteadorFuncionarios.route('/funcionarios').patch(autenticacao, Funcionarios.resetarSenha);
roteadorFuncionarios.route('/funcionarios').put(autenticacao, Funcionarios.editar);
roteadorFuncionarios.route('/funcionarios').delete(autenticacao, Funcionarios.inativar);

module.exports = roteadorFuncionarios;
