var Yobit = require("yobit");

if (process.env.ENV === "dev") {
  require("dotenv").config();
}

var client = new Yobit({
  key: process.env.KEY,
  secret: process.env.SECRET
});

client.getOrderBook(function(error, data) {
  if (error) {
    console.log("[ERR]: ", error);
    return;
  }

  console.log("[INFO] lowest sell order ->", data.buzz_btc.asks[0][0]);
  console.log("[INFO] purchasing ", getRandomInt(500, 2500), " BUZZ");
}, "buzz_btc");

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
