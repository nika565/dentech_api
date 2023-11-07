// Model para realizar operações no banco de dados
const FuncionariosModel = require('../models/Funcionarios');

// Importando as validações
const Validacoes = require('../rules/Validacoes');
const ValidarEmail = require('../rules/ValidarEmail');
const ValidarSenha = require('../rules/ValidarSenha');

const validador = new Validacoes();
const validadorEmail = new ValidarEmail();
const validadorSenha = new ValidarSenha();

// gerenciar operações de funcionários
class FuncionariosController {

    async cadastrar(req, res) {
        try {

            // Array para validar campos vazio
            const array = [
                req.body.nome,
                req.body.sobrenome,
                req.body.cargo,
                req.body.email,
                req.body.senha,
            ]

            // Validações de cadastro
            if (validador.camposVazios(array)) return res.status(400).json({ status: `error`, msg: `Preencha todos os campos` });

            if (validador.nomeIncorreto(req.body.nome)) return res.status(400).json({ status: `error`, msg: `O campo de nome não foi preechido corretamente.` });

            if (validador.nomeIncorreto(req.body.sobrenome)) return res.status(400).json({ status: `error`, msg: `O campo de nome não foi preechido corretamente.` });


            // Validações de email
            if (await validadorEmail.emailDuplicado(req.body.email)) return res.status(400).json({ status: `error`, msg: `Por favor, use outro e-mail.` });

            if (validadorEmail.emailIncorreto(req.body.email)) return res.status(400).json({ status: `error`, msg: `O e-mail foi inserido de forma incorreta. Verifique o seu e-mail e tente novamente.` });

            if (!validadorEmail.verificarDominio(req.body.email)) return res.status(400).json({ status: `error`, msg: `O e-mail foi inserido de forma incorreta. É necessário o e-mail possuir "@dentech.com".` });


            // Validações referentes a senha
            if (validadorSenha.tamanhoIncorreto(req.body.senha)) return res.status(400).json({ status: `error`, msg: `A senha deve ter entre 6 e 12 caracteres.` });

            if (validadorSenha.formatoIncorreto(req.body.senha)) return res.status(400).json({ status: `error`, msg: `A senha deve possuir no mínimo uma letra maiúscula, uma letra minúscula e um número.` });


            // Criptografando a senha
            const senha = await validadorSenha.criptografar(req.body.senha);

            if (senha === false) return res.status(500).json({ status: `error`, msg: `Ocorreu um erro ao cadastrar, tente novamente mais tarde.` });

            const funcionario = {
                nome: req.body.nome,
                sobrenome: req.body.sobrenome,
                email: req.body.email,
                senha: senha
            };

            const cadastro = await FuncionariosModel.create(funcionario);

            if (cadastro) {
                return res.status(201).json({ status: `success`, msg: `Funcionário cadastrado com sucesso.` });
            }

            return res.status(400).json({ status: `error`, msg: `Não foi possível efetuar o cadastro.` });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: 'error', msg: 'Problemas no servidor.' });
        }
    }

    async buscar(req, res) {
        try {

            const id = req.query.id
            const nome = req.query.nome

            if(id) {
                
                const dados = await FuncionariosModel.findById(id);

                if(dados) return res.status(200).json({msg: `OK`, status: `success`, dados: dados});

            }

            if (nome) {

                const dados = await FuncionariosModel.find({ nome: { $regex: new RegExp(nome, 'i') } });

                if(dados.length > 0) return res.status(200).json({msg: `OK`, status: `success`, dados: dados});
            }

            return res.status(404).json({status: `error`, msg: `Nenhum funcionário encontrado.`});

        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: 'error', msg: 'Problemas no servidor.' });
        }
    }

    async editar(req, res) {
        try {

        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: 'error', msg: 'Problemas no servidor.' });
        }
    }

    async inativar(req, res) {
        try {

        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: 'error', msg: 'Problemas no servidor.' });
        }
    }

    async resetarSenha(req, res) {
        try {

        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: 'error', msg: 'Problemas no servidor.' });
        }
    }

};

module.exports = FuncionariosController;