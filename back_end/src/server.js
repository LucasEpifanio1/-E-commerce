const express = require('express');

const routes = require('./routes'); // caminho ajustado
require('./database');

const app = express(); 


app.use(express.json());
app.use(routes);

app.listen(3333, () => console.log('🔥 servidor está funcionando'));
