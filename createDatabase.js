var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("globalOrders");
  var myobj = require('./database.json');
  dbo.collection("globalOrdersCollection").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("Data successfully inserted...");
  });
  dbo.collection("globalOrdersCollection").findOne({}, function(err, result) {
    if (err) throw err;
    console.log("===============================SUCCESSFULLY CREATED DATABASE================================");
  });
  db.close();
});