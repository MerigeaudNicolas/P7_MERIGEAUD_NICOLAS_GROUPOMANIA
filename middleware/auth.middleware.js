// import de JsonwebTon 

const jwt = require('jsonwebtoken');

// tester si l'utilisateur est connecter tout au long de sa navigation
// check du token

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_USER_PASS2,
  database: process.env.DB_NAME
});

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        //var sql = "SELECT * FROM users WHERE _id = " + decodedToken.id + ";";
        var sql = "SELECT * FROM users WHERE _id = ?;";
        con.query(sql, [decodedToken.id], function (err, result) {
          if (err) throw err;
          res.locals.user = result[0];
          console.log("user : " + res.locals.user.email);
          next();
        });

      }
    })
  } else {
    res.locals.user = null;
    next();
  }
};

// tester lors d'une création de comtpe que le token n'est pas déjà utilisé

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send(200).json('no token')
      } else {
        console.log("Decoded token id : " + decodedToken.id);
        next();
      }
    });
  } else {
    console.log('No token');
  }
}; 