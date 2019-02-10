var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongojs = require('mongojs');
var expressValidator = require('express-validator');
const { check, validationResult } = require('express-validator/check');
var Classes = require('./classes.js'); // all my user-defined classes
const authToken = '7cc746ac155a43419d4479a58d0cc87f';
const accountSid = 'AC8fa7cda0e72502b8f5707889348a1b88';
const client = require('twilio')(accountSid, authToken);
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


function orderConfirmation(firstName, lastName, phoneNum) {
    setTimeout(() => {
        alert1(phoneNum)
    }, 50000);
    var messageText = 'Hello, ' + firstName + ' ' + lastName + ', your order has been placed and will be ready in 50 seconds.⏱😋🍴';
    client.messages
    .create({
       body: messageText,
       from: '+16172748307',
       to: phoneNum
     })
    .then(message => console.log(message.sid))
    .done();
}

function alert1(phoneNumber) {
    client.messages
    .create({
       body: 'Your food is ready for pickup.',
       from: '+16172748307',
       to: phoneNumber
     })
    .then(message => console.log(message.sid))
    .done();
}



// Home route
app.get('/', function (req, res) {
    db.globalOrdersCollection.find(function (err, docs) {
        if(err) console.log(err);
        res.render('index', {
            title: 'Stadiums',
            stadiums: docs[0].stadiums, // array of stadiums
            errors: [],
            messages: null
        });
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


app.post('/submitOrder', [
    // First name is required
    check('firstName', "First name is required").isAlpha().isLength({
        min: 1
    }),
    // Last Name is required
    check('lastName', "Last name is required").isAlpha().isLength({
        min: 1
    }),
    check('phone', "Valid phone is required").isMobilePhone(),
    check('stadium', "Stadium is required").isNumeric(),
    check('vendor', "Vendor is required").isNumeric(),
    check('amount', "You must order at least one item")
], function(req, res){
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        res.render('index', {
            title: 'Error',
            users: null,
            errors: errors.array(),
            messages: null
        });
        res.end();
    } else {
        var customer = new Classes.Customer(req.body.firstName, req.body.lastName, req.body.phone);
        // var stadiumInfo = db.globalOrdersCollection.find(function (err, docs) { console.log(docs[0].stadiums); });
        orderConfirmation(customer.firstName, customer.lastName, customer.phoneNumber);



        res.render('index', {
            title: 'Success',
            users: null,
            errors: [],
            messages: 'Success! Feel free to resubmit this form. You will receive a text shortly when your food is ready! 🍔🍕😋'
        });

        res.end('yay');
    }
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




app.listen(3000, function () {
    console.log('Server started on port 3000...');
});

