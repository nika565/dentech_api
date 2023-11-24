const roteadorLogin = require('express').Router();

const login = require('../middlewares/login');

roteadorLogin.route('/login').post(login);

module.exports = roteadorLogin;