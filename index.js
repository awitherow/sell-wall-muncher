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

  var lowestSellOrder = data.buzz_btc.asks[0][0];
  var sellWallInCoin = data.buzz_btc.asks[0][1];
  var percentPurchaseMinimum = 0.0001;
  var percentPurchaseMaximum = 0.00025;
  var randomPurchasePrice = getRandomInt(
    sellWallInCoin * percentPurchaseMinimum,
    sellWallInCoin * percentPurchaseMaximum
  );

  console.log("[INFO] lowest sell order ->");
  console.log("[INFO] purchasing ", randomPurchasePrice, " BUZZ");
  // place buy order
}, "buzz_btc");

function getRandomInt(min, max) {
  return parseInt(Math.floor(Math.random() * (max - min + 1)) + min);
}
