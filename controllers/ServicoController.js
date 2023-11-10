// Model para realizar operações no banco de dados
const ServicoModel = require('../models/Servicos');

const Validacoes = require('../rules/Validacoes');
const validador = new Validacoes();

class ServicoController {

    async cadastrar(req, res) {
        try {

            // Verificando o cargo da pessoa que está criando o horario de agendamento
            if (req.cargo !== 'adm') return res.status(403).json({ status: `error`, msg: `Você não tem autorização para acessar esse recurso.` });

            // Array para verificar os campos vazios.
            const array = [
                req.body.nomeServico,
                req.body.descricao,
                req.body.preco
            ];

            if (validador.camposVazios(array)) return res.status(400).json({ msg: `Os campos não podem estar vazios.`, status: `error` });

            const servico = {
                nomeServico: req.body.nomeServico,
                descricao: req.body.descricao,
                preco: req.body.preco
            };

            const salvar = await ServicoModel.create(servico);

            if (salvar) {
                return res.status(201).json({ status: `success`, msg: `Serviço salvo com sucesso.` });
            }

            return res.status(400).json({ msg: `Não foi possível salvar o serviço.`, status: `error` });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: 'error', msg: 'Problemas no servidor.' });
        }
    }

    async buscar(req, res) {
        try {

            const id = req.query.id;

            if (id) {

                const dados = await ServicoModel.findById(id);

                if (dados) {
                    return res.status(200).json({ status: `error`, msg: `OK.`, dados: dados });
                }

                return res.status(404).json({ status: `error`, msg: `Nenhum serviço encontrado.` });

            } else {

                const dados = await ServicoModel.find();

                if (dados.length > 0) {
                    return res.status(200).json({ status: `error`, msg: `OK.`, dados: dados });
                }

                return res.status(404).json({ status: `error`, msg: `Nenhum serviço encontrado.` });

            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: 'error', msg: 'Problemas no servidor.' });
        }
    }

    async editar(req, res) {
        try {

            // Verificando o cargo da pessoa que está criando o horario de agendamento
            if (req.cargo !== 'adm') return res.status(403).json({ status: `error`, msg: `Você não tem autorização para acessar esse recurso.` });
            
            const id = req.params.id;
            
            const servico = {};

            if (req.body.nomeServico) {
                servico.nomeServico = req.body.nomeServico
            }

            if (req.body.descricao) {
                servico.descricao = req.body.descricao
            }

            if (req.body.preco) {
                servico.preco = req.body.preco
            }


            const edicao = await ServicoModel.findByIdAndUpdate(id, servico);

            if (edicao) return res.status(200).json({ status: `success`, msg: `Serviço alterado com sucesso.` });

            return res.status(200).json({ status: `success`, msg: `Serviço alterado com sucesso.` });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: 'error', msg: 'Problemas no servidor.' });
        }
    }

    async apagar(req, res) {
        try {

            // Verificando o cargo da pessoa que está criando o horario de agendamento
            if (req.cargo !== 'adm') return res.status(403).json({ status: `error`, msg: `Você não tem autorização para acessar esse recurso.` });

            const id = req.params.id;

            const deletar = await ServicoModel.findByIdAndDelete(id);

            if (deletar) return res.status(200).json({ status: `success`, msg: `Serviço excluido com sucesso.` });

            return res.status(404).json({ status: `error`, msg: `Não foi possível excluir o serviço` });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: 'error', msg: 'Problemas no servidor.' });
        }
    }

};

module.exports = ServicoController;