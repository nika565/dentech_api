const mongoose = require('mongoose');

// Schema para modelar o documento no banco de dados
const { Schema } = mongoose;

/*
    Schema de consultas -> Para atribuir um "Relacionamento" entre os dados do paciente,
    dentista e o serviço a ser realizado, é necessário salvar o id de cada um.
*/
const ConsultasSchema = new Schema({

    data:{
        type: String,
        required: true
    },

    idCliente: {
        type: String,
        required: true
    },

    idServico:{
        type: String,
        required: true
    },

    idDentista:{
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ['disponivel', 'agendado', 'realizado', 'cancelado'],
        required: true
    }

});

const ConsultasModel = mongoose.model('Consultas', ConsultasSchema);

module.exports = ConsultasModel;