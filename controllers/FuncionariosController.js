// Model para realizar operações no banco de dados
const FuncionariosModel = require('../models/Funcionarios');
require('dotenv').config();

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

            // Verificando o cargo da pessoa que está criando o horario de agendamento
            if (req.cargo !== 'adm') return res.status(403).json({ status: `error`, msg: `Você não tem autorização para acessar esse recurso.` });

            // Array para validar campos vazio
            const array = [
                req.body.nome,
                req.body.sobrenome,
                req.body.cargo,
                req.body.email,
            ]

            // Validações de cadastro
            if (validador.camposVazios(array)) return res.status(400).json({ status: `error`, msg: `Preencha todos os campos` });

            if (validador.nomeIncorreto(req.body.nome)) return res.status(400).json({ status: `error`, msg: `O campo de nome não foi preechido corretamente.` });

            if (validador.nomeIncorreto(req.body.sobrenome)) return res.status(400).json({ status: `error`, msg: `O campo de nome não foi preechido corretamente.` });


            // Validações de email
            if (await validadorEmail.emailDuplicado(req.body.email)) return res.status(400).json({ status: `error`, msg: `Por favor, use outro e-mail.` });

            if (validadorEmail.emailIncorreto(req.body.email)) return res.status(400).json({ status: `error`, msg: `O e-mail foi inserido de forma incorreta. Verifique o seu e-mail e tente novamente.` });

            if (!validadorEmail.verificarDominio(req.body.email)) return res.status(400).json({ status: `error`, msg: `O e-mail foi inserido de forma incorreta. É necessário o e-mail possuir "@dentech.com".` });

            const funcionario = {
                nome: req.body.nome,
                sobrenome: req.body.sobrenome,
                email: req.body.email,
                cargo: req.body.cargo,
                status: 'ativo',
                senha: process.env.SENHAPADRAO
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

        // Verificando o cargo da pessoa que está criando o horario de agendamento
        if (req.cargo !== 'adm' && req.cargo !== 'dentista' && req.cargo !== 'assistente') return res.status(403).json({ status: `error`, msg: `Você não tem autorização para acessar esse recurso.` });

        try {

            const { id, nome } = req.query

            if (id) {

                const dados = await FuncionariosModel.findById(id);

                if (dados) return res.status(200).json({ msg: `OK`, status: `success`, dados: dados });

            }

            if (nome) {

                const dados = await FuncionariosModel.find({ nome: { $regex: new RegExp(nome, 'i') } });

                if (dados.length > 0) return res.status(200).json({ msg: `OK`, status: `success`, dados: dados });
            }

            const dados = await FuncionariosModel.find();

            if (dados.length > 0) return res.status(200).json({ msg: `OK`, status: `success`, dados: dados });

            return res.status(404).json({ status: `error`, msg: `Nenhum funcionário encontrado.` });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: 'error', msg: 'Problemas no servidor.' });
        }
    }

    async editar(req, res) {

        // Verificando o cargo da pessoa que está criando o horario de agendamento
        if (req.cargo !== 'adm') return res.status(403).json({ status: `error`, msg: `Você não tem autorização para acessar esse recurso.` });

        try {

            // Id do usuário para realizar a edição
            const id = req.params.id;

            if (req.body.cargo) {

                const obj = {
                    cargo: req.body.cargo
                };

                if (obj.cargo !== 'adm' && obj.cargo !== 'dentista' && obj.cargo !== 'assistente') return res.status(400).json({status: `error`, msg: `Cargo inválido.`});

                const alteracao = await FuncionariosModel.findByIdAndUpdate(id, obj);

                if (alteracao) {
                    return res.status(400).json({ status: `success`, msg: `Operação realizada com sucesso` });
                }

                return res.status(400).json({ status: `error`, msg: `Não foi possível realizar esta operação` });

            } else {
                return res.status(400).json({ msg: `Não foi possível alterar o cargo.`, status: `error` });
            }


        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: 'error', msg: 'Problemas no servidor.' });
        }
    }

    async inativar(req, res) {

        try {

            // Verificando o cargo da pessoa que está criando o horario de agendamento
            if (req.cargo !== 'adm') return res.status(403).json({ status: `error`, msg: `Você não tem autorização para acessar esse recurso.` });

            const id = req.params.id;

            const demitir = await FuncionariosModel.findByIdAndDelete(id);

            if (demitir) {
                return res.status(200).json({ msg: `Usuário demitido com sucesso.`, status: `success` });
            }

            return res.status(400).json({ msg: `Não foi possível realizar esta operação.`, status: `error` });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: 'error', msg: 'Problemas no servidor.' });
        }
    }

    async resetarSenha(req, res) {
        try {

            // Verificando o cargo da pessoa que está criando o horario de agendamento
            if (req.cargo !== 'adm') return res.status(403).json({ status: `error`, msg: `Você não tem autorização para acessar esse recurso.` });

            const id = req.params.id;

            const reset = await FuncionariosModel.findByIdAndUpdate(id, { senha: process.env.SENHAPADRAO });

            if (reset) {
                return res.status(200).json({ status: `error`, msg: `Senha redefinida com sucesso.` });
            }

            return res.status(400).json({ status: `error`, msg: `Não foi possível redefinir a senha.` });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: 'error', msg: 'Problemas no servidor.' });
        }
    }

    async alterarSenha(req, res) {
        try {

            if (req.cargo !== 'adm' && req.cargo !== 'dentista' && req.cargo !== 'assistente') return res.status(403).json({ status: `error`, msg: `Você não tem autorização para acessar esse recurso.` });

            const id = req.params.id;

            if (validadorSenha.tamanhoIncorreto(req.body.senha)) return res.status(400).json({ status: `error`, msg: `A senha dev ter entre 6 e 12 caracteres.` });

            if (validadorSenha.formatoIncorreto(req.body.senha)) return res.status(400).json({ status: `error`, msg: `A senha deve possuir no mínimo uma letra maiúscula, uma letra minúscula e um número.` });

            const senha = await validadorSenha.criptografar(req.body.senha)

            const alteracao = await FuncionariosModel.findByIdAndUpdate(id, { senha: senha });

            if (alteracao) return res.status(200).json({ status: `success`, msg: `Senha alterada com sucesso.` });

            return res.status(400).json({ status: `error`, msg: `Não foi possível alterar a senha.` })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: `error`, msg: `Problemas no servidor.` });
        }
    }

};

module.exports = FuncionariosController;