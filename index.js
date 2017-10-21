var Yobit = require("yobit");

if (process.env.ENV === "dev") {
  require("dotenv").config();
}

var client = new Yobit(process.env.KEY, process.env.SECRET);

client.getOrderBook(function(error, response) {
  if (error) {
    console.log("[ERR]: ", error);
    return;
  }

  var lowestSellOrder = Number(response.buzz_btc.asks[0][0]);
  var sellWallInCoin = response.buzz_btc.asks[0][1];
  var percentPurchaseMinimum = 0.0001;
  var percentPurchaseMaximum = 0.00025;
  var randomPurchasePrice = getRandomInt(
    sellWallInCoin * percentPurchaseMinimum,
    sellWallInCoin * percentPurchaseMaximum
  );

  console.log("[INFO] lowest sell order ->", lowestSellOrder);
  console.log("[INFO] purchasing ", randomPurchasePrice, " BUZZ");

  client.addTrade(
    function(success, response) {
      if (!success) {
        console.log("[ERR]: ", response);
        return;
      }
    },
    "buzz_btc",
    "buy",
    lowestSellOrder,
    randomPurchasePrice
  );
}, "buzz_btc");

function getRandomInt(min, max) {
  return parseInt(Math.floor(Math.random() * (max - min + 1)) + min);
}
