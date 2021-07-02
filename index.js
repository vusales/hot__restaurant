var express = require("express");
const { Server } = require("http");
var nodemon = require("nodemon");
var app = express();
var port = 8000 ; 

// app.use(express.json()) ; 
// app.use(express.urlencoded({ extended: false }));
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.get("/make_reservation.html?", function(req, res) {
    res.sendFile(__dirname + "/make_reservation.html");
});
app.get("/view_table.html?", function(req, res) {
    res.sendFile(__dirname + "/view_table.html");
});


// **************REST API******************

var w_table = [] ; 
var waitlist = [] ;

app.get("/api/table", function(req, res){
    res.send(w_table);
});
app.get("/api/waitlist", function(req, res){
    res.send(waitlist);
});

app.post("/api/create", function(req, res){
    
    var newReservation  = req.body ; 
    if(w_table.length<5){
        w_table.push(newReservation);
    }else {
        waitlist.push(newReservation);
    }

    res.send(newReservation);
});
app.delete("/api/clear", function(req, res){
    w_table = [] ; 
    waitlist = [] ; 
    res.json({
        status: "ok" 
    });
});


app.listen(process.env.PORT || port, function() {
    console.log("Connected");
});