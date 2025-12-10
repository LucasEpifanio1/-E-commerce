const express = require('express');
const cors = require("cors");
const routes = require('./routes');
require('./database'); // inicializa o banco e models

const app = express();
app.use(cors()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.listen(3000, () => {
  console.log('🔥 Servidor está funcionando na porta 3000');
});
