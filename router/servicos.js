const roteadorServicos = require('express').Router();
const autenticacao = require('../middlewares/autenticacao');

// Classe controladora
const ServicoController = require('../controllers/ServicoController');
const Servico = new ServicoController();

roteadorServicos.route('/servicos').get(autenticacao, Servico.buscar);
roteadorServicos.route('/servicos').post(autenticacao, Servico.cadastrar);
roteadorServicos.route('/servicos/:id').put(autenticacao, Servico.editar);
roteadorServicos.route('/servicos/:id').delete(autenticacao, Servico.apagar);

module.exports = roteadorServicos;