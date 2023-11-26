const mongoose = require('mongoose');

// Schema para modelar o documento no banco de dados
const { Schema } = mongoose;

// Schema específico para tratar dos funcionários.
const FuncionariosSchema = new Schema({

    nome: {
        type: String,
        required: true
    },

    sobrenome: {
        type: String,
        required: true
    },

    cargo: {
        type: String,
        enum: ['adm', 'dentista', 'assistente'],
        required: true
    },

    status: {
        type: String,
        enum: ['ativo', 'inativo'],
        required: true
    },

    email: {
        type: String,
        required: true
    },

    senha: {
        type: String,
        required: true
    }

});

const FuncionariosModel = mongoose.model('Funcionários', FuncionariosSchema);

module.exports = FuncionariosModel;