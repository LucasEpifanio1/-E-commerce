const express = require('express');

const app = express();

const produtoController = require('./controllers/produtoController');


app.use(express.json());

// Rota POST diretamente usando o controller
app.post('/produtos', produtoController.store);

app.listen(3000, () => console.log('🔥 servidor está funcionando'));
