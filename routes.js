"use strict";

module.exports = function (app) {
  var jsonku = require("./controller");

  app.route("/").get(jsonku.index);

  app.route("/getBarang").get(jsonku.getBarang);
  app.route("/getAllBarang").get(jsonku.getAllBarang);
  app.route("/getKategori").get(jsonku.getKategori);
  app.route("/getPenjualan").get(jsonku.getPenjualan);
  app.route("/getDetailPenjualan").get(jsonku.getDetailPenjualan);
  app.route("/getKeranjang").get(jsonku.getKeranjang);
  app.route("/getDetailKeranjang").get(jsonku.getDetailKeranjang);
  app.route("/getTotalHarga").get(jsonku.getTotalHarga);
  app.route("/getBarangById").get(jsonku.getBarangById);
  app.route("/getTotalPenjualan").get(jsonku.getTotalPenjualan);

  app.route("/postBarang").post(jsonku.postBarang);
  app.route("/postPenjualan").post(jsonku.postPenjualan);
  app.route("/postDetailPenjualan").post(jsonku.postDetailPenjualan);
  app.route("/postKeranjang").post(jsonku.postKeranjang);
  app.route("/postKeranjangMany").post(jsonku.postKeranjangMany);

  app.route("/putKeranjang").put(jsonku.putKeranjang);
  app.route("/putBarang").put(jsonku.putBarang);
  app.route("/putBarangMany").put(jsonku.putBarangMany);
  app.route("/returnBarang").put(jsonku.returnBarang);
  app.route("/putDetailKeranjang").put(jsonku.putDetailKeranjang);
  app.route("/putDataBarang").put(jsonku.putDataBarang);

  app.route("/deleteAllKeranjang").delete(jsonku.deleteAllKeranjang);
  app.route("/deleteKeranjang").delete(jsonku.deleteKeranjang);
  app.route("/deleteBarang").delete(jsonku.deleteBarang);
};
