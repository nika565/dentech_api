// Model para realizar operações no banco de dados
const ConsultasModel = require('../models/Consultas');

const Validacoes = require('../rules/Validacoes');

const validador = new Validacoes();

// Classe para realixar opreações de consulta
class ConsultaController {

    async criar(req, res) {
        try {

            // Array para verificar se os dados estão vazios
            const arr = [
                req.body.data,
                req.body.horario,
                req.body.idDentista,
            ]

            // Validações
            if (validador.camposVazios(arr)) return res.status(400).json({ status: `error`, msg: `As informações necessárias não foram enviadas.` });

            if (validador.dataPassada(req.body.data)) return res.status(400).json({ status: `error`, msg: `Data incorreta.` });

            const dadosAgendamento = {
                data: req.body.data,
                horaraio: req.body.horario,
                idDentista: req.body.idDentista,
                status: 'disponivel',
            };

            const agendamento = await ConsultasModel.create(dadosAgendamento);

            if (agendamento) return res.status(201).json({ status: `success`, msg: `Agendamento disponível` });

            return res.status(400).json({ status: `error`, msg: `Não foi possível disponibilizar a consulta` });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: 'error', msg: 'Problemas no servidor.' });
        }
    }

    async buscar(req, res) {
        try {

            // Parâmetros opicionais para filtrar a consulta
            const idConsulta = req.query.idConsulta;
            const idCliente = req.query.idCliente;
            const idDentista = req.query.idDentista;
            const filtro = req.query.filtro;



            // Verificação de como vai ser realizada a consulta
            if (!validador.camposVazios([idConsulta])) {

                // Verificação se possui algum filtro
                if (!validador.camposVazios([filtro])) {

                    const dados = await ConsultasModel.find({ _id: idConsulta, status: filtro });

                    if (dados.length > 0) return res.status(200).json({ status: `success`, msg: `OK.`, dados: dados });

                    return res.status(404).json({ status: `error`, msg: `Nenhum agendamento encontrado.` });

                } else {

                    const dados = await ConsultasModel.find({ _id: idConsulta });

                    if (dados.length > 0) return res.status(200).json({ status: `success`, msg: `OK.`, dados: dados });

                    return res.status(404).json({ status: `error`, msg: `Nenhum agendamento encontrado.` });

                }

            } else if (!validador.camposVazios([idCliente])) {

                // Verificação se possui algum filtro
                if (!validador.camposVazios([filtro])) {

                    const dados = await ConsultasModel.find({ idCliente: idCliente, status: filtro });

                    if (dados.length > 0) return res.status(200).json({ status: `success`, msg: `OK.`, dados: dados });

                    return res.status(404).json({ status: `error`, msg: `Nenhum agendamento encontrado.` });

                } else {

                    const dados = await ConsultasModel.find({ idCliente: idCliente });

                    if (dados.length > 0) return res.status(200).json({ status: `success`, msg: `OK.`, dados: dados });

                    return res.status(404).json({ status: `error`, msg: `Nenhum agendamento encontrado.` });

                }

            } else if (validador.camposVazios([idDentista])) {

                // Verificação se possui algum filtro
                if (!validador.camposVazios([filtro])) {

                    const dados = await ConsultasModel.find({ idDentista: idDentista, status: filtro });

                    if (dados.length > 0) return res.status(200).json({ status: `success`, msg: `OK.`, dados: dados });

                    return res.status(404).json({ status: `error`, msg: `Nenhum agendamento encontrado.` });

                } else {

                    const dados = await ConsultasModel.find({ idDentista: idDentista });

                    if (dados.length > 0) return res.status(200).json({ status: `success`, msg: `OK.`, dados: dados });

                    return res.status(404).json({ status: `error`, msg: `Nenhum agendamento encontrado.` });

                }

            } else {

                // Verificação se possui algum filtro
                if (!validador.camposVazios([filtro])) {

                    const dados = await ConsultasModel.find({ status: filtro });

                    if (dados.length > 0) return res.status(200).json({ status: `success`, msg: `OK.`, dados: dados });

                    return res.status(404).json({ status: `error`, msg: `Nenhum agendamento encontrado.` });

                } else {

                    const dados = await ConsultasModel.find();

                    if (dados.length > 0) return res.status(200).json({ status: `success`, msg: `OK.`, dados: dados });

                    return res.status(404).json({ status: `error`, msg: `Nenhum agendamento encontrado.` });

                }

            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: 'error', msg: 'Problemas no servidor.' });
        }
    }

    async agendar(req, res) {
        try {

            // Id do agendamento para fazer a alteração
            const id = req.params.id;

            if (validador.camposVazios([req.body.idCliente])) return res.status(400).json({ msg: `É necessário o id do cliente`, status: `error` });

            if (validador.camposVazios([req.body.idServico])) return res.status(400).json({ msg: `É necessário o id do cliente`, status: `error` });

            const dados = {
                idCliente: req.body.idCliente,
                idServico: req.body.idServico,
                status: `agendado`
            };

            const agendamento = await ConsultasModel.findByIdAndUpdate(id, dados);

            if (agendamento) return res.status(200).json({status: `success`, msg: `Consulta marcada com sucesso.`});

            return res.status(400).json({status: `error`, msg: `Não foi possível agendar a consulta`});

        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: 'error', msg: 'Problemas no servidor.' });
        }
    }

    async finalizar(req, res) {
        try {

            // Id do agendamento para fazer a alteração
            const id = req.params.id;

            const dados = {
                status: `finalizado`
            };

            const agendamento = await ConsultasModel.findByIdAndUpdate(id, dados);

            if (agendamento) return res.status(200).json({status: `success`, msg: `Consulta finalizada com sucesso.`});

            return res.status(400).json({status: `error`, msg: `Não foi possível finalizar a consulta`});

        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: 'error', msg: 'Problemas no servidor.' });
        }
    }

    async cancelar(req, res) {
        try {

            // Id do agendamento para fazer a alteração
            const id = req.params.id;

            const dados = {
                status: `cancelado`
            };

            const agendamento = await ConsultasModel.findByIdAndUpdate(id, dados);

            if (agendamento) return res.status(200).json({status: `success`, msg: `Consulta cancelada com sucesso.`});

            return res.status(400).json({status: `error`, msg: `Não foi possível cancelar a consulta`});

        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: 'error', msg: 'Problemas no servidor.' });
        }
    }

};

module.exports = ConsultaController;