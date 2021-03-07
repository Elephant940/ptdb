const path = require("path")
const express = require("express");
const app = express();
const cors = require("cors");
var corsOptions = {
    origin: 'https://ptdb.herokuapp.com/',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
});

const Pre_1700 = require('./periods/B1700');
const D1700_1799 = require('./periods/D1700_1799');
const D1800_1899 = require('./periods/D1800_1899');
const D1900_1999 = require('./periods/D1900_1999');
const D2000_2021 = require('./periods/D2000_2021');

app.get('/api/v1/B1700', (req, res) => {
    res.status(200).send(Pre_1700);
});
app.get('/api/v1/D1700-1799', (req, res) => {
    res.status(200).send(D1700_1799);
});
app.get('/api/v1/D1800-1899', (req, res) => {
    res.status(200).send(D1800_1899);
});
app.get('/api/v1/D1900-1999', (req, res) => {
    res.status(200).send(D1900_1999);
});
app.get('/api/v1/D2000-2021', (req, res) => {
    res.status(200).send(D2000_2021);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
