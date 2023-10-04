var connection = require("../koneksi");
var mysql = require("mysql");
var md5 = require("md5");
var jwt = require("jsonwebtoken");
var config = require("../config/secret");

// controller untuk register
exports.reqistrasi = function (req, res) {
  var post = {
    username: req.body.username,
    password: md5(req.body.password),
  };

  var query = "SELECT username FROM ?? WHERE ??=?";
  var table = ["user", "username", post.username];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (rows.length == 0) {
        var query = "INSERT INTO ?? SET ?";
        var table = ["user"];
        query = mysql.format(query, table);
        connection.query(query, post, function (error, rows) {
          if (error) {
            console.log(error);
          } else {
            res.json({
              status: "00",
              message: "Pendaftaran Berhasil",
            });
          }
        });
      } else {
        res.json({
          status: "99",
          message: "Username anda sudah terdaftar!",
        });
      }
    }
  });
};

//controller login
exports.login = function (req, res) {
  var post = {
    password: req.body.password,
    username: req.body.username,
  };

  connection.query(
    "SELECT * FROM user WHERE username=?",
    [post.username],
    function (error, rows) {
      if (rows.length > 0) {
        var query = "SELECT username FROM ?? WHERE ??=? AND ??=?";
        var table = [
          "user",
          "password",
          md5(post.password),
          "username",
          post.username,
        ];

        query = mysql.format(query, table);
        connection.query(query, function (error, rows) {
          if (error) {
            console.log(error);
          } else {
            if (rows.length == 1) {
              var token = jwt.sign({ rows }, config.secret, {
                expiresIn: "12h",
              });
              res.json({
                status: "00",
                message: "Login success",
                token: token,
                data: rows[0],
              });
            } else {
              res.json({
                status: "99",
                message: "Username atau password anda salah",
              });
            }
          }
        });
      } else {
        res.json({
          status: "99",
          message: "Username tidak ditemukan",
        });
      }
    }
  );
};
