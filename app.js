'use strict';

// Use express to open a web server

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').createServer(app);

app.use(express.static(__dirname + '/node_modules')); // makes node_modules folder publicly accessible
app.use(express.static(__dirname + '/public')); //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var users = [];

// -- ROUTING --
app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/click', function(req, res, next) {
    res.send("hello");
});

console.log("Server is listening")
server.listen(8080);