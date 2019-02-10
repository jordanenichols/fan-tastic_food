var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myobj = { name: "Company Inc", address: "Highway 37" };
  dbo.collection("customers").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
  });
  dbo.collection("customers").findOne({}, function(err, result) {
    if (err) throw err;
    console.log(result);
  });
  db.close();
});
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("globalOrders");
//   dbo.createCollection("globalOrdersCollection", function(err, res) {
//     if (err) throw err;
//     console.log("Collection created!");
//     // var firstStadium = {
//     //     "stadiums": [
//     //       {
//     //         "name": "Agganis Arena",
//     //         "vendors": [
//     //           {
//     //             "name": "Commonwealth Concessions",
//     //             "foodItems": [
//     //               {
//     //                 "name": "Kayem Hot Dog",
//     //                 "price": 5,
//     //                 "amount": 0
//     //               }
//     //             ],
//     //             "orders": [
//     //               {
//     //                 "customer": [
//     //                   {
//     //                     "firstName": "John",
//     //                     "lastName": "Doe",
//     //                     "phoneNumber": "+18505981845"
//     //                   }
//     //                 ],
//     //                 "foodItems": [
//     //                   {
//     //                     "name": "Kayem Hot Dog",
//     //                     "price": 5.50,
//     //                     "amount": 2
//     //                   }
//     //                 ]
//     //               }
//     //             ]
//     //           }
//     //         ]
//     //       }
//     //     ]
//     //   };
//     //   var doc2 = {'hello':'doc2'};
//     //   var lotsOfDocs = [{'hello':'doc3'}, {'hello':'doc4'}];
    
//     // res.insert(firstStadium);
//     db.close();
//   });
// });