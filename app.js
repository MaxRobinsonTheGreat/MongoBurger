'use strict';

// Use express to open a web server

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').createServer(app);
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongoburger', { useNewUrlParser: true });
var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});
var mongoose = require('mongoose');
var BurgerSchema = new mongoose.Schema({
  title: String,
  upvotes: {type: Number, default: 0},
});
mongoose.model('Burger', BurgerSchema);
var Burger = mongoose.model('Burger');


app.use(express.static(__dirname + '/node_modules')); // makes node_modules folder publicly accessible
app.use(express.static(__dirname + '/public')); //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var submissions = [];

// -- ROUTING --
app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/burger', function(req, res, next) {
    Burger.find(function(err, burgers){
        if(err){ return next(err); }
        res.json(burgers);
    });
});

app.post('/burger', function(req, res, next) {
    var burger = new Burger(req.body);
    burger.save(function(err, burger){
        if(err){ return next(err); }
        res.json(burger);
    });
});

console.log("Server is listening")
server.listen(8080);