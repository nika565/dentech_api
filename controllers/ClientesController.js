const fs = require('fs');
// Model para realizar operações no banco de dados
const ClientesModel = require('../models/Clientes');

// Importando as validações
const Validacoes = require('../rules/Validacoes');
const ValidarEmail = require('../rules/ValidarEmail');
const ValidarSenha = require('../rules/ValidarSenha');

// Instânciando as validações
const validador = new Validacoes();
const validadorEmail = new ValidarEmail();
const validadorSenha = new ValidarSenha();

// Classe com os métodos para realizar interações com a coleção de clientes
class ClientesController {

    async cadastrar(req, res) {

        try {

            // Array para validar campos vazios
            const arr = [
                req.body.nome,
                req.body.sobrenome,
                req.body.email,
                req.body.senha
            ]

            // Validações antes de cadastrar
            if (validador.camposVazios(arr)) return res.status(400).json({ status: `error`, msg: `Preencha todos os campos de cadastro.` });

            if (validador.nomeIncorreto(req.body.nome)) return res.status(400).json({ status: `error`, msg: `Preencha o nome corretamente.` });

            if (validador.nomeIncorreto(req.body.sobrenome)) return res.status(400).json({ status: `error`, msg: `Preencha o sobrenome corretamente.` });

            // Validações de e-mail
            if (validadorEmail.emailIncorreto(req.body.email)) return res.status(400).json({ status: `error`, msg: `O e-mail foi inserido de forma incorreta. Verifique o seu e-mail e tente novamente.` });

            if (await validadorEmail.emailDuplicado(req.body.email)) return res.status(400).json({ status: `error`, msg: `Por favor, use outro e-mail.` });

            // Verificando se o e-mail tem o domínio da empresa 
            if (validadorEmail.verificarDominio(req.body.email)) return res.status(400).json({ status: `error`, msg: `O e-mail foi inserido de forma incorreta. Verifique o seu e-mail e tente novamente.` });


            // Validações referentes a senha
            if (validadorSenha.tamanhoIncorreto(req.body.senha)) return res.status(400).json({ status: `error`, msg: `A senha deve ter entre 6 e 12 caracteres.` });

            if (validadorSenha.formatoIncorreto(req.body.senha)) return res.status(400).json({ status: `error`, msg: `A senha deve possuir no mínimo uma letra maiúscula, uma letra minúscula e um número.` });


            // Criptografando a senha
            const senha = await validadorSenha.criptografar(req.body.senha);

            if (senha === false) return res.status(500).json({ status: `error`, msg: `Ocorreu um erro ao cadastrar, tente novamente mais tarde.` });

            const cliente = {
                nome: req.body.nome,
                sobrenome: req.body.sobrenome,
                email: req.body.email,
                senha: senha
            };

            const cadastro = await ClientesModel.create(cliente);

            if (cadastro) {
                return res.status(201).json({ status: `success`, msg: `Usuário cadastrado com sucesso.` });
            }

            return res.status(400).json({ status: `error`, msg: `Não foi possível efetuar o cadastro.` });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: `error`, msg: `Problemas no servidor.` });
        }

    }

    // Buscar dados dos clientes
    async buscar(req, res) {

        try {

            // Pegando o ID pelo parâmetro
            const id = req.query.id;

            // verificando se o id veio pelo parâmetro de consulta.
            if (!validador.camposVazios([id])) {

                const dados = await ClientesModel.findById(id, '-senha');

                if (dados) return res.status(200).json({ status: 'success', msg: 'OK.', dados: dados });

                return res.status(404).json({ status: 'error', msg: `Nenhum usuário encontrado.` });

            } else {

                const consulta = await ClientesModel.countDocuments();

                return res.status(200).json({ status: `success`, msg: `OK.`, dados: consulta });

            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: `error`, msg: `Problemas no servidor.` });
        }

    }

    async apagar(req, res) {

        try {

            const id = req.params.id;

            const apagar = await ClientesModel.findByIdAndDelete(id);

            if (apagar) return res.status(200).json({ status: `success`, msg: `Usuário deletado com sucesso!` });

            return res.status(404).json({ msg: `Não foi possível excluir o usuário do sistema.`, status: `error` });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: `error`, msg: `Problemas no servidor.` });
        }

    }

    async enviarEmail(req, res) {

        try {

            return res.status(200).json({ status: `success`, msg: `Ainda em desenvolvimento...` });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: `error`, msg: `Problemas no servidor.` });
        }

    }

    async alterarSenha(req, res) {

        try {

            const id = req.params.id;

            if (validadorSenha.tamanhoIncorreto(req.body.senha)) return res.status(400).json({ status: `error`, msg: `A senha dev ter entre 6 e 12 caracteres.` });

            if (validadorSenha.formatoIncorreto(req.body.senha)) return res.status(400).json({ status: `error`, msg: `A senha deve possuir no mínimo uma letra maiúscula, uma letra minúscula e um número.` });

            const senha = await validadorSenha.criptografar(req.body.senha);

            const alteracao = await ClientesModel.findByIdAndUpdate(id, { senha: senha });

            console.log(alteracao);

            if (alteracao) return res.status(200).json({ status: `success`, msg: `Senha alterada com sucesso.` });

            return res.status(400).json({ status: `error`, msg: `Não foi possível alterar a senha.` })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: `error`, msg: `Problemas no servidor.` });
        }

    }

    async postarFoto(req, res) {
        const id = req.params.id;
        const arquivo = req.file;

        try {
            const buscar = await ClientesModel.findById(id);

            if (!buscar) {
                return res.status(404).json({ status: 'error', msg: 'Cliente não encontrado.' });
            }

            if (buscar.fotoPerfil !== '') {
                if (fs.existsSync(buscar.fotoPerfil)) {
                    fs.unlinkSync(buscar.fotoPerfil);
                }
            }

            const foto = await ClientesModel.findByIdAndUpdate(id, { fotoPerfil: arquivo.path });

            if (foto) {
                return res.status(200).json({ status: 'success', msg: 'Foto de perfil salva com sucesso.', dados: foto.fotoPerfil });
            }

            return res.status(400).json({ status: 'error', msg: 'Erro ao tentar salvar a foto de perfil.' });
        } catch (error) {
            return res.status(500).json({ status: 'error', msg: 'Erro interno do servidor.' });
        }

    }

    async deletarFoto(req, res) {
        try {

            const id = req.params.id

            const consulta = await ClientesModel.findById(id);

            if (consulta) {

                fs.unlinkSync(consulta.fotoPerfil);

                const obj = {
                    fotoPerfil: ''
                }

                const removerFoto = await ClientesModel.findByIdAndUpdate(id, obj);

                if (removerFoto) return res.status(200).json({ status: `success`, msg: `Foto removida com sucesso.` });

                return res.status(400).json({ status: `error`, msg: `Não foi possível remover a foto.` });


            }

            return res.status(400).json({ status: `error`, msg: `Não foi possível remover a foto.` });

        } catch (error) {
            console.log(error);
            res.status(500).json({ status: `error`, msg: `Problemas no servidor.` });
        }
    }

};

module.exports = ClientesController;