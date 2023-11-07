// Aqui persiste as validações e regras de negócio referente ao email

// Importando a model de clientes e funcionários para checar e-mails duplicados
const  FuncionariosModel = require('../models/Funcionarios');
const  ClientesModel = require('../models/Clientes');

class ValidarEmail {

    emailIncorreto(email) {
        // Expressão regular para validar o formato básico do e-mail
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!regex.test(email)) return true;

        return false;
    }

    verificarDominio(email) {
        // Expressão regular para verificar o domínio "@dentech.com"
        const regex = /@dentech\.com$/;

        // Testa o e-mail em relação à expressão regular
        if (regex.test(email)) return true; // Retorna true se o e-mail contiver o domínio "@dentech.com"

        return false; // Retorna false se o e-mail não contiver o domínio "@dentech.com"
    }

    async emailDuplicado(email) {
        try {

            const duplicadoCliente = await ClientesModel.findOne({email: email});
            const duplicadoFuncionario = await FuncionariosModel.findOne({email: email});

            if(duplicadoCliente) return true;
            if(duplicadoFuncionario) return true;

            return false;
            
        } catch (error) {
            console.log(error);
            return true;
        }
    }

}

module.exports = ValidarEmail;