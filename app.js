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
      "https://api.exchangeratesapi.io/latest?base=USD&symbols=ZAR"
    );
    const currentUsdZar = response.data.rates.ZAR;
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

  const cryptoResult = await getCryptoUsdValue();
  const cryptoLastTradedDollarPrice = cryptoResult.data.result.data.a;

  const cryptoZarAmount = await convertDollarToZar(cryptoLastTradedDollarPrice);

  const currentArb = (1 - cryptoZarAmount / lastTradedValrPrice) * 100;
  console.log(`Current Arb`);
  console.log(currentArb + "%");
}

main().then(console.log(""));
