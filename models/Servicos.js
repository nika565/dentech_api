const mongoose = require('mongoose');

// Schema para gerar o documento no banco de dados
const { Schema } = mongoose;

const ServicosSchema = new Schema({

    nomeServico: {
        type: String,
        required: true
    },

    descricao: {
        type: String,
        required: true
    }

});

const ServicosModel = mongoose.model('Serviços', ServicosSchema);

module.exports = ServicosModel;