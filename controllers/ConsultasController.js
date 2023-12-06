// Model para realizar operações no banco de dados
const ConsultasModel = require('../models/Consultas');

const buscandoServicos = require('../rules/buscandoServicos');

const Validacoes = require('../rules/Validacoes');

const validador = new Validacoes();

// Classe para realixar opreações de consulta
class ConsultasController {

    async criar(req, res) {
        try {

            // Verificando o cargo da pessoa que está criando o horario de agendamento
            if (req.cargo !== 'adm' && req.cargo !== 'dentista' && req.cargo !== 'assistente' ) return res.status(403).json({status: `error`, msg: `Você não tem autorização para acessar esse recurso.`});

            // Array para verificar se os dados estão vazios
            const arr = [
                req.body.data,
                req.body.horario,
                req.body.idDentista,
                req.body.idServico
            ]

            // Validações
            if (validador.camposVazios(arr)) return res.status(400).json({ status: `error`, msg: `As informações necessárias não foram enviadas.` });

            if (validador.dataPassada(req.body.data)) return res.status(400).json({ status: `error`, msg: `Data incorreta.` });

            const dadosAgendamento = {
                data: req.body.data,
                horario: req.body.horario,
                idDentista: req.body.idDentista,
                idServico: req.body.idServico,
                status: 'disponivel'
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

            // Objeto que funciona para realizar a consulta de acordo com o parâmetro opicional
            const query = {}

            // Parâmetros opicionais para filtrar a consulta
            const { idConsulta, idCliente, idDentista, data, status, idServico } = req.query

            if (idConsulta) query.idConsulta = idConsulta;

            if (idCliente) query.idCliente = idCliente;
            
            if (idDentista) query.idDentista = idDentista;

            if (data !== null && data !== undefined && data !== '') query.data = { $regex: new RegExp(data, 'i') };

            if (idServico !== null && idServico !== undefined && idServico !== '') query.idServico = idServico;

            if (status) query.status = status;

            let dados = await ConsultasModel.find(query);

            // Verificação de data de consultas
            const ano = new Date().getFullYear();
            const mes = new Date().getMonth() + 1;

            const dataAtual = `${ano}-${mes}`;

            if (dataAtual === data) await validador.consultasPassadas(dados);

            const arr = [];

            for (let consulta of dados) {

                const servico = await ServicosModel.findById(consulta.idServico);
                
                consulta.nomeServico = servico.nomeServico;
                consulta.descricao = servico.descricao;
                consulta.preco = servico.preco;
    
                console.log(consulta);
    
                
                arr.push(consulta);
                
            };


            // Buscado os serviços
            // const dadosCompletos = await buscandoServicos(dados);

            // console.log(dadosCompletos);


            if (dadosCompletos.length > 0) return res.status(200).json({ status: `success`, msg: `OK.`, dados: arr });

            return res.status(404).json({ status: `error`, msg: `Nenhum agendamento de consulta encontrado.` });


        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: 'error', msg: 'Problemas no servidor.' });
        }
    }

    async status(req, res) {
        try {

            // Id do agendamento para fazer a alteração
            const { id, status } = req.params;

            if (status !== 'agendado' && status !== 'finalizado' && status !== 'cancelado') return res.status(400).json({status: `error`, msg: `Status incorreto.`})

            if (validador.camposVazios([req.body.idCliente])) return res.status(400).json({ msg: `É necessário o id do cliente`, status: `error` });

            if (validador.camposVazios([req.body.idServico])) return res.status(400).json({ msg: `É necessário o id do servico`, status: `error` });

            const dados = {
                status: status,
                idCliente: req.body.idCliente,
                idServico: req.body.idServico
            }

            const agendamento = await ConsultasModel.findByIdAndUpdate(id, dados);

            if (agendamento) return res.status(200).json({ status: `success`, msg: `Consulta alterada com sucesso.` });

            return res.status(400).json({ status: `error`, msg: `Não foi possível agendar a consulta` });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: 'error', msg: 'Problemas no servidor.' });
        }
    }

};

module.exports = ConsultasController;
