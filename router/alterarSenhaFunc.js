const roteadorSenha = require('express').Router();
const autenticacao = require('../middlewares/autenticacao');

const FuncionariosController = require('../controllers/FuncionariosController');
const Funcionarios = new FuncionariosController();

roteadorSenha.route('/alterarsenha/:id').patch(autenticacao, Funcionarios.alterarSenha);

module.exports = roteadorSenha;