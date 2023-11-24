// Regras de negócio, criptografia e validações de senha.

// Módulo para usar criptografia na senha
const bcrypt = require('bcrypt');

class ValidarSenha {

    tamanhoIncorreto(senha) {

        if (senha.length < 6 && senha.length > 12) return true;

        return false

    }

    formatoIncorreto(senha) {
        // Expressão regular para verificar a senha
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

        // Testa a senha em relação à expressão regular
        if (!regex.test(senha)) {
            return true;
        }

        return false;
    }

    async criptografar(senha) {

        try {

            const salt = await bcrypt.genSalt(12);

            const hash = await bcrypt.hash(senha, salt);

            return hash;
            
        } catch (error) {
            console.log(error);
            return false;
        }

    }

    async verificar(senha, hash) {

        try {

            const verificacao = await bcrypt.compare(senha, hash);

            return verificacao;
            
        } catch (error) {
            console.log(error);
            return false;
        }

    }

}

module.exports = ValidarSenha;