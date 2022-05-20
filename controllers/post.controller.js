const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

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

// lire un post

module.exports.readPost = (req, res) => {
  createPipe();
  con.connect(function (err) {
    if (err) throw err;
    //var sql = "SELECT *, (SELECT COUNT(*) FROM comments c WHERE p._id = c.postId) as nb FROM posts p ORDER BY _id DESC;"
    //var sql = "SELECT *, (SELECT COUNT(*) FROM comments c WHERE p._id = c.postId) as nb FROM posts p INNER JOIN users u ON p.posterId = u._id ORDER BY p._id DESC;"
    var sql = "SELECT p._id, p.posterId, p.message, p.picture as pPicture, p.video, p.createdAt, u.pseudo, u.picture as uPicture, "
      + "(SELECT COUNT(*) FROM comments c WHERE p._id = c.postId) as nb FROM posts p "
      + "INNER JOIN users u ON p.posterId = u._id ORDER BY p._id DESC;"
    //var sql = "SELECT c.*, p.* FROM posts p INNER JOIN comments c ON c.postId = p._id"
    //var sql = "SELECT *, count(*) as nb FROM comments INNER JOIN posts WHERE comments.postId = posts._id  ORDER BY _id DESC GROUP BY posts._id;";
    con.query(sql, function (err, result) {
      con.destroy();
      //console.log("posts : " + result[0].message);
      return res.send(result);
    });
  });
}

// créer un post

module.exports.createPost = async (req, res) => {
  createPipe();
  con.connect(function (err) {
    if (err) throw err;
    //var sql = "INSERT INTO posts (posterId, message, picture, video, createdAt) VALUES (" + req.body.posterId + ", '" + req.body.message + "','','" + req.body.video + "', NOW());";
    var sql = "INSERT INTO posts (posterId, message, picture, video, createdAt) VALUES (?, ?,'',?, NOW());";
    con.query(sql, [req.body.posterId, req.body.message, req.body.video], function (err, result) {
      con.destroy();
      return res.status(201).json(result[0]);
    });
  });
};

// mettre à jour un post

module.exports.updatePost = (req, res) => {
  createPipe();
  con.connect(function (err) {
    if (err) throw err;
    //var sql = "UPDATE posts SET posts.message = '" + req.body.message + "' WHERE posts._id = " + req.params.id + ";";
    var sql = "UPDATE posts SET posts.message = ? WHERE posts._id = ?;";
    con.query(sql, [req.body.message, req.params.id], function (err, result) {
      con.destroy();
      return res.send(result[0]);
    });
  });
}

//supprimer un post

module.exports.deletePost = (req, res) => {
  createPipe();
  con.connect(function (err) {
    if (err) throw err;
    console.log("delete post / id : " + req.params.id);
    //var sql = "DELETE FROM comments WHERE comments.postId = " + req.params.id + ";";
    var sql = "DELETE FROM comments WHERE comments.postId = ?;";
    con.query(sql, [req.params.id], function (err, result) {
      //var sql2 = "DELETE FROM posts WHERE posts._id = " + req.params.id + ";";
      var sql2 = "DELETE FROM posts WHERE posts._id = ?;";
      con2.query(sql2, [req.params.id], function (err, result) {
        con2.destroy();
        res.send(result);
      });
      con.destroy();
    });
  });
};

// aimé un post

module.exports.likePost = async (req, res) => {

};

// ne plus aimé un post

module.exports.unlikePost = async (req, res) => {

};

// créer un commentaire sur un post


module.exports.commentPost = (req, res) => {

};

// édité le commentaire créer

module.exports.editCommentPost = (req, res) => {

};




// Supprimer un commentaire sous un post

module.exports.deleteCommentPost = (req, res) => {

}; 