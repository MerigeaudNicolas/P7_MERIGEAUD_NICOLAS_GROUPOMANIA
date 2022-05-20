var mysql = require('mysql');
var databasename = process.env.DB_NAME;
// var databasepassword = "process.env.DB_USER_PASS";

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_USER_PASS2
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE IF NOT EXISTS " + databasename, function (err, result) {
    if (err) throw err;
    console.log("Database created");
    createTableUser();
    setTimeout(createTablePosts, 200);
    //createTablePosts();
    setTimeout(createTableComments, 300);
    //createTableComments();
    setTimeout(createTableFollowers, 400);
    //createTableFollowers();
    setTimeout(createTableLikes, 500);
    //createTableLikes();
  });
});

function createTableUser() {
  var mysql = require('mysql');

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_USER_PASS2
  });

  var con2 = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_USER_PASS2
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE IF NOT EXISTS " + databasename + ".users ("
      + "_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,"
      + " pseudo VARCHAR(55) NOT NULL UNIQUE,"
      + " email VARCHAR(150) NOT NULL UNIQUE,"
      + " password VARCHAR(1024) NOT NULL,"
      + " picture VARCHAR(1024) DEFAULT './uploads/profil/random-user.png',"
      + " bio VARCHAR(1024),"
      + " createdAt TIMESTAMP)";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table users created");
    });

    var sql2 = "SELECT * FROM information_schema.TABLE_CONSTRAINTS WHERE constraint_name = 'PK_email'";
    con.query(sql2, function (err, result) {
      if (err) throw err;
      if (result.length == 0) {
        var sql3 = "ALTER TABLE " + databasename + ".users ADD CONSTRAINT PK_email CHECK (email LIKE '%_@__%.__%');"
        con2.query(sql3, function (err, result) {
          if (err) throw err;
          console.log("Contrainte ajoutée");
        });
      }
    });
  });
}

function createTablePosts() {
  var mysql = require('mysql');

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_USER_PASS2
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE IF NOT EXISTS " + databasename + ".posts ("
      + "_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,"
      + " posterId INTEGER NOT NULL,"
      + " message VARCHAR(500) NOT NULL,"
      + " picture VARCHAR(500) NOT NULL,"
      + " video VARCHAR(500) NOT NULL,"
      + " createdAt TIMESTAMP,"
      + " FOREIGN KEY (posterId) REFERENCES users(_id))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table posts created");
    });
  });
}

function createTableComments() {
  var mysql = require('mysql');

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_USER_PASS2
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE IF NOT EXISTS " + databasename + ".comments ("
      + "commenterId INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,"
      + " postId INTEGER NOT NULL,"
      + " userId INTEGER NOT NULL,"
      + " text TEXT NOT NULL,"
      + " timestamp TIMESTAMP,"
      + " FOREIGN KEY (postId) REFERENCES posts(_id), "
      + " FOREIGN KEY (userId) REFERENCES users(_id));";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table comments created");
    });
  });
}

function createTableFollowers() {
  var mysql = require('mysql');

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_USER_PASS2
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE IF NOT EXISTS " + databasename + ".followers ("
      + "followersId INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,"
      + " idToFollow INTEGER NOT NULL,"
      + " userId INTEGER NOT NULL,"
      + " FOREIGN KEY (idToFollow) REFERENCES users(_id),"
      + " FOREIGN KEY (userId) REFERENCES users(_id));";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table followers created");
    });
  });
}

function createTableLikes() {
  var mysql = require('mysql');

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_USER_PASS2
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE IF NOT EXISTS " + databasename + ".likes ("
      + "idLikes INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,"
      + " postId INTEGER NOT NULL,"
      + " userId INTEGER NOT NULL,"
      + " FOREIGN KEY (postId) REFERENCES posts(_id),"
      + " FOREIGN KEY (userId) REFERENCES users(_id));";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table likes created");
    });
  });
}