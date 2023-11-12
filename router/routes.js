// Roteador principal da aplicação
const roteador = require('express').Router();

// Importando roteadores específicos
const roteadorClientes = require('./clientes');
const roteadorFuncionarios = require('./funcionarios');
const roteadorConsultas = require('./consultas');
const roteadorServicos = require('./servicos');
const roteadorRelatorio = require('./relatorio');
const roteadorLogin = require('./login');
const roteadorSenha = require('./alterarSenhaFunc');
const roteadorFoto = require('./foto');

// Usando os roteadores
roteador.use('/', roteadorClientes);
roteador.use('/', roteadorFuncionarios);
roteador.use('/', roteadorLogin);
roteador.use('/', roteadorConsultas);
roteador.use('/', roteadorServicos);
roteador.use('/consultas', roteadorRelatorio);
roteador.use('/funcionarios', roteadorSenha);
roteador.use('/clientes', roteadorFoto);

module.exports = roteador;