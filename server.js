//import the express module 
const express = require('express'); 
const path = require ('path');
const mongoose = require('mongoose');  
const bodyParser = require('body-parser'); 
const Message = require("./models/Messages.js");

//create our express application and initialize a port variable 
const chatApp = express();
const port = 3000; 

//open the server for connections 
chatApp.listen(port, () => console.log("We're listening on this server")); 

//server static files 
chatApp.use(express.static( path.join(__dirname, 'public'))); 

//includ middle ware to parse requests 
chatApp.use(bodyParser.json()); 
chatApp.use(bodyParser.urlencoded({extended:false}));

//define our mongoDB connection string 
const mongoDB = 'mongodb+srv://lea_admin_willie:Dndmongodb_forlea44!@lea0-hs7rh.mongodb.net/ChatApp?retryWrites=true&w=majority';

//use mongoose to connect to the Mongo Database, with some options to stop annoying
//deprecation warnings, and a callback ot handle connection 
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client){
    if(err) return console.log(error); 
    console.log("Connected to database YAY"); 
}); 

//put our connection into a db variable 
const db = mongoose.connection; 

//open the connection to the database 
db.on('error', console.error.bind(console, "MongoDB connection error: ")); 

//get messages 
chatApp.get('/messages', function(request, response){
    Message.find(function(error, messages){
        if(error){ 
            response.sendStatus(500);
            return console.error(error); 
        }
        response.send(messages);  
    }); 
}); 

//receive messages 
chatApp.post('/messages', function(request,response){
    let message = new Message(request.body); 
    message.save(function(error, message){
        if(error){ 
            response.sendStatus(500); 
            return console.error(error); 
        }; 
        response.sendStatus(200); 
    })
}); 