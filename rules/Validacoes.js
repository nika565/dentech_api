// Model de consultas para realizar regra de negócio
const ConsultasModel = require("../models/Consultas");

// Validações e regras de negócio básicas

class Validacoes {

    // verificar se as informações enviadas estão vazias 
    camposVazios(array) {

        for (let campo of array) {

            if (campo === '' || typeof campo === 'undefined' || campo === null) return true;

        }

        return false;

    }

    // Validação para verificar se o nome e o sobrenome possui número ou simbolos
    nomeIncorreto(nome) {
        // Expressão regular para verificar se o nome possui símbolos ou números
        const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/;

        // Testa o nome em relação à expressão regular
        if (regex.test(nome)) return true; // Retorna true se o nome possuir símbolos ou números

        return false; // Retorna false se o nome não possuir símbolos ou números
    }

    // Validação para não deixar marcar consultas com datas passadas
    dataPassada(data) {

        // Pegando as datas para comparar
        const dataEnviada = new Date(data);
        const dataAtual = new Date()

        if (dataEnviada.getTime() < dataAtual.getTime()) return true;

        return false;

    }

    // Validação para não deixar gerar relatórios com datas futuras
    dataFutura(data) {

        const dataEnviada = new Date(data);
        const dataAtual = new Date()

        if (dataEnviada.getTime() > dataAtual.getTime()) return true;

        return false;

    }

    // Validar consultas que já passaram da data de marcação
    async consultasPassadas(consultas) {

        // Pegando a data atual
        const dataAtual = new Date().getTime();

        for (let consulta of consultas) {

            try {

                // Convertendo a data da consulta para milissegundos para realizar a comparação
                const dataConsulta = new Date(`${consulta.data}T${consulta.horario}:00`).getTime()

                if (dataAtual > dataConsulta && consulta.status === "disponivel") {
                    await ConsultasModel.findByIdAndUpdate(consulta._id, {status: `finalizado.`});
                    consulta.status = `finalizado`;
                }

                return true;
                
            } catch (error) {
                console.log(error);
                return res.status(500).json({status: `error`, msg: `Não foi possível processar as consultas...`});
            }

        }

    }

}

module.exports = Validacoes;