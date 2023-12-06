const ServicosModel = require("../models/Servicos");

async function buscandoServicos(consultas) {
    try {

        const arr = []

        for (let consulta of consultas) {

            const servico = await ServicosModel.findById(consulta.idServico);
            
            consulta.nomeServico = servico.nomeServico;
            consulta.descricao = servico.descricao;
            consulta.preco = servico.preco;

            console.log(consulta);

            
            arr.push(consulta);
            
        };

        // console.log(arr);

        return arr;
        
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = buscandoServicos;