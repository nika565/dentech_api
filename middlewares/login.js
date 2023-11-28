const jwt = require('jsonwebtoken');
require('dotenv').config();

// Models
const ClientesModel = require('../models/Clientes');
const FuncionariosModel = require('../models/Funcionarios');

// Validações de login
const Validacoes = require('../rules/Validacoes');
const ValidarEmail = require('../rules/ValidarEmail');
const ValidarSenha = require('../rules/ValidarSenha');

const Validador = new Validacoes();
const ValidadorEmail = new ValidarEmail();
const ValidadorSenha = new ValidarSenha();


async function login(req, res) {

    try {

        const { email, senha } = req.body;

        if (Validador.camposVazios([email, senha])) return res.status(400).json({ status: `error`, msg: `Os campos não podem estar vazios.` });

        // O e-mail vai determinar quem está logando, se é o funcionário ou cliente
        if (ValidadorEmail.verificarDominio(email)) {

            const consultar = await FuncionariosModel.findOne({ email: email });

            if (consultar) {

                if (consultar.senha === process.env.SENHAPADRAO) {

                    // Gerar o token
                    try {

                        // Segredo da autenticação
                        const segredo = process.env.SEGREDO;

                        const token = jwt.sign({
                            id: consultar._id,
                            cargo: consultar.cargo
                        }, segredo);

                        // Dados a serem enviados para o cliente
                        const dados = {
                            id: consultar._id,
                            nome: consultar.nome,
                            sobrenome: consultar.sobrenome,
                            email: consultar.email,
                            cargo: consultar.cargo,
                        }

                        return res.status(200).json({status: `success`, msg: `Altere sua senha`, dados: dados, token: token});

                    } catch (error) {
                        console.log(error);
                        return res.status(500).json({ status: `error`, msg: `Falha em gerar token de autenticação` });
                    }

                    
                } 

                if (await ValidadorSenha.verificar(senha, consultar.senha)) {

                    // Gerar o token
                    try {

                        // Segredo da autenticação
                        const segredo = process.env.SEGREDO;

                        const token = jwt.sign({
                            id: consultar._id,
                            cargo: consultar.cargo
                        }, segredo);

                        // Dados a serem enviados para o cliente
                        const dados = {
                            id: consultar._id,
                            nome: consultar.nome,
                            sobrenome: consultar.sobrenome,
                            email: consultar.email,
                            cargo: consultar.cargo,
                        }

                        return res.status(200).json({ status: `success`, msg: `Bem-vindo ${consultar.nome}!`, dados: dados, token });

                    } catch (error) {
                        console.log(error);
                        return res.status(500).json({ status: `error`, msg: `Falha em gerar token de autenticação` });
                    }

                }

                return res.status(400).json({ status: `error`, msg: `E-mail ou senha incorretos.` });


            }

            return res.status(400).json({ status: `error`, msg: `E-mail ou senha incorretos.` });

        } else {

            const consultar = await ClientesModel.findOne({ email: email });

            console.log(consultar);

            if (consultar) {

                if (await ValidadorSenha.verificar(senha, consultar.senha)) {

                    // Gerar o token
                    try {

                        // Segredo da autenticação
                        const segredo = process.env.SEGREDO;

                        const token = jwt.sign({
                            id: consultar.id,
                            cargo: 'Não tem'
                        }, segredo);

                        // Dados a serem enviados para o cliente
                        const dados = {
                            id: consultar._id,
                            nome: consultar.nome,
                            sobrenome: consultar.sobrenome,
                            email: consultar.email,
                        }

                        return res.status(200).json({ status: `success`, msg: `Bem-vindo ${consultar.nome}!`, dados: dados, token });

                    } catch (error) {
                        console.log(error);
                        return res.status(500).json({ status: `error`, msg: `Falha em gerar token de autenticação` });
                    }

                }

                return res.status(400).json({ status: `error`, msg: `E-mail ou senha incorretos.` });


            }

            return res.status(400).json({ status: `error`, msg: `E-mail ou senha incorretos.` });

        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: `error`, msg: `Problemas no servidor.` });
    }

}

module.exports = login;