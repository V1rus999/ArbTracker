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

async function main() {
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
