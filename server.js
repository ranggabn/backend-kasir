const express = require("express");
const bodyParser = require("body-parser");

var morgan = require("morgan");
const app = express();
var cors = require("cors");

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

// panggil routes
var routes = require("./routes");
routes(app);

app.use("/auth", require("./middleware"));

app.listen(process.env.PORT || 3001, function () {
  console.log("Express server listening on port 3001 in dev mode");
});
