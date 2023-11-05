const jwt = require('jsonwebtoken');
require('dotenv').config();

function autenticacao(req, res, next) {

    // Pegando token jwt que veio pelo cabeçalho da requisição.
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({status: 'error', msg: `Acesso negado por falta de autenticação.`})

    try {

        const segredo = process.env.SEGREDO;

        jwt.verify(token, segredo, (erro, decodificado) => {

            if (erro) {
                console.log(erro);
                return res.status(401).json({msg: `Autenticação inválida`, status: 'error'});
            } else {

                // Salvando o cargo presente no token nas confugurações de requisição 
                req.cargo = decodificado.cargo;
                next();
            }

        });
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({msg: `Problemas na autenticação.`, status: `error`});
    }
}

// Exportando para usar essa função nas minhas rotas
module.exports = autenticacao;