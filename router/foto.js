const roteadorFoto = require('express').Router();
const upload = require('../middlewares/multer');

const ClientesController = require('../controllers/ClientesController');
const Cliente = new ClientesController();

roteadorFoto.route('/foto/:id').post(upload.single("fotoPerfil"), Cliente.postarFoto);
roteadorFoto.route('/foto/:id').delete(Cliente.postarFoto);

module.exports = roteadorFoto;