const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

//to connect client to server

//DB
let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://pandey:root@cluster0.sdl2kjg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
    .then((client) => {
      console.log("connected");

      //if client connects to our db
      _db = client.db();
      callback(client);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
