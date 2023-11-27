// Roteador principal da aplicação
const roteador = require('express').Router();

// Importando roteadores específicos
const roteadorClientes = require('./clientes');
const roteadorFuncionarios = require('./funcionarios');
const roteadorConsultas = require('./consultas');
const roteadorServicos = require('./servicos');
const roteadorLogin = require('./login');
const roteadorSenha = require('./alterarSenhaFunc');


// Usando os roteadores
roteador.use('/', roteadorClientes);
roteador.use('/', roteadorFuncionarios);
roteador.use('/', roteadorLogin);
roteador.use('/', roteadorConsultas);
roteador.use('/', roteadorServicos);
roteador.use('/funcionarios', roteadorSenha);

module.exports = roteador;