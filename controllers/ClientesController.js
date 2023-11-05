// Model para realizar operações no banco de dados
const ClientesModel = require('../models/Clientes');

// Classe com os métodos para realizar interações com a coleção de clientes
class ClientesController {

    async cadastrar(req, res) {

        try {
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({status: `error`, msg: `Problemas no servidor.`});
        }

    }

    async login(req, res) {

        try {
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({status: `error`, msg: `Problemas no servidor.`});
        }

    }

    async buscar(req, res) {

        try {
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({status: `error`, msg: `Problemas no servidor.`});
        }

    }

    async editar(req, res) {

        try {
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({status: `error`, msg: `Problemas no servidor.`});
        }

    }

    async apagar(req, res) {

        try {
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({status: `error`, msg: `Problemas no servidor.`});
        }

    }

    async enviarEmail(req, res) {

        try {
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({status: `error`, msg: `Problemas no servidor.`});
        }

    }

    async recuperarSenha(req, res) {

        try {
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({status: `error`, msg: `Problemas no servidor.`});
        }

    }

};

module.exports = ClientesController;