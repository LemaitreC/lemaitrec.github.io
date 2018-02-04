const mongo = require('mongodb');

const dbc = {
  user: 'top_chef',
  pass: 'P4ssword'
}

exports.saveRestaurants = (restaurants) =>new Promise(function(resolve,reject){
  mongo.connect('mongodb://top_chef:P4ssword@ds223578.mlab.com:23578/top-chef', function(err, db) {
    if (err) {
      reject (err);
    }
    db.collection("restaurants").insertMany(restaurants, function(err, res) {
      if (err) {
        reject (err);}
      //console.log("Number of documents inserted: " + res.insertedCount);
      resolve("Number of documents inserted: " + res.insertedCount);
      db.close();
    });
  });
})