// constante d'erreur lors d'une création de compte

const { signUpErrors, signInErrors } = require('../utils/errors.utils');

// création de la function createToken
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
};

// Durée de vie du cooki 
const maxAge = 3 * 24 * 60 * 1000

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

module.exports.signUp = async (req, res) => {
    const { pseudo, email, password } = req.body;
    var error = "";


    const hashedPassword = bcrypt.hash(password, 12).then(hash => {
        console.log(hash);
    });

    createPipe();
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        //verif pseudo exists
        //var preSQL = "SELECT count(*) as nb FROM users WHERE pseudo = '" + pseudo + "';"
        var preSQL = "SELECT count(*) as nb FROM users WHERE pseudo = ?;"
        con.query(preSQL, [pseudo], function (err, result) {
            if (result[0].nb == 1) {
                console.log("pseudo : " + pseudo);
                error = "pseudo";
                const errors = signUpErrors(error);
                res.status(200).json({ errors });
            } else {
                //verif email exists
                //preSQL = "SELECT count(*) as nb FROM users WHERE email = '" + email + "';"
                preSQL = "SELECT count(*) as nb FROM users WHERE email = ?;"
                con.query(preSQL, [email], function (err, result) {
                    if (result[0].nb == 1) {
                        console.log("email : " + email);
                        error = "email";
                        const errors = signUpErrors(error);
                        res.status(200).json({ errors });
                    } else {
                        //verif password
                        if (password.length < 6) {
                            error = "password";
                            const errors = signUpErrors(error);
                            res.status(200).json({ errors });
                        } else {
                            //var sql = "INSERT INTO users (pseudo, email, password, createdAt) VALUES ('" + pseudo + "','" + email + "','" + hashedPassword + "', NOW());";
                            var sql = "INSERT INTO users (pseudo, email, password, createdAt) VALUES (?,?,?, NOW());";
                            con.query(sql, [pseudo, email, hashedPassword+""], function (err, result) {
                                if (err) throw err;
                                console.log("1 record inserted");
                                //var sql2 = "SELECT _id FROM users WHERE pseudo LIKE '" + pseudo + "' AND email LIKE '" + email + "';";
                                var sql2 = "SELECT _id FROM users WHERE pseudo LIKE ? AND email LIKE ?;";
                                con2.query(sql2, [pseudo, email], function (err, result) {
                                    if (err) throw err;
                                    con2.destroy();
                                    con.destroy();
                                    res.status(201).json({ user: result[0]._id });
                                });
                            });
                        }
                    }
                });
            }
        });
    });
}

module.exports.signIn = async (req, res) => {
    const { email, password } = req.body;

    const hashedPassword = bcrypt.hash(password, 12).then(hash => {
        console.log(hash);
    });

    createPipe();
    con.connect(function (err) {
        if (err) throw err;
        //var sql = "SELECT * FROM users WHERE email LIKE '" + email + "' AND password LIKE '" + hashedPassword + "';";
        var sql = "SELECT * FROM users WHERE email LIKE ? AND password LIKE ?;";
        con.query(sql, [email, hashedPassword+""], function (err, result) {
            if (err) throw err;
            console.log("record : " + result.length);
            if (result.length == 1) {
                const token = createToken(result[0]._id);
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
                //res.cookie("groupo", result[0]._id,  { httpOnly: true, maxAge: maxAge });
                console.log("userid : " + result[0]._id);
                con.destroy();
                res.status(200).json({ user: result[0]._id, token });
            } else {
                const errors = signInErrors("err");
                res.status(200).json({ errors });
            }
        });
    });
}

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}