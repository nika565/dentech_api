const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Conectando ao banco de dados
const conn = require('./database/conn');
conn();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('http://localhost:9001');
});

// export default app;