const express = require('express');
const app = express();
const configureWss = require('./wss/wsserver');

const PORT = process.env.PORT | 3030

app.use(express.json({ extended: false }));

/* Render frontend */
app.get('/*', (req, res) => {

})

configureWss();