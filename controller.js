"use strict";

var connection = require("./koneksi");

exports.index = function (req, res) {
  res.json({
    status: "00",
    message: "Aplikasi Berjalan",
  });
};

exports.getKategori = function (req, res) {
  connection.query(`SELECT * from kategori`, function (error, rows, field) {
    if (error) {
      console.log(error);
    } else {
      res.json({
        status: "00",
        message: "Success",
        data: rows,
      });
    }
  });
};

exports.getBarang = function (req, res) {
  var id_kategori = req.query.id_kategori;

  connection.query(
    `SELECT * from barang WHERE id_kategori LIKE ?`,
    ["%" + id_kategori + "%"],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success",
          data: rows,
        });
      }
    }
  );
};

exports.getBarangById = function (req, res) {
  var id_barang = req.query.id_barang;

  connection.query(
    `SELECT * from barang WHERE id_barang = ?`,
    [id_barang],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success",
          data: rows[0],
        });
      }
    }
  );
};

exports.getAllBarang = function (req, res) {
  connection.query(
    `SELECT b.*, k.nama as nama_kategori from barang as b LEFT JOIN kategori as k ON b.id_kategori = k.id_kategori`,
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success",
          data: rows,
        });
      }
    }
  );
};

exports.getPenjualan = function (req, res) {
  var tahun = req.query.tahun;
  var bulan = req.query.bulan;
  var tanggal = req.query.tanggal;

  connection.query(
    `SELECT * from penjualan as mp WHERE YEAR(insert_date) LIKE ? AND DATE_FORMAT(insert_date,'%Y-%m') LIKE ? AND DATE_FORMAT(insert_date,'%Y-%m-%d') LIKE ? ORDER BY mp.id_penjualan DESC`,
    ["%" + tahun + "%", "%" + bulan + "%", "%" + tanggal + "%"],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success",
          data: rows,
        });
      }
    }
  );
};

exports.getTotalPenjualan = function (req, res) {
  var tahun = req.query.tahun;
  var bulan = req.query.bulan;
  var tanggal = req.query.tanggal;

  console.log(tanggal);

  connection.query(
    `SELECT SUM(total_harga) as total from penjualan WHERE YEAR(insert_date) LIKE ? AND DATE_FORMAT(insert_date,'%Y-%m') LIKE ? AND DATE_FORMAT(insert_date,'%Y-%m-%d') LIKE ?;`,
    ["%" + tahun + "%", "%" + bulan + "%", "%" + tanggal + "%"],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success",
          data: rows,
        });
      }
    }
  );
};

exports.getDetailPenjualan = function (req, res) {
  var nomor_struk = req.query.nomor_struk;

  connection.query(
    `SELECT * 
    from detail_penjualan as dp
    LEFT JOIN barang as b on dp.id_barang = b.id_barang
    where dp.nomor_struk = ?`,
    [nomor_struk],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success",
          data: rows,
        });
      }
    }
  );
};

exports.getKeranjang = function (req, res) {
  connection.query(
    `SELECT * from keranjang as k
    LEFT JOIN barang as b ON k.id_barang = b.id_barang`,
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success",
          data: rows,
        });
      }
    }
  );
};

exports.getDetailKeranjang = function (req, res) {
  var id_barang = req.query.id_barang;

  connection.query(
    `SELECT * from keranjang as k
    LEFT JOIN barang as b ON k.id_barang = b.id_barang
    WHERE b.id_barang = ?`,
    [id_barang],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success",
          data: rows,
        });
      }
    }
  );
};

