module.exports.getAllUsers = async (req, res) => {
  /*const users = await UserModel.find().select('-password'); // -password = ne renvoie jamais le password
  res.status(200).json(users);*/
}

var mysql = require('mysql');
var con;
var con2;

function createPipe() {
  con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_USER_PASS2,
    database: process.env.DB_NAME
  });

  con2 = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_USER_PASS2,
    database: process.env.DB_NAME
  });
}

module.exports.userInfo = (req, res) => {
  console.log("user infos : " + req.params.id);
  createPipe();
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    //var sql = "SELECT * FROM users WHERE _id = " + req.params.id + ";";
    var sql = "SELECT * FROM users WHERE _id = ?;";
    con.query(sql, [req.params.id], function (err, result) {
      con.destroy();
      recupUserId = result[0]._id;
      console.log(result[0].timestamp);
      res.send(result[0]);
    });
  });
}

// mise à jour d'un utilisateur
module.exports.updateUser = async (req, res) => {
  createPipe();
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected! Ready For Update Bio");
    //var sql = "UPDATE users SET users.bio = '" + req.body.bio + "' WHERE users._id = " + req.params.id + ";";
    var sql = "UPDATE users SET users.bio = ? WHERE users._id = ?;";
    con.query(sql, [req.body.bio, req.params.id], function (err, result) {
      con2.connect(function (err) {
        if (err) throw err;
        //var sql2 = "SELECT * FROM users WHERE _id = " + req.params.id + ";";
        var sql2 = "SELECT * FROM users WHERE _id = ?;";
        con2.query(sql2, [req.params.id], function (err, result) {
          con2.destroy();
          con.destroy();
          res.send(result[0]);
        });
      });
    });
  });
};

// supprimer un utilisateur

module.exports.deleteUser = async (req, res) => {

};

module.exports.follow = async (req, res) => {

};

module.exports.unfollow = async (req, res) => {

}; 