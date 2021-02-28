const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const PORT = process.env.PORT || 8080; 
const HOST = "0.0.0.0";

const Pre_1700 = require('./Pre_1700');
const its1700_1799 = require('./its1700_1799');

app.get('/api/v1/Pre_1700', (req, res) => {
    res.status(200).send(Pre_1700);
});
app.get('/api/v1/1700-1799', (req, res) => {
    res.status(200).send(its1700_1799);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
