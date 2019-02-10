var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongojs = require('mongojs');
var expressValidator = require('express-validator');
const { check, validationResult } = require('express-validator/check');
var Classes = require('./classes.js'); // all my user-defined classes
var app = express();

// MongoJs middleware
var db = mongojs('globalOrders', ['globalOrdersCollection']);


// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Bodyparser middleware
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Set static path
app.use(express.static(path.join(__dirname, 'public')));


// Home route
app.get('/', function (req, res) {
    db.globalOrdersCollection.find(function (err, docs) {
        if(err) console.log(err);
        // console.log(docs[0].stadiums);
        // var firstStadium = docs[0].stadiums[0];
        // firstStadium.name = "yo"; // this is how we are going to update the main table entry
        // console.log(firstStadium.name);
        res.render('index', {
            title: 'Stadiums',
            stadiums: docs[0].stadiums, // array of stadiums
            errors: null
        });
        // console.log(docs[0].stadiums);
        res.end('hi');
    });

});


app.get('/old', function (req, res) {
    db.globalOrdersCollection.find(function (err, docs) {
        if(err) console.log(err);
        // console.log(docs[0].stadiums);
        // var firstStadium = docs[0].stadiums[0];
        // firstStadium.name = "yo"; // this is how we are going to update the main table entry
        // console.log(firstStadium.name);
        res.render('index', {
            title: 'Stadiums',
            stadiums: docs[0].stadiums, // array of stadiums
            errors: null
        });
        // console.log(docs[0].stadiums);
        res.end('hi');
    });

});

// Add order route
// app.post('/submit', [
    // // First name is required
    // check('first_name', "First name is required").isAlpha().isLength({
    //     min: 1
    // }),
    // // Last Name is required
    // check('last_name', "Last name is required").isAlpha().isLength({
    //     min: 1
    // }),
    // check('email', "Valid email required").isEmail()
// ], (req, res) => {
    // console.log(req.body);
    // Finds the validation errors in this request and wraps them in an object with handy functions
    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //     db.globalOrdersCollection.find(function (err, docs) {
    //         res.render('index', {
    //             title: 'Customers',
    //             users: docs[0].stadiums,
    //             errors: errors.array()
    //         });
    //     })

        // return res.status(422).json({
        //     errors: errors.array()
        // });
    // } else {
    //     var newUser = {
    //         first_name: req.body.first_name,
    //         last_name: req.body.last_name,
    //         email: req.body.email
    //     }

    //     db.globalOrdersCollection.insert(newUser, function (err, result) {
    //         if (err) console.log(err);
    //         res.redirect('/');
    //         return;
    //     });
    //     console.log(newUser);
        //   User.create({
        //     username: req.body.username,
        //     password: req.body.password
        //   }).then(user => res.json(user));
    // }
//     res.end('data-sent');
// });

app.post('/submitOrder', function(req, res){
    console.log(req.body);
    res.end('yay');
});


app.delete("/users/delete/:id", function(req, res){
    var person;
    db.globalOrdersCollection.find({_id:mongojs.ObjectId(req.params.id)}, function(err1, docs){
        if(err1) {
            console.log(err1);
        } else {
            person = docs[0]; // be sure to check this!!
            globalOrdersCollection.users.remove({_id:mongojs.ObjectId(req.params.id)}, function(err, docs) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully removed:", person.first_name, person.last_name, person.email);
                }
                res.end();
                return;
            });
        }

    });
});




app.listen(3001, function () {
    console.log('Server started on port 3001...');
});