exports.postBarang = function (req, res) {
  var nama = req.body.nama;
  var harga = req.body.harga;
  var modal = req.body.modal;
  var satuan = req.body.satuan;
  var image = req.body.image;
  var stok = req.body.stok;
  var id_kategori = req.body.id_kategori;

  connection.query(
    `INSERT INTO barang (nama, harga, modal, satuan, image, stok, id_kategori) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [nama, harga, modal, satuan, image, stok, id_kategori],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success insert data",
        });
      }
    }
  );
};

exports.postPenjualan = function (req, res) {
  var nomor_struk = req.body.nomor_struk;
  var total_harga = req.body.total_harga;

  connection.query(
    `INSERT INTO penjualan (nomor_struk, total_harga) VALUES (?, ?)`,
    [nomor_struk, total_harga],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success insert data",
        });
      }
    }
  );
};

exports.postDetailPenjualan = function (req, res) {
  var values = [
    {
      nomor_struk: req.body.nomor_struk,
      id_barang: req.body.id_barang,
      jumlah_barang: req.body.jumlah_barang,
    },
  ];

  connection.query(
    `INSERT INTO detail_penjualan (nomor_struk, id_barang, jumlah_barang) VALUES ?`,
    [
      values.map((values) => [
        values.nomor_struk,
        values.id_barang,
        values.jumlah_barang,
      ]),
    ],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success insert data",
        });
      }
    }
  );
};

exports.postKeranjang = function (req, res) {
  var id_barang = req.body.id_barang;

  connection.query(
    `INSERT INTO keranjang (id_barang, jumlah_barang) VALUES (?, ?)`,
    [id_barang, 1],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success insert data",
        });
      }
    }
  );
};

exports.putKeranjang = function (req, res) {
  var id_barang = req.body.id_barang;

  connection.query(
    `UPDATE keranjang set jumlah_barang = (jumlah_barang + 1) WHERE id_barang = ?`,
    [id_barang],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success update data",
        });
      }
    }
  );
};

exports.putBarang = function (req, res) {
  var id_barang = req.body.id_barang;
  var jumlah_barang = req.body.jumlah_barang;

  connection.query(
    `UPDATE barang as b set stok = (stok - ?) WHERE b.id_barang = ?`,
    [jumlah_barang, id_barang],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success update data",
        });
      }
    }
  );
};

exports.putBarangMany = function (req, res) {
  var values = [
    {
      id_barang: req.body.id_barang,
      jumlah_barang: req.body.jumlah_barang,
    },
  ];

  connection.query(
    `UPDATE barang as b set stok = (stok - ?) WHERE b.id_barang = ?`,
    [
      values.map((values) => [values.jumlah_barang]),
      values.map((values) => [values.id_barang]),
    ],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success update data",
        });
      }
    }
  );
};

exports.returnBarang = function (req, res) {
  var values = [
    {
      id_barang: req.body.id_barang,
      jumlah_barang: req.body.jumlah_barang,
    },
  ];

  connection.query(
    `UPDATE barang as b set stok = (stok + ?) WHERE b.id_barang = ?`,
    [
      values.map((values) => [values.jumlah_barang]),
      values.map((values) => [values.id_barang]),
    ],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success update data",
        });
      }
    }
  );
};

exports.putDetailKeranjang = function (req, res) {
  var id_barang = parseInt(req.body.id_barang);
  var jumlah_barang = parseInt(req.body.jumlah_barang);

  connection.query(
    `UPDATE keranjang set jumlah_barang = ? WHERE keranjang.id_barang = ?`,
    [jumlah_barang, id_barang],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success update data",
        });
      }
    }
  );
};

exports.deleteAllKeranjang = function (req, res) {
  connection.query(`TRUNCATE keranjang;`, function (error, rows, field) {
    if (error) {
      console.log(error);
    } else {
      res.json({
        status: "00",
        message: "Success truncate data",
      });
    }
  });
};

exports.getTotalHarga = function (req, res) {
  connection.query(
    `SELECT (SUM(k.jumlah_barang * b.harga)) as total_harga FROM keranjang as k
    LEFT JOIN barang as b ON k.id_barang = b.id_barang`,
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success",
          data: rows,
        });
      }
    }
  );
};

exports.postKeranjangMany = function (req, res) {
  var values = [
    {
      id_barang: req.body.id_barang,
      jumlah_barang: req.body.jumlah_barang,
    },
  ];

  connection.query(
    `INSERT INTO keranjang (id_barang, jumlah_barang) VALUES ?`,
    [values.map((values) => [values.id_barang, values.jumlah_barang])],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success insert data",
        });
      }
    }
  );
};

exports.deleteKeranjang = function (req, res) {
  var id_barang = req.query.id_barang;

  connection.query(
    `DELETE from keranjang WHERE id_barang = ?;`,
    [id_barang],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success delete data",
        });
      }
    }
  );
};

exports.deleteBarang = function (req, res) {
  var id_barang = req.query.id_barang;

  connection.query(
    `DELETE from barang WHERE barang.id_barang = ?;`,
    [id_barang],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success delete data",
        });
      }
    }
  );
};

exports.putDataBarang = function (req, res) {
  var nama = req.body.nama;
  var harga = req.body.harga;
  var modal = req.body.modal;
  var satuan = req.body.satuan;
  var image = req.body.image;
  var stok = req.body.stok;
  var id_kategori = req.body.id_kategori;
  var id_barang = req.body.id_barang;

  connection.query(
    `UPDATE barang SET nama=?, harga=?, modal=?, satuan=?, image=?, stok=?, id_kategori=? WHERE barang.id_barang=?`,
    [nama, harga, modal, satuan, image, stok, id_kategori, id_barang],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success update data",
        });
      }
    }
  );
};
