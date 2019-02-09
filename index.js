var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var mongojs = require('mongojs');

const { check, validationResult } = require('express-validator/check');
var app = express();

// MongoJs middleware
var db = mongojs('globalOrders', ['globalOrderCollection']);

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Set static path
app.use(express.static(path.join(__dirname, 'public')));


// Home route
app.get('/', function (req, res) {
    db.users.find(function (err, docs) {
        if(err) console.log(err);
        res.render('index', {
            title: 'Customer',
            users: docs,
            errors: null
        });
        res.end('ppo');
    });

});

// Add user route
app.post('/users/add', [
    // First name is required
    check('first_name', "First name is required").isAlpha().isLength({
        min: 1
    }),
    // Last Name is required
    check('last_name', "Last name is required").isAlpha().isLength({
        min: 1
    }),
    check('email', "Valid email required").isEmail()
], (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        db.users.find(function (err, docs) {
            res.render('index', {
                title: 'Customers',
                users: docs,
                errors: errors.array()
            });
        })

        // return res.status(422).json({
        //     errors: errors.array()
        // });
    } else {

        var newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        }

        db.users.insert(newUser, function (err, result) {
            if (err) console.log(err);
            res.redirect('/');
            return;
        });
        console.log(newUser);
        //   User.create({
        //     username: req.body.username,
        //     password: req.body.password
        //   }).then(user => res.json(user));
    }
});


app.delete("/users/delete/:id", function(req, res){
    var person;
    db.users.find({_id:mongojs.ObjectId(req.params.id)}, function(err1, docs){
        if(err1) {
            console.log(err1);
        } else {
            person = docs[0];
            db.users.remove({_id:mongojs.ObjectId(req.params.id)}, function(err, docs) {
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




app.listen(3000, function () {
    console.log('Server started on port 3000...');
});

