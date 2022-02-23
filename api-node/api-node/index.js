var express = require("express");
var app = express();

app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});
require("./startup/logging")();
require("./startup/cors")(app);
require("./startup/routes")(app);
//require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

const port = 3900;

const server = app.listen(port, () =>
  console.log(`Node app listening on port ${port}!`)
);
module.exports = server;
