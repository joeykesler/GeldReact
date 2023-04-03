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

    let user = req.body.user;
    let portfolios = req.body.portfolios
    console.log(user);
    console.log(portfolios);
    // fs.writeFile('./db/portfolios.json', JSON.stringify(req.body, null, 4), (err, data) => {
    //     if(!err) res.send(data);
    // })

    const fs = require('fs');
    const fileName = './db/portfolios.json';
    const file = require(fileName);
    // console.log(file);
        
    file.Portfolios[user] = portfolios;
    console.log(file.Portfolios[user]);
        
    fs.writeFile(fileName, JSON.stringify(file, null, 4), function writeJSON(err) {
    if (err) return console.log(err);
    console.log(JSON.stringify(file));
    console.log('writing to ' + fileName);
    });
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