var Yobit = require("yobit");

if (process.env.ENV === "dev") {
  require("dotenv").config();
}

var client = new Yobit({
  key: process.env.KEY,
  secret: process.env.SECRET
});
