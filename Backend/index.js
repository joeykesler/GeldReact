const express = require("express");
const fs = require("fs");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.get('/users', (req, res) => {
    fs.readFile('./db/users.json', (err, data) => {
        if(!err) res.send(data);
    })
});

app.post('/users', express.json(), (req, res) => {
    console.log(req.body);
    fs.writeFile('./db/users.json', JSON.stringify(req.body, null, 4), (err, data) => {
        if(!err) res.send(data);
    })
});

app.get('/portfolios', (req, res) => {
    fs.readFile('./db/portfolios.json', (err, data) => {
        if(!err) res.send(data);
    })
});

app.post('/portfolios', express.json(), (req, res) => {
    console.log(req.body);
    fs.writeFile('./db/portfolios.json', JSON.stringify(req.body, null, 4), (err, data) => {
        if(!err) res.send(data);
    })
});

app.get('/stocks', (req, res) => {
    fs.readFile('./db/stocks.json', (err, data) => {
        if(!err) res.send(data);
    })
});

app.post('/stocks', express.json(), (req, res) => {
    console.log(req.body);
    fs.writeFile('./db/stocks.json', JSON.stringify(req.body, null, 4), (err, data) => {
        if(!err) res.send(data);
    })
});