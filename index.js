const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const PORT = process.env.PORT || 8080; 
const HOST = "0.0.0.0";

const period1 = require('./Pre_1700');

app.get('/api/v1/Pre_1700', (req, res) => {
    res.status(200).send(period1);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
