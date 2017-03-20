var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb').MongoClient;
var db;

var app = express();

// app.get('/', function(req, res) {
//     res.send('Hello World');
// });

app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json());



app.route('/api/locations')
    .get(function (req,res) {
        db.collection('locations').find().toArray(function(err, locations) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.send(locations);
            }
        });
    })

    .post(function(req, res) {
        db.collection('locations').insertOne(req.body, function(err, result) {
            if (err) {
                console.log(err);
                res.sendStatus(500)
            } else {
                res.status(201).send(result.insertedId);
            }
        })
    })

     mongo.connect('mongodb://localhost:27017/pizzaPlanet', function (err, database) {
    if (err) {
        console.log(err);
    } else {
        db = database;
        app.listen(3000);
            console.log('Server listening on port 3000');
    }
   
});

