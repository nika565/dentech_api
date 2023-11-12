const mongoose = require('mongoose');

// Schema para modelar o documento no banco de dados
const { Schema } = mongoose;

const ClientesSchema = new Schema({

    // Campos a serem usados para armazenar informações do cliente
    nome: {
        type: String,
        required: true
    },

    sobrenome: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    senha: {
        type: String,
        required: true
    },

    fotoPerfil: {
        type: String
    }

});

// Construindo o schema e criando um documento para clientes
const ClientesModel = mongoose.model('Clientes', ClientesSchema);

module.exports = ClientesModel;