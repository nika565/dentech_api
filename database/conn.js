const mongoose = require('mongoose');

require('dotenv').config();
const stringConn = process.env.STRINGCONN;

async function conn() {

    try {
        
        mongoose.set('strictQuery', true)
        await mongoose.connect(stringConn);

        console.log('Conectado ao banco de dados');
        
    } catch (error) {
        console.log('Ocorreu algum erro de conexão com o banco de dados' + error);
        return;
    }

} 

module.exports = conn;