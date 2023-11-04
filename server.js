// Importações
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const roteador = require('./router/routes');

const app = express();

// Conectando ao banco de dados
const conn = require('./database/conn');
conn();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(roteador);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('http://localhost:9001');
});

// export default app;