const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');

const app = express();
const port = 2000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

mongoose.connect("mongodb://127.0.0.1:27017/myProject", { useNewUrlParser: true, useUnifiedTopology: true });

const newSchema = {
    Status: String,
    Author: String,
    Recommended: String
}

const New = mongoose.model("New", newSchema);

const jsonSchema = {
    Component_ID: String,
    Component_Name: String,
    Category: String,
    Quantity: String
}

const Json = mongoose.model('Json', jsonSchema);

app.get('/', function(req, res) {
    New.find({}, function(err, newData) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'An error occurred' });
        }

        Json.find({}, function(err, jsonData) {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'An error occurred' });
            }

            res.render('index', {
                newData: newData,
                jsonDataList: jsonData,
                activeTab: 'maintenance-issues'
            });
        });
    });
});

app.post("/signup", function(req, res) {
    let newRecord = new New({
        Status: req.body.Status,
        Author: req.body.Author,
        Recommended: req.body.Recommended
    });

    newRecord.save(function(err) {
        if (err) {
            console.error(err);
            return res.redirect('/');
        }

        New.find({}, function(err, data) {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'An error occurred' });
            }

            res.render('index', { newData: data, activeTab: 'maintenance-issues' });
        });
    });
});

app.listen(port, function() {
    console.log("Server is running on port " + port);
});
