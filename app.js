const axios = require("axios").default;

async function getValrZarValue() {
  try {
    const response = await axios.get(
      "https://api.valr.com/v1/public/BTCZAR/marketsummary"
    );
    return response;
  } catch (error) {
    console.error("getValrZarValue");
    console.error(error);
    return null;
  }
}

async function getCryptoUsdValue() {
  try {
    const response = await axios.get(
      "https://api.crypto.com/v2/public/get-ticker?instrument_name=BTC_USDT"
    );
    return response;
  } catch (error) {
    console.error("getCryptoUsdValue");
    console.error(error);
    return null;
  }
}

async function convertDollarToZar(dollarAmount) {
  try {
    const response = await axios.get(
      "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=ZAR&apikey=GZEAPZVPO6PDQHDS"
    );
    const currentUsdZar =
      response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
    console.log("Current USD ZAR");
    console.log(currentUsdZar);
    return dollarAmount * currentUsdZar;
  } catch (error) {
    console.error("convertDollarToZar");
    console.error(error);
    return null;
  }
}

const crappyObject = {
  name: "Koos",
  surname: "Koekemoer",
};

const emptyObj = {};

const sell = {
  side: "SELL",
  quantity: "0.100000",
  price: "10002",
  pair: "BTCZAR",
  postOnly: true,
  customerOrderId: "1235",
};

const buy = {
  side: "BUY",
  quantity: "0.100000",
  price: "10002",
  pair: "BTCZAR",
  postOnly: true,
  customerOrderId: "1235",
}

async function addLimitOrder(objectToPost) {
  try {
    const response = await axios.post(
      "http://localhost:8080/orders/limit",
      objectToPost
    );
    return response;
  } catch (error) {
    console.error("addLimitOrder");
    console.error(error);
    return null;
  }
}

async function doTradesListRequest() {
  try {
    const response = await axios.get("http://localhost:8080/orders/trades");
    return response;
  } catch (error) {
    console.error("doTradesListRequest");
    console.error(error);
    return null;
  }
}

async function main() {
  console.log("Starting");
  // const sellRes = await addLimitOrder(sell);
  // console.log(sellRes.status);
  // const buyRes = await addLimitOrder(buy);
  // console.log(buyRes.status);
  // const trades = await doTradesListRequest();
  // console.log("Done");

  const result = await getValrZarValue();
  const lastTradedValrPrice = result.data.lastTradedPrice;
  console.log("Valr Price");
  console.log(lastTradedValrPrice);

  const cryptoResult = await getCryptoUsdValue();
  const cryptoLastTradedDollarPrice = cryptoResult.data.result.data.a;
  console.log("Crypto Dollar Price");
  console.log(cryptoLastTradedDollarPrice);

  const cryptoZarAmount = await convertDollarToZar(cryptoLastTradedDollarPrice);
  console.log("Crypto Zar Price");
  console.log(cryptoZarAmount);

  const currentArb = (1 - cryptoZarAmount / lastTradedValrPrice) * 100;
  console.log(`=====================`);
  console.log(`Current Arb`);
  console.log(currentArb + "%");
  console.log(`=====================`);
}

main().then(console.log(""));
