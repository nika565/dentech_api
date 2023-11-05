// Model para realizar operações no banco de dados
const ConsultasModel = require('../models/Consultas');

// Classe para realixar opreações de consulta
class ConsultaController {

    async criar(req, res) {
        try {
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({status: 'error', msg: 'Problemas no servidor.'});
        }
    }

    async buscar(req, res) {
        try {
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({status: 'error', msg: 'Problemas no servidor.'});
        }
    }

    async editar(req, res) {
        try {
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({status: 'error', msg: 'Problemas no servidor.'});
        }
    }

    async apagar(req, res) {
        try {
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({status: 'error', msg: 'Problemas no servidor.'});
        }
    }

};

module.exports = ConsultaController;