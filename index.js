const path = require("path")
const express = require("express");
const app = express();
const cors = require("cors");
var corsOptions = {
    origin: 'https://ptdb.herokuapp.com/',
    optionsSuccessStatus: 200
  }
app.use(cors());

const PORT = process.env.PORT || 8080; 
const HOST = "0.0.0.0";

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
});

const Pre_1700 = require('./periods/Pre_1700');
const its1700_1799 = require('./periods/its1700_1799');
const its1800_1899 = require('./periods/its1800_1899');
const its1900_1999 = require('./periods/its1900_1999');
const its2000_2021 = require('./periods/its2000_2021');

app.get('/api/v1/Pre_1700', (req, res) => {
    res.status(200).send(Pre_1700);
});
app.get('/api/v1/1700-1799', (req, res) => {
    res.status(200).send(its1700_1799);
});
app.get('/api/v1/1800-1899', (req, res) => {
    res.status(200).send(its1800_1899);
});
app.get('/api/v1/1900-1999', (req, res) => {
    res.status(200).send(its1900_1999);
});
app.get('/api/v1/2000-2021', (req, res) => {
    res.status(200).send(its2000_2021);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
